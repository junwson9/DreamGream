package com.ssafy.dreamgream.global.auth.service;

import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.global.auth.dto.response.TokenResponseDto;
import org.springframework.security.core.Authentication;

public interface AuthService {

	public TokenResponseDto reissue(String accessToken, String refreshToken);

	TokenResponseDto updateRoleToUser(Gender gender, Integer birthyear);

	void saveRefreshTokenRedis(Authentication authentication, TokenResponseDto tokenResponseDto);

	void logout(String accessToken);
}
