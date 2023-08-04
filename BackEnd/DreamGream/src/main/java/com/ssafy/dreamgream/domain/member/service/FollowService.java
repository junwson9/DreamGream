package com.ssafy.dreamgream.domain.member.service;

import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.repository.FollowRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;


    public List<Member> getFollowers(Long memberId) {
        Long taregtId = memberId;
        List<Member> followers = followRepository.findAllByTarget(taregtId);
        return null;
    }

    public List<Member> getFollowings(Long memberId) {
        Long followerId = memberId;
        List<Member> followings = followRepository.findAllByFollower(followerId);
        return null;
    }
}
