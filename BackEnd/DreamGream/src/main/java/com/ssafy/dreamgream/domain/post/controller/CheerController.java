package com.ssafy.dreamgream.domain.post.controller;

import com.ssafy.dreamgream.domain.post.dto.request.CheerDto;
import com.ssafy.dreamgream.domain.post.service.CheerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts/cheers")
public class CheerController {

    private final CheerService cheerService;

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