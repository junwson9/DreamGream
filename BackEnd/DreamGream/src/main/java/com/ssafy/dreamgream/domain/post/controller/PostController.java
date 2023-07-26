package com.ssafy.dreamgream.domain.post.controller;

import com.ssafy.dreamgream.domain.post.dto.request.ImageGenerateRequestDto;
import com.ssafy.dreamgream.domain.post.dto.request.ImageGenerateResponseDto;
import com.ssafy.dreamgream.domain.post.service.PostService;
import com.ssafy.dreamgream.domain.post.service.SSEService;
import com.ssafy.dreamgream.global.config.rabbitMQ.ImageService;
import com.ssafy.dreamgream.global.config.rabbitMQ.dto.PromptCreationProduceDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/post")
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
    public SseEmitter handleSSE(@RequestBody ImageGenerateRequestDto dto) {
        // Create an SSE emitter for the client
        SseEmitter emitter = new SseEmitter();
        log.info("emitter created");
        // Store the emitter in a map with a unique identifier (e.g., user ID)
        Long userId = 123L;
        sseService.addSseEmitter(userId, emitter);

/*        // Set SSE emitter timeout and complete the connection when finished
        emitter.onTimeout(() -> removeEmitter(userId));
        emitter.onCompletion(() -> removeEmitter(userId));*/

        // image processing logic
        //imageService.processImageCreation(userId, dto);

        // emitter send test
        ImageGenerateResponseDto testDto = ImageGenerateResponseDto.builder().url("test.url").build();
        sseService.sendImageResponse(userId, testDto);


        return emitter;
    }


}
