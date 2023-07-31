package com.ssafy.dreamgream.domain.post.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Set;

@Slf4j
@Service
public class RedisService {

    private static final String LIKES_SET_KEY = "Likes";

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public void addLike(String postId, String userId) {
        String key = postId;
        String member = userId;
        redisTemplate.opsForSet().add(LIKES_SET_KEY, key + ":" + member);
        log.info(key);
    }

    public void removeLike(String postId, String userId) {
        String key = postId;
        String member = userId;
        redisTemplate.opsForSet().remove(LIKES_SET_KEY, key + ":" + member);
    }

    public Set<String> getLikedUserIds(String postId) {
        String key = "Likes";
        return redisTemplate.opsForSet().members(key);
    }

}
