package com.ssafy.dreamgream.domain.member.service;

import com.ssafy.dreamgream.domain.member.dto.response.MemberResponseDto;
import com.ssafy.dreamgream.domain.member.dto.response.MyInfoResponseDto;
import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.enums.Gender;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.AuthenticationException;

public interface MemberService {

    Member getCurrentMember() throws AuthenticationException;

	Long getCurrentMemberId() throws AuthenticationException;

	MyInfoResponseDto updateInfo(String nickname, Gender gender, Integer birthyear);

	Page<Member> findByNickname(String nickname, Pageable pageable);

	MemberResponseDto getMemberInfo(Long memberId);
}
