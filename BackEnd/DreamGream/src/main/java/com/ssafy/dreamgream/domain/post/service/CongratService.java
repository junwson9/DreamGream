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
        String key = "congrat_post_"+postId;
        String member = "member_"+memberId;
        redisTemplate.opsForSet().add(key,member);
    }

    public void removeCongrat(String postId, String memberId) {
        String key = "congrat_post_"+postId;
        String member = "member_"+memberId;
        redisTemplate.opsForSet().remove(key,member);
    }

    public Set<String> getCongratMemberIds(String postId) {
        String key = "congrat_post_" + postId;
        log.info(postId);
        //log.info("type of return {}",redisTemplate.opsForSet().members(key).getClass());
        return redisTemplate.opsForSet().members(key);
    }
}
