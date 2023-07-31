package com.ssafy.dreamgream.domain.post.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class RedisService {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    // SADD 명령어 사용 예시
    public void addMemberToSet(String key, String member) {
        redisTemplate.opsForSet().add(key, member);
    }

    // SREM 명령어 사용 예시
    public void removeMemberFromSet(String key, String member) {
        redisTemplate.opsForSet().remove(key, member);
    }

    // SMEMBERS 명령어 사용 예시
    public Set<String> getMembersFromSet(String key) {
        return redisTemplate.opsForSet().members(key);
    }
}

