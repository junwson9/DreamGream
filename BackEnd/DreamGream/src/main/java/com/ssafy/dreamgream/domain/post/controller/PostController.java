package com.ssafy.dreamgream.domain.post.controller;

import com.ssafy.dreamgream.domain.post.dto.request.ImageGenerateRequestDto;
import com.ssafy.dreamgream.domain.post.service.PostService;
import com.ssafy.dreamgream.global.rabbitMQ.ImageService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;
    private final ImageService imageService;

    @GetMapping("/test")
    public String Test() {
        log.info("test request!");
        return "test request";
    }

    @PostMapping("/image")
    public ResponseEntity<String> generateImage(@RequestBody ImageGenerateRequestDto dto) {
        Long userId = 123L;

        // 이미지 생성 프로세스 시작
        imageService.processImageCreation(userId, dto);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
