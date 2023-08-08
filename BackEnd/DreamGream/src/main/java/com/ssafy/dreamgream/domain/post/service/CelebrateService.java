package com.ssafy.dreamgream.domain.post.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CelebrateService {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public void addCelebrate(String postId, String memberId) {
        String keyPost = "celebrate_post_"+postId;
        String keyMember = "member_"+memberId;
        redisTemplate.opsForSet().add(keyPost,memberId);
        redisTemplate.opsForSet().add(keyMember,postId);
    }

    public void removeCelebrate(String postId, String memberId) {
        String keyPost = "celebrate_post_"+postId;
        String keyMember = "member_"+memberId;
        redisTemplate.opsForSet().remove(keyPost,memberId);
        redisTemplate.opsForSet().remove(keyMember,postId);
    }
}
