package com.ssafy.dreamgream.global.auth.service;

import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.domain.member.enums.Role;
import com.ssafy.dreamgream.domain.member.repository.MemberRepository;
import com.ssafy.dreamgream.domain.member.service.MemberService;
import com.ssafy.dreamgream.global.auth.dto.response.TokenResponseDto;
import com.ssafy.dreamgream.global.config.oauth.CustomOAuth2User;
import com.ssafy.dreamgream.global.jwt.JwtTokenProvider;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final MemberService memberService;
	private final MemberRepository memberRepository;
	private final JwtTokenProvider jwtTokenProvider;
	private final RedisTemplate redisTemplate;

	@Override
	@Transactional
	public TokenResponseDto reissue(String accessToken, String refreshToken) {
		// Refresh Token 검증
		if (!jwtTokenProvider.validateToken(refreshToken)) {
			/*
			TODO: 예외처리
			throw new BadRequestException("Refresh Token 정보가 유효하지 않습니다");
			 */
		}

		// Redis 의 Refresh Token 값과 비교
		Member member = memberService.getCurrentMember();
		log.info("memberId: {}", member.getId());
		String redisRefreshToken = (String) redisTemplate.opsForValue().get("RT:" + member.getId());
		log.info("refresh token of redis: {}", redisRefreshToken);
		if(!refreshToken.equals(redisRefreshToken)) {
			/*
			TODO: 예외처리
			throw new BadRequestException("Refresh Token 정보가 일치하지 않습니다");
			*/
		}

		// 새 토큰 생성 및 Redis 업데이트
		Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
		TokenResponseDto tokenResponseDto = jwtTokenProvider.generateTokenDto(authentication);
		saveRefreshTokenRedis(authentication, tokenResponseDto);

		return tokenResponseDto;
	}


	@Override
	@Transactional
	public TokenResponseDto updateRoleToUser(Gender gender, Integer birthyear) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		log.info("수정전 Authentication: {}", authentication);

		UserDetails userDetails = (User) authentication.getPrincipal();
		Member currentMember = memberService.getCurrentMember();

		// DB 업데이트
		currentMember.updateMemberRoleToUser(gender, birthyear, Role.ROLE_USER);
		memberRepository.save(currentMember);
		log.info("member: {}", currentMember);

		// Security Authentication 업데이트
		List<GrantedAuthority> updatedAuthorities = new ArrayList<>(userDetails.getAuthorities());
		updatedAuthorities.add(new SimpleGrantedAuthority(Role.ROLE_USER.name()));
		updatedAuthorities.removeIf(auth -> auth.getAuthority().equals(Role.ROLE_GUEST.name()));

		// 변경된 authorities를 사용하여 새로운 Authentication 객체 생성
		Authentication newAuthentication = new UsernamePasswordAuthenticationToken(
			userDetails, authentication.getCredentials(), updatedAuthorities);
		SecurityContextHolder.getContext().setAuthentication(newAuthentication);
		log.info("newAuthentication: {}", newAuthentication);

		// JWT 재발급
		TokenResponseDto tokenResponseDto = jwtTokenProvider.generateTokenDto(newAuthentication);
		saveRefreshTokenRedis(newAuthentication, tokenResponseDto);
		return tokenResponseDto;
	}


	/**
	 * 1. 요청 헤더에 담긴 access token 검증 (Filter에 구현)
	 * 2. 검증이 되면 Redis에 저장된 RT 삭제
	 * 3. Access Token을 key, 'logout' 문자열을 value로 Redis에 저장하여 토큰을 Black List 처리
	 * 4. 로그아웃 처리한 JWT로 요청을 보내면 검증을 통해 로그아웃 사용자인 경우 인증 거부 (Filter에 구현)
	 */
	@Override
	public void logout(String accessToken) {
		Member member = memberService.getCurrentMember();

		// Redis에 저장된 refresh token 삭제
		if (redisTemplate.opsForValue().get("RT:" + member.getId()) != null) {
			redisTemplate.delete("RT:" + member.getId());
		} else {
			/*
			TODO: 예외처리
			throw new BadRequestException("Refresh Token 정보가 일치하지 않습니다");
			*/
		}

		// Access Token 유효시간을 가져와서 BlackList 로 저장
		Long expiration = jwtTokenProvider.getExpiration(accessToken) - System.currentTimeMillis();
		log.info("access token 만료시간: {}", expiration);
		redisTemplate.opsForValue().set(accessToken, "logout", expiration, TimeUnit.MILLISECONDS);
	}



	@Override
	@Transactional
	public void saveRefreshTokenRedis(Authentication authentication, TokenResponseDto tokenResponseDto) {
		log.info("refresh token 만료시간: {}", tokenResponseDto.getRefreshTokenExpireIn() - System.currentTimeMillis());
		redisTemplate.opsForValue()
			.set("RT:" + authentication.getName(), tokenResponseDto.getRefreshToken(),
				tokenResponseDto.getRefreshTokenExpireIn() - System.currentTimeMillis(), TimeUnit.MILLISECONDS);
	}
}
