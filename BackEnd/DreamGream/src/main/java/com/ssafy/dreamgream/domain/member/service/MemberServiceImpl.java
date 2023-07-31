package com.ssafy.dreamgream.domain.member.service;

import com.ssafy.dreamgream.domain.member.dto.response.MemberResponseDto;
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
    public MemberResponseDto updateInfo(String nickname, Gender gender, Integer birthyear) {
        Member member = getCurrentMember();
        member.updateInfo(nickname, gender, birthyear);
        MemberResponseDto memberResponseDto = MemberResponseDto.builder()
                .id(member.getId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .gender(member.getGender())
                .birthyear(member.getBirthyear())
                .provider(member.getProvider())
                .role(member.getRole())
                .build();
        return memberResponseDto;
    }

    @Override
    public List<Member> findByNickname(String nickname) {
        List<Member> members = memberRepository.findByNicknameContaining(nickname);
        return members;
    }


}
