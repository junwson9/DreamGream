package com.ssafy.dreamgream.global.config;

import com.ssafy.dreamgream.global.config.oauth.handler.OAuth2AuthenticationFailureHandler;
import com.ssafy.dreamgream.global.config.oauth.handler.OAuth2AuthenticationSuccessHandler;
import com.ssafy.dreamgream.global.config.oauth.service.CustomOAuth2UserService;
import com.ssafy.dreamgream.global.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final CustomOAuth2UserService customOAuth2UserService;
	private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
	private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
	private final JwtAuthenticationFilter jwtAuthenticationFilter;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.csrf().disable()
			.cors().configurationSource(corsConfigurationSource())

			// 세션 사용하지 않음
			.and()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

			// 권한 설정
			.and()
			.authorizeHttpRequests()
			.antMatchers("/**").permitAll() // 테스트를 위해 모든 요청에 대해 허용해둠
//			.antMatchers("/", "/css/**", "/images/**", "/js/**", "/favicon.ico", "/h2-console/**").permitAll()
//			.antMatchers("/swagger-ui/**", "/auth/**", "/api/members").permitAll()
//			.antMatchers("/admin/**").hasAuthority("ROLE_ADMIN")
//			.anyRequest().authenticated()

			.and()
			.formLogin().disable()

			.oauth2Login()
			.successHandler(oAuth2AuthenticationSuccessHandler)
			.failureHandler(oAuth2AuthenticationFailureHandler)
			.userInfoEndpoint().userService(customOAuth2UserService);

		http
			.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	// CORS 허용
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();

		configuration.addAllowedOriginPattern("*");
		configuration.addAllowedHeader("*");
		configuration.addAllowedMethod("*");
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

}
