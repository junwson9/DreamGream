package com.ssafy.dreamgream.domain.post.service;
import com.ssafy.dreamgream.domain.post.entity.MemberPostCheer;
import com.ssafy.dreamgream.domain.post.entity.MemberPostCongrat;
import com.ssafy.dreamgream.domain.post.entity.Post;
import com.ssafy.dreamgream.domain.post.repository.MemberPostCheerRepository;
import com.ssafy.dreamgream.domain.post.repository.MemberPostCongratRepository;
import com.ssafy.dreamgream.domain.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@Slf4j
@RequiredArgsConstructor
public class ScheduleService {

    private final PostRepository postRepository;
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
            Long cnt = redisTemplate.opsForSet().size(key);
            Set<String> members = redisTemplate.opsForSet().members(key);
            String post_number = key.substring(key.lastIndexOf("_") + 1);
            Post post = postRepository.findById(Long.valueOf(post_number)).orElseThrow();
            if (post == null){
                log.info("not exist");
            } else {
                post.setCheerCnt(cnt);
                postRepository.save(post);
            }
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
            Long cnt = redisTemplate.opsForSet().size(key);
            Set<String> members = redisTemplate.opsForSet().members(key);
            String post_number = key.substring(key.lastIndexOf("_") + 1);
            Post post = postRepository.findById(Long.valueOf(post_number)).orElseThrow();
            if (post == null){
                log.info("not exist");
            } else {
                post.setCheerCnt(cnt);
                postRepository.save(post);
            }
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

