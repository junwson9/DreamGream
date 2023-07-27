package com.ssafy.dreamgream.global.config.oauth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.dreamgream.global.config.oauth.CustomOAuth2User;
import com.ssafy.dreamgream.global.jwt.JwtTokenProvider;
import com.ssafy.dreamgream.global.jwt.TokenDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.concurrent.TimeUnit;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@Slf4j
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private final JwtTokenProvider jwtTokenProvider;
	private final RedisTemplate redisTemplate;
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {
		log.info("OAuth2 인증 성공");

		CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

		// JWT 생성 및 Redis에 refresh token 저장
		TokenDto tokenDto = jwtTokenProvider.generateTokenDto(authentication);
		redisTemplate.opsForValue()
			.set("RT:" + authentication.getName(), tokenDto.getRefreshToken(),
				tokenDto.getRefreshTokenExpireIn(), TimeUnit.MILLISECONDS);
		log.info("access token : " + tokenDto.getAccessToken());
		log.info("refresh token : " + tokenDto.getRefreshToken());

		/* GET 요청이라 BODY로 전달 못해서 아래 코드 지워야 함
		// TokenDto 객체를 JSON으로 변환
		ObjectMapper objectMapper = new ObjectMapper();
		String tokenJson = objectMapper.writeValueAsString(tokenDto);

		// JSON 형태의 TokenDto를 응답 본문에 포함하여 전달
		response.setContentType("application/json");
		response.getWriter().write(tokenJson);
		response.setStatus(HttpServletResponse.SC_OK);

//		String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/oauth2/redirect")
//			.build().toUriString();
		 */

		// response body에 담는 게 안 된다면 파라미터로 access token, refresh token만 보내는 경우 (보안에 안 좋음)
		String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/oauth2/redirect")
			.queryParam("access-token", tokenDto.getAccessToken())
			.queryParam("refresh-token", tokenDto.getRefreshToken())
			.build().toUriString();

		log.info("targetUrl : " + targetUrl);

		getRedirectStrategy().sendRedirect(request, response, targetUrl);
	}

}
