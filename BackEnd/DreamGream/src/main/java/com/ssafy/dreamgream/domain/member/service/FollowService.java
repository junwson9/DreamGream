package com.ssafy.dreamgream.domain.member.service;

import com.ssafy.dreamgream.domain.member.dto.response.FollowListResponseDto;
import com.ssafy.dreamgream.domain.member.entity.Follow;
import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.repository.FollowRepository;
import com.ssafy.dreamgream.domain.member.repository.MemberRepository;
import java.util.List;
import javax.transaction.Transactional;

import com.ssafy.dreamgream.global.exception.ErrorCode;
import com.ssafy.dreamgream.global.exception.customException.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;
    private final TestMemberService testMemberService;


    // 특정 회원을 팔로우한 회원 목록 + 현재 로그인한 회원의 팔로우 여부
    public List<FollowListResponseDto> getFollowers(Long memberId, Pageable pageable) {
        // TODO 존재하는 memberId인지 검증
        Member toMember = memberRepository.findById(memberId).orElseThrow();

        // TODO fromMember test가 아닌 진짜 currentMember로 교체
        Member currentMember = testMemberService.getTestMember();

        List<FollowListResponseDto> followers = followRepository.findFollowersWithPage(toMember, currentMember, pageable);

        return followers;
    }


    // 특정 회원이 팔로우한 회원 목록 + 현재 로그인한 회원의 팔로우 여부
    public List<FollowListResponseDto> getFollowings(Long memberId, Pageable pageable) {
        // TODO 존재하는 memberId인지 검증
        Member fromMember = memberRepository.findById(memberId).orElseThrow();

        // TODO fromMember test가 아닌 진짜 currentMember로 교체
        Member currentMember = testMemberService.getTestMember();

        List<FollowListResponseDto> followings = followRepository.findFollowingsWithPage(fromMember, currentMember, pageable);

        return followings;
    }


    @Transactional
    public void follow(Long toMemberId) {
        // TODO 예외처리 toMember가 존재하는지 확인
        Member toMember = memberRepository.findById(toMemberId)
                .orElseThrow(() -> new MemberNotFoundException("MemberNotFoundException", ErrorCode.MEMBER_NOT_FOUND));

        // TODO fromMember test가 아닌 진짜 currentMember로 교체
        Member fromMember = testMemberService.getTestMember();

        // TODO 예외처리 자기 자신은 팔로우 불가
        if(toMember.getMemberId().equals(fromMember.getMemberId())) {
            log.info("자기 자신을 팔로우할 수 없습니다");
        }

        // 이미 팔로우되어 있는 지 확인
        int count = followRepository.countByToMemberIdAndFromMemberId(toMemberId, fromMember.getMemberId());
        if(count != 0) {
            throw new RuntimeException("이미 팔로우하고 있습니다.");
        }

        Follow follow = Follow.builder().toMember(toMember).fromMember(fromMember).build();
        followRepository.save(follow);
    }


    @Transactional
    public void unFollow(Long toMemberId) {
        // TODO toMember가 존재하는지 확인
        Member toMember = memberRepository.findById(toMemberId).orElseThrow();
        log.info("toMember: {}", toMember);

        // TODO fromMember test가 아닌 진짜 currentMember로 교체
        Member fromMember = testMemberService.getTestMember();

        // 이미 팔로우되어 있는 지 확인
        Follow follow = followRepository.findByToMemberAndFromMember(toMember, fromMember).orElseThrow();

        followRepository.delete(follow);
    }
}
