package com.ssafy.dreamgream.global.auth;

import com.ssafy.dreamgream.global.auth.dto.request.TokenRequestDto;
import com.ssafy.dreamgream.global.jwt.JwtTokenProvider;
import com.ssafy.dreamgream.global.jwt.TokenDto;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final JwtTokenProvider jwtTokenProvider;
	private final RedisTemplate redisTemplate;

	@Override
	public TokenDto reissue(TokenRequestDto tokenRequestDto) {
		// 1. Refresh Token 검증
		if (!jwtTokenProvider.validateToken(tokenRequestDto.getRefreshToken())) {
			/*
			예외처리 필요
			throw new BadRequestException("Refresh Token 정보가 유효하지 않습니다");
			 */
		}

		// 2. Access Token 에서 userName 가져오기
		log.info("accessToken: {}", tokenRequestDto.getAccessToken());
		Authentication authentication = jwtTokenProvider.getAuthentication(tokenRequestDto.getAccessToken());
		UserDetails principal = (UserDetails) authentication.getPrincipal();
		String memberId = principal.getUsername();
		log.info("princial username(=memberId): {}", memberId);

		// 3. Redis 의 Refresh Token 값과 비교
		String redisRefreshToken = (String) redisTemplate.opsForValue().get("RT:" + memberId);
		log.info("레디스 리프레시 토큰: {}", redisRefreshToken);
		if(!tokenRequestDto.getRefreshToken().equals(redisRefreshToken)) {
			/*
			예외처리 필요
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

}
