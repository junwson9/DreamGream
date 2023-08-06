package com.ssafy.dreamgream.global.config.oauth.handler;

import com.ssafy.dreamgream.global.auth.dto.response.TokenResponseDto;
import com.ssafy.dreamgream.global.auth.service.AuthService;
import com.ssafy.dreamgream.global.config.oauth.CustomOAuth2User;
import com.ssafy.dreamgream.global.jwt.JwtTokenProvider;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@Slf4j
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private final JwtTokenProvider jwtTokenProvider;
	private final AuthService authService;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {
		log.info("OAuth2 인증 성공");

		CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

		// JWT 생성 및 Redis에 refresh token 저장
		TokenResponseDto tokenResponseDto = jwtTokenProvider.createTokenDto(oAuth2User.getId(), oAuth2User.getRole());
		authService.saveRefreshTokenRedis(authentication, tokenResponseDto);

		String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/oauth2/redirect")
			.queryParam("access-token", tokenResponseDto.getAccessToken())
			.queryParam("refresh-token", tokenResponseDto.getRefreshToken())
			.queryParam("role", oAuth2User.getRole())
			.build().toUriString();

		log.info("targetUrl : " + targetUrl);

		getRedirectStrategy().sendRedirect(request, response, targetUrl);
	}

}
