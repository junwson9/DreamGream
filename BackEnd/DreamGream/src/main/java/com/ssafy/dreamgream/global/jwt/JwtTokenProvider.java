package com.ssafy.dreamgream.global.jwt;

import com.ssafy.dreamgream.domain.member.enums.Role;
import com.ssafy.dreamgream.global.auth.dto.response.TokenResponseDto;
import com.ssafy.dreamgream.global.exception.ErrorCode;
import com.ssafy.dreamgream.global.exception.customException.ExpiredTokenException;
import com.ssafy.dreamgream.global.exception.customException.InvalidTokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import java.util.Arrays;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.client.HttpServerErrorException.InternalServerError;

@Component
@Slf4j
public class JwtTokenProvider {

	private final Long ACCESS_TOKEN_VALIDATE_TIME; // 5분
	private final Long REFRESH_TOKEN_VALIDATE_TIME; // 7일
	private static String SECRET_KEY;
	private static final String AUTHORITIES_KEY = "auth";
	private static final String BEARER_TYPE = "Bearer";
	public static final String AUTHORIZATION_HEADER = "Authorization";
	public static final String REFRESH_HEADER = "X-Refresh-Token";

	public JwtTokenProvider(
		@Value("${jwt.secret}") String secretKey,
		@Value("${jwt.access_time}") Long accessTime,
		@Value("${jwt.refresh_time}") Long refreshTime) {
		this.ACCESS_TOKEN_VALIDATE_TIME = accessTime;
		this.REFRESH_TOKEN_VALIDATE_TIME = refreshTime;
		this.SECRET_KEY = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}

	public TokenResponseDto createTokenDto(String memberId, String authorities) {
		long now = (new Date()).getTime();
		Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_VALIDATE_TIME);
		Date refreshTokenExpiresIn = new Date(now + REFRESH_TOKEN_VALIDATE_TIME);

		String accessToken = Jwts.builder()
			.setSubject(memberId)
			.claim(AUTHORITIES_KEY, authorities)
			.setExpiration(accessTokenExpiresIn)
			.signWith(SignatureAlgorithm.HS256, SECRET_KEY)
			.compact();
		log.info("accessToken 유효 시간: {}", accessTokenExpiresIn);

		String refreshToken = Jwts.builder()
			.setExpiration(refreshTokenExpiresIn)
			.signWith(SignatureAlgorithm.HS256, SECRET_KEY)
			.compact();
		log.info("refreshToken 유효 시간: {}", refreshTokenExpiresIn);

		return TokenResponseDto.builder()
			.grantType(BEARER_TYPE)
			.accessToken(accessToken)
			.accessTokenExpireIn(accessTokenExpiresIn.getTime())
			.refreshToken(refreshToken)
			.refreshTokenExpireIn(refreshTokenExpiresIn.getTime())
			.build();
	}


	public TokenResponseDto createTokenDto(Long memberId, Role role) {
		long now = (new Date()).getTime();
		Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_VALIDATE_TIME);
		Date refreshTokenExpiresIn = new Date(now + REFRESH_TOKEN_VALIDATE_TIME);

		String accessToken = Jwts.builder()
			.setSubject(memberId.toString())
			.claim(AUTHORITIES_KEY, role)
			.setExpiration(accessTokenExpiresIn)
			.signWith(SignatureAlgorithm.HS256, SECRET_KEY)
			.compact();
		log.info("accessToken 유효 시간: {}", accessTokenExpiresIn);

		String refreshToken = Jwts.builder()
			.setExpiration(refreshTokenExpiresIn)
			.signWith(SignatureAlgorithm.HS256, SECRET_KEY)
			.compact();
		log.info("refreshToken 유효 시간: {}", refreshTokenExpiresIn);

		return TokenResponseDto.builder()
			.grantType(BEARER_TYPE)
			.accessToken(accessToken)
			.accessTokenExpireIn(accessTokenExpiresIn.getTime())
			.refreshToken(refreshToken)
			.refreshTokenExpireIn(refreshTokenExpiresIn.getTime())
			.build();
	}


	public TokenResponseDto generateTokenDto(Authentication authentication) {
		UserDetails principal = (User) authentication.getPrincipal();
		String memberId = principal.getUsername();
		String authorities = authentication.getAuthorities().stream()
			.map(GrantedAuthority::getAuthority)
			.collect(Collectors.joining(","));

		return createTokenDto(memberId, authorities);
	}


	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
			return true;
		} catch (SecurityException | MalformedJwtException e) {
			throw new InvalidTokenException("유효하지 않은 토큰", ErrorCode.INVALID_TOKEN);
		} catch (ExpiredJwtException e) {
			throw new ExpiredTokenException("만료된 토큰", ErrorCode.EXPIRED_TOKEN);
		} catch (UnsupportedJwtException e) {
			throw new InvalidTokenException("지원하지 않는 토큰", ErrorCode.INVALID_TOKEN);
		} catch (IllegalArgumentException e) {
			throw new InvalidTokenException("잘못된 토큰", ErrorCode.INVALID_TOKEN);
		}
	}

	public Authentication getAuthentication(String accessToken) {
		// 토큰 복호화
		Claims claims = parseClaims(accessToken);

		// 클레임에서 권한 정보 가져오기
		Collection<? extends GrantedAuthority> authorities = Arrays.stream(
				new String[]{claims.get(AUTHORITIES_KEY).toString()})
			.map(SimpleGrantedAuthority::new)
			.collect(Collectors.toList());
		log.debug("claims subject:= [{}]", claims.getSubject());

		// UserDetails 객체를 만들어 Authentication 리턴
		UserDetails principal = new User(claims.getSubject(), "", authorities);
		return new UsernamePasswordAuthenticationToken(principal, "", authorities);
	}

	/**
	 * Access Token 클레임에서 정보 가져오기
	 */
	public static Claims parseClaims(String accessToken) {
		try {
			return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build()
				.parseClaimsJws(accessToken).getBody();
		} catch (ExpiredJwtException e) {
			return e.getClaims();
		}
	}

	/**
	 * Token에서 Expiration 가져오기
	 */
	public Long getExpiration(String token) {
		return parseClaims(token).getExpiration().getTime();
	}

	/**
	 * Request Header에서 Access Token 정보 추출
	 */
	public String resolveAccessToken(HttpServletRequest request) {
		String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_TYPE)) {
			return bearerToken.substring(7);
		}
		return null;
	}

	/**
	 * Request Header에서 Refresh Token 정보 추출
	 */
	public String resolveRefreshToken(HttpServletRequest request) {
		String bearerToken = request.getHeader(REFRESH_HEADER);
		if (StringUtils.hasText(bearerToken)) {
			return bearerToken;
		}
		return null;
	}



}
