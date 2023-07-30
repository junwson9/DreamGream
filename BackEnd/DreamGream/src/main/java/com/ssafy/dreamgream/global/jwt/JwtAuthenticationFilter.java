package com.ssafy.dreamgream.global.jwt;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	public static final String AUTHORIZATION_HEADER = "Authorization";
	public static final String BEARER_TYPE = "Bearer";

	private final JwtTokenProvider jwtTokenProvider;
	private final RedisTemplate redisTemplate;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {

		try {
			// Request Header에서 JWT 추출
			String accessToken = jwtTokenProvider.resolveAccessToken((HttpServletRequest) request);
			log.info("accessToken: {}", accessToken);

			// validateToken으로 유효성 검사
			if (accessToken != null && jwtTokenProvider.validateToken(accessToken)) {
				// Redis에 해당 accessToken logout 여부 확인
				String isLogout = (String) redisTemplate.opsForValue().get(accessToken);
				// 로그아웃 되어있지 않으면 Authentication 객체를 가져와 SecurityContext에 저장
				if (ObjectUtils.isEmpty(isLogout)) {
					Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
					SecurityContextHolder.getContext().setAuthentication(authentication);
				}
			}
		} catch (RuntimeException e) {
			e.printStackTrace();
			response.setStatus(403);
			/*
			TODO 예외처리 필요
			 */
		}

		// 다음 필터로 request, response 전달
		filterChain.doFilter(request, response);
	}

}
