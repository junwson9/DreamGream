package com.ssafy.dreamgream.domain.member.service;

import com.ssafy.dreamgream.domain.member.dto.response.MemberResponseDto;
import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.enums.Gender;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.AuthenticationException;

public interface MemberService {

    Member getCurrentMember() throws AuthenticationException;

	Long getCurrentMemberId() throws AuthenticationException;

	MemberResponseDto updateInfo(String nickname, Gender gender, Integer birthyear);

	Page<Member> findByNickname(String nickname, Pageable pageable);
}
