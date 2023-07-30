package com.ssafy.dreamgream.domain.member.service;

import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.enums.Gender;
import java.util.List;
import org.springframework.security.core.AuthenticationException;

public interface MemberService {

    Member getCurrentMember() throws AuthenticationException;

	Member updateInfo(String nickname, Gender gender, Integer birthyear);

}
