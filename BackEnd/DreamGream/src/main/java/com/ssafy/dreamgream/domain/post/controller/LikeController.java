package com.ssafy.dreamgream.domain.post.controller;

import com.ssafy.dreamgream.domain.post.dto.request.LikeDto;
import com.ssafy.dreamgream.domain.post.service.RedisService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/redistest")
public class LikeController {

    @Autowired
    private RedisService redisService;
    @PostMapping("/add")
    public ResponseEntity<String> addData(@RequestBody LikeDto likedto) {
        String key = likedto.getKey();
        String member = likedto.getMember();

        // 여기서 key와 member를 이용하여 Redis에 데이터 추가하는 작업 수행
        redisService.addMemberToSet(key, member);
        return ResponseEntity.ok("Data added successfully.");
    }

    @DeleteMapping("/remove")
    public void removeFromSet(@RequestParam String key, @RequestParam String member) {
        redisService.removeMemberFromSet(key, member);
    }
}

