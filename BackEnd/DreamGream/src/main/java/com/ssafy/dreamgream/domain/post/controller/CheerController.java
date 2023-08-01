package com.ssafy.dreamgream.domain.post.controller;

import com.ssafy.dreamgream.domain.post.dto.request.CheerDto;
import com.ssafy.dreamgream.domain.post.dto.request.LikeDto;
import com.ssafy.dreamgream.domain.post.service.CheerService;
import com.ssafy.dreamgream.domain.post.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/cheers")
public class CheerController {

    @Autowired
    private CheerService cheerService;
    @Qualifier("redisTemplate")
    @Autowired
    private RedisTemplate redisTemplate;

    @PostMapping("/add")
    public ResponseEntity<String> addLike(@RequestBody CheerDto cheerDto) {
        cheerService.addLike(cheerDto.getPostId(), cheerDto.getUserId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Like added successfully for Post ID: " + cheerDto.getPostId() + " and User ID: " + cheerDto.getUserId());
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeLike(@RequestBody CheerDto cheerDto) {
        cheerService.removeLike(cheerDto.getPostId(), cheerDto.getUserId());
        return ResponseEntity.ok("Like removed for Post ID: " + cheerDto.getPostId() + " and User ID: " + cheerDto.getUserId());
    }

    @GetMapping("/{postId}")
    public Set<String> getLikedUserIds(@PathVariable String postId) {
        return cheerService.getLikedUserIds(postId);
    }

}
