package com.ssafy.dreamgream.domain.post.controller;

import com.ssafy.dreamgream.domain.post.dto.request.ImageGenerateRequestDto;
import com.ssafy.dreamgream.domain.post.dto.request.ImageGenerateResponseDto;
import com.ssafy.dreamgream.domain.post.dto.request.PostUpdateRequestDto;
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
@RequestMapping("/api/posts")
@AllArgsConstructor
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

        ImageGenerateResponseDto testDto = ImageGenerateResponseDto.builder()
                .url("test.com")
                .build();
        log.info("sleep start");
        Thread.sleep(5000);
        log.info("sleep end");

        sseService.sendImageResponse(userId, testDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{postId}")
    public ResponseEntity<PostUpdateRequestDto> updatePostPartially(@PathVariable Long postId, @RequestBody PostUpdateRequestDto requestDto) {
        log.info(String.valueOf(postId));
        PostUpdateRequestDto updatedPost = postService.updatePostPartially(postId, requestDto);
        if (updatedPost == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(updatedPost);
    }

}
