package com.ssafy.dreamgream.domain.post.controller;

import com.ssafy.dreamgream.domain.post.dto.request.CelebrateDto;
import com.ssafy.dreamgream.domain.post.service.CelebrateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts/celebrates")
public class CelebrateController {

    private final CelebrateService celebrateService;

    @PostMapping("/add")
    public ResponseEntity<String> addCelebrate(@RequestBody @Validated CelebrateDto celebrateDto) {
        celebrateService.addCelebrate(celebrateDto.getPostId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Celebrate added successfully for Post ID: " + celebrateDto.getPostId());
    }

    @PostMapping("/remove")
    public ResponseEntity<String> removeCelebrate(@RequestBody @Validated CelebrateDto celebrateDto) {
        celebrateService.removeCelebrate(celebrateDto.getPostId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Celebrate removed for Post ID: " + celebrateDto.getPostId());
    }
}
