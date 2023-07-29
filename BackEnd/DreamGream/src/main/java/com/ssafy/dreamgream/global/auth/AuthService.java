package com.ssafy.dreamgream.global.auth;

import com.ssafy.dreamgream.global.auth.dto.request.TokenRequestDto;
import com.ssafy.dreamgream.global.jwt.TokenDto;

public interface AuthService {

	//토큰 재발급
	public TokenDto reissue(TokenRequestDto tokenRequestDto);

}
