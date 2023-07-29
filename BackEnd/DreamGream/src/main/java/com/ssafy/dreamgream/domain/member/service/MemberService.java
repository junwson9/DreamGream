package com.ssafy.dreamgream.domain.member.service;

import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.global.jwt.TokenDto;
import java.time.Year;
import org.springframework.security.core.Authentication;

public interface MemberService {

    Long join();

	TokenDto updateRoleToUser(Long id, Gender gender, Year birthyear);

	void saveRefreshTokenRedis(Authentication authentication, TokenDto tokenDto);
}
