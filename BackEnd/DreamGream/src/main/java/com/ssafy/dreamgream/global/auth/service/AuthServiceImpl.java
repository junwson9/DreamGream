package com.ssafy.dreamgream.global.auth.service;

import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.domain.member.enums.Role;
import com.ssafy.dreamgream.domain.member.repository.MemberRepository;
import com.ssafy.dreamgream.domain.member.service.MemberService;
import com.ssafy.dreamgream.global.auth.dto.request.TokenRequestDto;
import com.ssafy.dreamgream.global.jwt.JwtTokenProvider;
import com.ssafy.dreamgream.global.jwt.TokenDto;
import java.time.Year;
import java.util.ArrayList;
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
	public TokenDto reissue(TokenRequestDto tokenRequestDto) {
		// 1. Access Token 에서 memberId 가져오기
		log.info("accessToken: {}", tokenRequestDto.getAccessToken());
		Authentication authentication = jwtTokenProvider.getAuthentication(tokenRequestDto.getAccessToken());
		UserDetails principal = (UserDetails) authentication.getPrincipal();
		String memberId = principal.getUsername();
		log.info("princial username(=memberId): {}", memberId);

		// 2. Refresh Token 검증
		if (!jwtTokenProvider.validateToken(tokenRequestDto.getRefreshToken())) {
			/*
			TODO: 예외처리
			throw new BadRequestException("Refresh Token 정보가 유효하지 않습니다");
			 */
		}

		// 3. Redis 의 Refresh Token 값과 비교
		String redisRefreshToken = (String) redisTemplate.opsForValue().get("RT:" + memberId);
		log.info("레디스 리프레시 토큰: {}", redisRefreshToken);
		if(!tokenRequestDto.getRefreshToken().equals(redisRefreshToken)) {
			/*
			TODO: 예외처리
			throw new BadRequestException("Refresh Token 정보가 일치하지 않습니다");
			*/
		}

		// 4. 새로운 토큰 생성
		TokenDto tokenDto = jwtTokenProvider.generateTokenDto(authentication);
		log.info("tokenDTO: {}", tokenDto);

		// 5. RefreshToken Redis 업데이트
		redisTemplate.opsForValue()
			.set("RT:" + authentication.getName(), tokenDto.getRefreshToken(),
				tokenDto.getRefreshTokenExpireIn(), TimeUnit.MILLISECONDS);

		return tokenDto;
	}


	@Override
	@Transactional
	public TokenDto updateRoleToUser(Gender gender, Integer birthyear) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		log.info("수정전 Authentication : {}", authentication);

		UserDetails userDetails = (User) authentication.getPrincipal();
		Member currentMember = memberService.getCurrentMember();

		// DB 업데이트
		currentMember.updateMemberRoleToUser(gender, birthyear, Role.ROLE_USER);
		memberRepository.save(currentMember);
		log.info("member : {}", currentMember);

		// Security Authentication 업데이트
		List<GrantedAuthority> updatedAuthorities = new ArrayList<>(userDetails.getAuthorities());
		updatedAuthorities.add(new SimpleGrantedAuthority(Role.ROLE_USER.name()));
		updatedAuthorities.removeIf(auth -> auth.getAuthority().equals(Role.ROLE_GUEST.name()));

		// 변경된 authorities를 사용하여 새로운 Authentication 객체 생성
		Authentication newAuthentication = new UsernamePasswordAuthenticationToken(
			userDetails, authentication.getCredentials(), updatedAuthorities);
		SecurityContextHolder.getContext().setAuthentication(newAuthentication);
		log.info("newAuthentication : {}", newAuthentication);

		// JWT 재발급
		TokenDto tokenDto = jwtTokenProvider.generateUpdatedRoleTokenDto(newAuthentication);
		saveRefreshTokenRedis(newAuthentication, tokenDto);
		return tokenDto;
	}

	@Override
	@Transactional
	public void saveRefreshTokenRedis(Authentication authentication, TokenDto tokenDto) {
		redisTemplate.opsForValue()
			.set("RT:" + authentication.getName(), tokenDto.getRefreshToken(),
				tokenDto.getRefreshTokenExpireIn(), TimeUnit.MILLISECONDS);
	}


}
