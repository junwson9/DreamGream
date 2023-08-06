package com.ssafy.dreamgream.domain.post.controller;

import com.ssafy.dreamgream.domain.post.dto.request.CheerDto;
import com.ssafy.dreamgream.domain.post.service.CheerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts/cheering")
public class CheerController {

    @Autowired
    private CheerService cheerService;

    @PostMapping("/add")
    public ResponseEntity<String> addCheer(@RequestBody CheerDto cheerDto) {
        cheerService.addCheer(cheerDto.getPostId(), cheerDto.getMemberId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Cheer added successfully for Post ID: " + cheerDto.getPostId() + " and Member ID: " + cheerDto.getMemberId());
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeCheer(@RequestBody CheerDto cheerDto) {
        cheerService.removeCheer(cheerDto.getPostId(), cheerDto.getMemberId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Cheer removed for Post ID: " + cheerDto.getPostId() + " and Member ID: " + cheerDto.getMemberId());
    }
}