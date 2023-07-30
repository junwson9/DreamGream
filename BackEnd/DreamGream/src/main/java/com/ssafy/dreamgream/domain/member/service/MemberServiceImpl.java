package com.ssafy.dreamgream.domain.member.service;

import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.domain.member.repository.MemberRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public Member getCurrentMember() throws AuthenticationException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (User) authentication.getPrincipal();
        Long memberId = Long.valueOf(userDetails.getUsername());

        Member currentMember = memberRepository.findById(memberId).orElseThrow(); // TODO: 예외처리
        return currentMember;
    }

    @Override
    @Transactional
    public Member updateInfo(String nickname, Gender gender, Integer birthyear) {
        Member member = getCurrentMember();
        member.updateInfo(nickname, gender, birthyear);
        return member;
    }


}
