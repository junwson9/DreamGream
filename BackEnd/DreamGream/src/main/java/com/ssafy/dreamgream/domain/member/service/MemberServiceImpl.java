package com.ssafy.dreamgream.domain.member.service;

import com.ssafy.dreamgream.domain.member.dto.response.MemberResponseDto;
import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public Long getCurrentMemberId() throws AuthenticationException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            // 사용자가 인증되지 않았거나 익명 사용자인 경우
            throw new IllegalAccessError("인증되지 않았거나 익명 사용자 입니다.");
            /*
            TODO 예외처리
            throw new AccessDeniedException("User is not authenticated.");
             */
        }

        Object principal = authentication.getPrincipal();
        if (!(principal instanceof UserDetails)) {
            // Principal이 UserDetails 타입이 아닌 경우
            throw new IllegalArgumentException("Principal is not of type UserDetails.");
        }

        UserDetails userDetails = (UserDetails) principal;
        Long memberId = Long.valueOf(userDetails.getUsername());

        return memberId;
    }

    @Override
    public Member getCurrentMember() throws AuthenticationException {
        Long memberId = getCurrentMemberId();

        Member currentMember = memberRepository.findById(memberId).orElseThrow(); // TODO: 예외처리
        return currentMember;
    }


    @Override
    @Transactional
    public MemberResponseDto updateInfo(String nickname, Gender gender, Integer birthyear) {
        Member member = getCurrentMember();
        member.updateInfo(nickname, gender, birthyear);
        MemberResponseDto memberResponseDto = MemberResponseDto.builder()
                .id(member.getMemberId())
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
    public Page<Member> findByNickname(String nickname, Pageable pageable) {
        Page<Member> members = memberRepository.findByNicknameContaining(nickname, pageable);
        return members;
    }


}
