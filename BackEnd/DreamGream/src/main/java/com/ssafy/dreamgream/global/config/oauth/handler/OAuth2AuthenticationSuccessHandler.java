package com.ssafy.dreamgream.global.config.oauth.handler;

import static com.ssafy.dreamgream.global.jwt.JwtAuthenticationFilter.AUTHORIZATION_HEADER;

import com.ssafy.dreamgream.global.auth.service.AuthService;
import com.ssafy.dreamgream.global.config.oauth.CustomOAuth2User;
import com.ssafy.dreamgream.global.jwt.JwtTokenProvider;
import com.ssafy.dreamgream.global.jwt.TokenDto;
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
		TokenDto tokenDto = jwtTokenProvider.generateTokenDto(authentication);
		authService.saveRefreshTokenRedis(authentication, tokenDto);

		// response body에 담는 게 안 된다면 파라미터로 access token, refresh token만 보내는 경우 (보안에 안 좋음)
		String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/oauth2/redirect")
			.queryParam("access-token", tokenDto.getAccessToken())
			.queryParam("refresh-token", tokenDto.getRefreshToken())
			.queryParam("role", oAuth2User.getRole())
			.build().toUriString();

		response.addHeader(AUTHORIZATION_HEADER, "Bearer " + tokenDto.getAccessToken());

		log.info("targetUrl : " + targetUrl);

		getRedirectStrategy().sendRedirect(request, response, targetUrl);
	}


}
