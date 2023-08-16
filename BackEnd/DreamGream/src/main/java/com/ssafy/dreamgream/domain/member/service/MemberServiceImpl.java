package com.ssafy.dreamgream.domain.member.service;

import com.ssafy.dreamgream.domain.member.dto.response.FollowListResponseDto;
import com.ssafy.dreamgream.domain.member.dto.response.MemberResponseDto;
import com.ssafy.dreamgream.domain.member.dto.response.MyInfoResponseDto;
import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.domain.member.repository.FollowRepository;
import com.ssafy.dreamgream.domain.member.repository.MemberRepository;
import com.ssafy.dreamgream.global.common.exception.ErrorCode;
import com.ssafy.dreamgream.global.common.exception.customException.MemberNotFoundException;
import com.ssafy.dreamgream.global.common.exception.customException.NotAuthorizedMemberException;
import com.ssafy.dreamgream.global.s3.S3Uploader;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;
    private final S3Uploader s3Uploader;

    @Override
    public Long getCurrentMemberId() throws AuthenticationException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("Authentication : {}", authentication.toString());

        if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            throw new NotAuthorizedMemberException("인증되지 않았거나 익명 사용자 입니다.", ErrorCode.NOT_AUTHORIZED_MEMBER);
        }

        Object principal = authentication.getPrincipal();
        if (!(principal instanceof UserDetails)) {
            throw new NotAuthorizedMemberException("Principal is not of type UserDetails.", ErrorCode.NOT_AUTHORIZED_MEMBER);
        }

        UserDetails userDetails = (UserDetails) principal;
        Long memberId = Long.valueOf(userDetails.getUsername());
        log.info("currentMemberId: {}", memberId);

        return memberId;
    }


    @Override
    public Member getCurrentMember() throws AuthenticationException {
        Long memberId = getCurrentMemberId();
        Member currentMember = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberNotFoundException("MemberNotFoundException", ErrorCode.MEMBER_NOT_FOUND));
        return currentMember;
    }


    @Override
    @Transactional
    public MyInfoResponseDto updateInfo(String nickname, Gender gender, Integer birthyear) {
        Member member = getCurrentMember();
        member.updateInfo(nickname, gender, birthyear);
        MyInfoResponseDto myInfoResponseDto = MyInfoResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .gender(member.getGender())
                .birthyear(member.getBirthyear())
                .provider(member.getProvider())
                .role(member.getRole())
                .profileImg(member.getProfileImg())
                .build();
        return myInfoResponseDto;
    }


    @Override
    @Transactional
    public MyInfoResponseDto updateProfileImg(MultipartFile file) {

        Member member = getCurrentMember();

        if(!file.isEmpty()) {
            String profileImg = s3Uploader.getImageUrl("profile", file, member.getMemberId());
            member.updateProfileImg(profileImg);
            log.info("프로필 이미지 변경");
        } else {
            member.updateProfileImg(null);
            log.info("프로필 이미지 삭제");
        }

        MyInfoResponseDto myInfoResponseDto = MyInfoResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .gender(member.getGender())
                .birthyear(member.getBirthyear())
                .provider(member.getProvider())
                .role(member.getRole())
                .profileImg(member.getProfileImg())
                .build();

        return myInfoResponseDto;
    }


    @Override
    public List<FollowListResponseDto> findByNickname(String nickname, Pageable pageable) {
        Member currentMember = getCurrentMember();

        List<FollowListResponseDto> members = memberRepository.findByNicknameContaining(nickname, currentMember, pageable);
        return members;
    }


    @Override
    public MemberResponseDto getMemberInfo(Long memberId, Boolean loginFlag) {
        // 존재하지 않는 member인 경우
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException("MemberNotFoundException", ErrorCode.MEMBER_NOT_FOUND));

        // 회원의 팔로워, 팔로잉 수 가져오기
        Long cntFollowers = followRepository.countByToMember(member);
        Long cntFollowings = followRepository.countByFromMember(member);

        // 로그인한 회원이 해당 회원을 팔로우 했는 지 가져오기
        Boolean isFollowed = null;
        if(loginFlag != null && loginFlag) {
            Long currentMemberId = getCurrentMemberId();
            int count = followRepository.countByToMemberIdAndFromMemberId(memberId, currentMemberId);
            if(count == 0) {
                isFollowed = false;
            }  else {
                isFollowed = true;
            }
        }

        MemberResponseDto memberResponseDto = MemberResponseDto.builder()
            .memberId(memberId)
            .nickname(member.getNickname())
            .profileImg(member.getProfileImg())
            .cntFollowers(cntFollowers)
            .cntFollowings(cntFollowings)
            .isFollowed(isFollowed)
            .build();

        return memberResponseDto;
    }


}
