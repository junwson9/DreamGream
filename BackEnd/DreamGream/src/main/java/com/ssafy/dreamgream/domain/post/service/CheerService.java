package com.ssafy.dreamgream.domain.post.service;

import com.ssafy.dreamgream.domain.member.service.MemberService;
import com.ssafy.dreamgream.domain.post.entity.Post;
import com.ssafy.dreamgream.domain.post.repository.PostRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@AllArgsConstructor
public class CheerService {
    private final PostRepository postRepository;
    private final MemberService memberService;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public void addCheer(Long postId, Long memberId) {
        //TODO: 게시글 삭제 됐을때 예외 처리
        postRepository.findById(postId).orElseThrow();
        //TODO: 회원만 좋아요 가능 / 2차 검증
        Long currentMemberId = memberService.getCurrentMemberId();
        if(memberId != currentMemberId){
            return;
        }
        String keyPost = "cheer_post_"+ postId;
        String keyMember = "member_"+memberId;
        redisTemplate.opsForSet().add(keyPost, String.valueOf(memberId));
        redisTemplate.opsForSet().add(keyMember, String.valueOf(postId));
    }

    public void removeCheer(Long postId, Long memberId) {
        //TODO: 게시글 삭제 됐을때 예외 처리
        postRepository.findById(postId).orElseThrow();
        //TODO: 회원만 좋아요 가능 / 2차 검증
        Long currentMemberId = memberService.getCurrentMemberId();
        if(memberId != currentMemberId){
            return;
        }
        String keyPost = "cheer_post_"+postId;
        String keyMember = "member_"+memberId;
        redisTemplate.opsForSet().remove(keyPost,memberId);
        redisTemplate.opsForSet().remove(keyMember,postId);
    }
}