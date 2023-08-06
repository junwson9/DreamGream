package com.ssafy.dreamgream.domain.post.service;
import com.ssafy.dreamgream.domain.post.entity.MemberPostCheer;
import com.ssafy.dreamgream.domain.post.entity.MemberPostCongrat;
import com.ssafy.dreamgream.domain.post.repository.MemberPostCheerRepository;
import com.ssafy.dreamgream.domain.post.repository.MemberPostCongratRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class ScheduleService {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private MemberPostCheerRepository memberPostCheerRepository;

    @Autowired
    private MemberPostCongratRepository memberPostCongratRepository;

    @Scheduled(cron = "0 0 6 * * ?")
    public void scheduleCheer() {
        Set<String> keys = redisTemplate.keys("cheer_post_*");
        for (String key : keys) {
            Set<String> members = redisTemplate.opsForSet().members(key);
            String post_number = key.substring(key.lastIndexOf("_") + 1);
            int postId = Integer.parseInt(post_number);
            for (String member : members) {
                MemberPostCheer memberPostCheer = new MemberPostCheer();
                int memberId = Integer.parseInt(member);
                memberPostCheer.setCheer((long) postId, Long.valueOf(memberId));
                memberPostCheerRepository.save(memberPostCheer);
            }
        }
    }

    @Scheduled(cron = "0 0 6 * * ?")
    public void scheduleCongrat() {
        Set<String> keys = redisTemplate.keys("congrat_post_*");
        for (String key : keys) {
            Set<String> members = redisTemplate.opsForSet().members(key);
            String post_number = key.substring(key.lastIndexOf("_") + 1);
            int postId = Integer.parseInt(post_number);
            for (String member : members) {
                MemberPostCongrat memberPostCongrat = new MemberPostCongrat();
                int memberId = Integer.parseInt(member);
                memberPostCongrat.setCongrat((long) postId, Long.valueOf(memberId));
                memberPostCongratRepository.save(memberPostCongrat);
            }
        }
    }
}

