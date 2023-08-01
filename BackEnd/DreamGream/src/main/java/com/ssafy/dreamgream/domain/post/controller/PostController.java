package com.ssafy.dreamgream.domain.post.controller;

import com.ssafy.dreamgream.domain.post.dto.request.ImageGenerateRequestDto;
import com.ssafy.dreamgream.domain.post.dto.request.ImageGenerateResponseDto;
import com.ssafy.dreamgream.domain.post.service.PostService;
import com.ssafy.dreamgream.global.rabbitMQ.ImageService;
import com.ssafy.dreamgream.global.sse.SSEService;
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
    private final SSEService sseService;

    @GetMapping("/test")
    public String Test() {
        log.info("test request!");
        return "test request";
    }

    @PostMapping("/image")
    public ResponseEntity<String> generateImage(@RequestBody ImageGenerateRequestDto dto) throws InterruptedException {
        Long userId = 123L;

        log.info("title : {}", dto.getTitle());
        log.info("category : {}", dto.getCategoryName());

        // 이미지 생성 프로세스 시작
        //imageService.processImageCreation(userId, dto);
        imageService.sendTest();

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
