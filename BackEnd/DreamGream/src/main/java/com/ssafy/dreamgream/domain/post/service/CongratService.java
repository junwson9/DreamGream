package com.ssafy.dreamgream.domain.post.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Set;

@Slf4j
@Service
public class CongratService {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public void addCongrat(String postId, String memberId) {
        String keyPost = "congrat_post_"+postId;
        String keyMember = "member_"+memberId;
        redisTemplate.opsForSet().add(keyPost,memberId);
        redisTemplate.opsForSet().add(keyMember,postId);
    }

    public void removeCongrat(String postId, String memberId) {
        String keyPost = "congrat_post_"+postId;
        String keyMember = "member_"+memberId;
        redisTemplate.opsForSet().remove(keyPost,memberId);
        redisTemplate.opsForSet().remove(keyMember,postId);
    }
}
