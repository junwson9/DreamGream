package com.ssafy.dreamgream.domain.member.service;

import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.domain.member.enums.Role;
import com.ssafy.dreamgream.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TestMemberService {

    private final MemberRepository memberRepository;

    public Member getTestMember() {

        Member member = Member.builder()
                .memberId(1L)
                .birthyear(1997)
                .gender(Gender.MALE)
                .role(Role.ROLE_USER)
                .email("test.com")
                .build();

        return member;
    }

}
