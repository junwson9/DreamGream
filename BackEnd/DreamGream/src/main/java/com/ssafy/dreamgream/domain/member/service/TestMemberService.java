package com.ssafy.dreamgream.domain.member.service;

import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TestMemberService {

    private final MemberRepository memberRepository;

    public Member getTestMember() {

        Member member = memberRepository.findById(2L).orElseThrow();

        return member;
    }

}
