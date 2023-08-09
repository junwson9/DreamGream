package com.ssafy.dreamgream.domain.member.service;

import com.ssafy.dreamgream.domain.member.dto.response.FollowListResponseDto;
import com.ssafy.dreamgream.domain.member.entity.Follow;
import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.repository.FollowRepository;
import com.ssafy.dreamgream.domain.member.repository.MemberRepository;
import com.ssafy.dreamgream.global.common.exception.ErrorCode;
import com.ssafy.dreamgream.global.common.exception.customException.BadRequestException;
import com.ssafy.dreamgream.global.common.exception.customException.MemberNotFoundException;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;


    // 특정 회원을 팔로우한 회원 목록 + 현재 로그인한 회원의 팔로우 여부
    public List<FollowListResponseDto> getFollowers(Long memberId, Pageable pageable) {

        Member toMember = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberNotFoundException("MemberNotFoundException", ErrorCode.MEMBER_NOT_FOUND));

        Member currentMember = memberService.getCurrentMember();

        List<FollowListResponseDto> followers = followRepository.findFollowersWithPage(toMember, currentMember, pageable);

        return followers;
    }


    // 특정 회원이 팔로우한 회원 목록 + 현재 로그인한 회원의 팔로우 여부
    public List<FollowListResponseDto> getFollowings(Long memberId, Pageable pageable) {

        Member fromMember = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberNotFoundException("MemberNotFoundException", ErrorCode.MEMBER_NOT_FOUND));

        Member currentMember = memberService.getCurrentMember();

        List<FollowListResponseDto> followings = followRepository.findFollowingsWithPage(fromMember, currentMember, pageable);

        return followings;
    }


    @Transactional
    public void follow(Long toMemberId) {

        Member toMember = memberRepository.findById(toMemberId)
                .orElseThrow(() -> new MemberNotFoundException("팔로우할 대상이 존재하지 않음", ErrorCode.MEMBER_NOT_FOUND));

        Member fromMember = memberService.getCurrentMember();

        // 자기 자신은 팔로우 불가
        if(toMember.getMemberId().equals(fromMember.getMemberId())) {
            throw new BadRequestException("본인을 팔로우 할 수 없음", ErrorCode.BAD_REQUEST);
        }

        // 이미 팔로우되어 있는 지 확인
        int count = followRepository.countByToMemberIdAndFromMemberId(toMemberId, fromMember.getMemberId());
        if(count != 0) {
            throw new BadRequestException("이미 팔로우 하고 있음", ErrorCode.BAD_REQUEST);
        }

        Follow follow = Follow.builder().toMember(toMember).fromMember(fromMember).build();
        followRepository.save(follow);
    }


    @Transactional
    public void unFollow(Long toMemberId) {

        Member toMember = memberRepository.findById(toMemberId)
            .orElseThrow(() -> new MemberNotFoundException("언팔로우할 대상이 존재하지 않음", ErrorCode.MEMBER_NOT_FOUND));

        Member fromMember = memberService.getCurrentMember();

        // 이미 팔로우되어 있는 지 확인
        Follow follow = followRepository.findByToMemberAndFromMember(toMember, fromMember)
            .orElseThrow(() -> new BadRequestException("팔로우 하고 있지 않음", ErrorCode.BAD_REQUEST));

        followRepository.delete(follow);
    }
}
