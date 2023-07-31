package com.ssafy.dreamgream.domain.post.controller;

import com.ssafy.dreamgream.domain.post.dto.request.LikeDto;
import com.ssafy.dreamgream.domain.post.service.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ssafy.dreamgream.global.common.dto.response.ResponseDto;

import java.util.Set;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired
    private RedisService redisService;
    @Qualifier("redisTemplate")
    @Autowired
    private RedisTemplate redisTemplate;

    @PostMapping("/add")
    public ResponseEntity<String> addLike(@RequestBody LikeDto likeDto) {
        redisService.addLike(likeDto.getPostId(), likeDto.getUserId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Like added successfully for Post ID: " + likeDto.getPostId() + " and User ID: " + likeDto.getUserId());
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeLike(@RequestBody LikeDto likeDto) {
        redisService.removeLike(likeDto.getPostId(), likeDto.getUserId());
        return ResponseEntity.ok("Like removed for Post ID: " + likeDto.getPostId() + " and User ID: " + likeDto.getUserId());
    }

    @GetMapping("/{postId}")
    public Set<String> getLikedUserIds(@PathVariable String postId) {
        return redisService.getLikedUserIds(postId);
    }




}
