package com.ssafy.dreamgream;

import com.ssafy.dreamgream.domain.post.entity.MemberPostCongrat;
import com.ssafy.dreamgream.domain.post.entity.MemberPostCheer;
import com.ssafy.dreamgream.domain.post.repository.MemberPostCelebrateRepository;
import com.ssafy.dreamgream.domain.post.repository.MemberPostCheerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.util.Set;

@Slf4j
@Component
public class MyScheduler {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private MemberPostCheerRepository memberPostCheerRepository;

    @Autowired
    private MemberPostCelebrateRepository memberPostCelebrateRepository;

    @Scheduled(cron = "0 0 6 * * ?")
    public void scheduleTest(){
        Set<String> keys = redisTemplate.keys("*");
        for (String key : keys) {
            Set<String> members = redisTemplate.opsForSet().members(key);
            String post_number = key.substring(key.lastIndexOf("_") + 1);
            int postId = Integer.parseInt(post_number);
            if (key.contains("cheer_post")) {
                for (String member : members) {
                    MemberPostCheer memberPostCheer = new MemberPostCheer();
                    String member_number = member.substring(member.lastIndexOf("_") + 1);
                    int memberId = Integer.parseInt(member_number);
                    memberPostCheer.setCheer((long) postId,Long.valueOf(memberId));
                    memberPostCheerRepository.save(memberPostCheer);
                }
            }
            if (key.contains("congrat_post")) {
                for (String member : members) {
                    MemberPostCongrat memberPostCongrat = new MemberPostCongrat();
                    String member_number = member.substring(member.lastIndexOf("_") + 1);
                    int memberId = Integer.parseInt(member_number);
                    memberPostCongrat.setCongrat((long) postId,Long.valueOf(memberId));
                    memberPostCelebrateRepository.save(memberPostCongrat);
                }
            }
        }
    }
}