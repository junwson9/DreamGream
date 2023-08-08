package com.ssafy.dreamgream.domain.post.controller;

import com.ssafy.dreamgream.domain.post.dto.request.CelebrateDto;
import com.ssafy.dreamgream.domain.post.service.CelebrateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts/celebrates")
public class CelebrateController {

    @Autowired
    private CelebrateService celebrateService;

    @PostMapping("/add")
    public ResponseEntity<String> addCelebrate(@RequestBody CelebrateDto celebrateDto) {
        celebrateService.addCelebrate(celebrateDto.getPostId(), celebrateDto.getMemberId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Celebrate added successfully for Post ID: " + celebrateDto.getPostId() + " and User ID: " + celebrateDto.getMemberId());
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeCelebrate(@RequestBody CelebrateDto celebrateDto) {
        celebrateService.removeCelebrate(celebrateDto.getPostId(), celebrateDto.getMemberId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Celebrate removed for Post ID: " + celebrateDto.getPostId() + " and User ID: " + celebrateDto.getMemberId());
    }
}
