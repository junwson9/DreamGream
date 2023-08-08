package com.ssafy.dreamgream.global.config.oauth.handler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@Slf4j
@RequiredArgsConstructor
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

	@Value("${auth.redirect.url}")
	String redirectUrl;

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException exception) throws IOException, ServletException {
		// TODO 예외처리
		log.error("OAuth2 인증 실패:", exception.getMessage());

		String targetUrl = UriComponentsBuilder.fromUriString(redirectUrl)
			.queryParam("status", "error")
			.build().toUriString();
		getRedirectStrategy().sendRedirect(request, response, targetUrl);
	}

}
