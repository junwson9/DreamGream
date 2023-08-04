package com.ssafy.dreamgream.domain.post.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;


@Slf4j
@Service
public class CheerService {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public void addCheer(String postId, String memberId) {
        String keyPost = "cheer_post_"+postId;
        String keyMember = "member_"+memberId;
        redisTemplate.opsForSet().add(keyPost,memberId);
        redisTemplate.opsForSet().add(keyMember,postId);
    }

    public void removeCheer(String postId, String userId) {
        String keyPost = "cheer_post_"+postId;
        String keyMember = "member_"+userId;
        redisTemplate.opsForSet().remove(keyPost,userId);
        redisTemplate.opsForSet().remove(keyMember,postId);
    }
}