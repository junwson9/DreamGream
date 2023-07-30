package com.ssafy.dreamgream.global.auth.service;

import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.global.auth.dto.request.TokenRequestDto;
import com.ssafy.dreamgream.global.jwt.TokenDto;
import java.time.Year;
import org.springframework.security.core.Authentication;

public interface AuthService {

	public TokenDto reissue(TokenRequestDto tokenRequestDto);

	TokenDto updateRoleToUser(Gender gender, Year birthyear);

	void saveRefreshTokenRedis(Authentication authentication, TokenDto tokenDto);
}
