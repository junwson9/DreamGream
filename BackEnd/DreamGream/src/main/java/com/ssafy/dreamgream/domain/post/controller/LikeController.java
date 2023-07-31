package com.ssafy.dreamgream.domain.post.controller;

import com.ssafy.dreamgream.domain.post.dto.request.LikeDto;
import com.ssafy.dreamgream.domain.post.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired
    private LikeService likeService;
    @Qualifier("redisTemplate")
    @Autowired
    private RedisTemplate redisTemplate;

    @PostMapping("/add")
    public ResponseEntity<String> addLike(@RequestBody LikeDto likeDto) {
        likeService.addLike(likeDto.getPostId(), likeDto.getUserId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Like added successfully for Post ID: " + likeDto.getPostId() + " and User ID: " + likeDto.getUserId());
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeLike(@RequestBody LikeDto likeDto) {
        likeService.removeLike(likeDto.getPostId(), likeDto.getUserId());
        return ResponseEntity.ok("Like removed for Post ID: " + likeDto.getPostId() + " and User ID: " + likeDto.getUserId());
    }

    @GetMapping("/{postId}")
    public Set<String> getLikedUserIds(@PathVariable String postId) {
        return likeService.getLikedUserIds(postId);
    }




}
