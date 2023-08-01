package com.ssafy.dreamgream.domain.post.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Set;

@Slf4j
@Service
public class LikeService {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public void addLike(String postId, String userId) {
        String key = "like_post_"+postId;
        String member = "member_"+userId;
        redisTemplate.opsForSet().add(key,member);
    }

    public void removeLike(String postId, String userId) {
        String key = "like_post_"+postId;
        String member = "member_"+userId;
        redisTemplate.opsForSet().remove(key,member);
    }

    public Set<String> getLikedUserIds(String postId) {
        String key = "like_post_" + postId;
        return redisTemplate.opsForSet().members(key);
    }

}
