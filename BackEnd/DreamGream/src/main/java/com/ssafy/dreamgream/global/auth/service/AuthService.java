package com.ssafy.dreamgream.global.auth.service;

import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.global.auth.dto.request.TokenRequestDto;
import com.ssafy.dreamgream.global.auth.dto.response.TokenResponseDto;
import org.springframework.security.core.Authentication;

public interface AuthService {

	public TokenResponseDto reissue(TokenRequestDto tokenRequestDto);

	TokenResponseDto updateRoleToUser(Gender gender, Integer birthyear);

	void saveRefreshTokenRedis(Authentication authentication, TokenResponseDto tokenResponseDto);
}
