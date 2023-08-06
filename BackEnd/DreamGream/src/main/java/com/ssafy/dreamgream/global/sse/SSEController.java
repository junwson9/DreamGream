package com.ssafy.dreamgream.global.sse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/sse")
public class SSEController {

    private final SSEService sseService;

    @GetMapping()
    public SseEmitter handleSSE() {
        SseEmitter emitter = new SseEmitter(600_000L);
        log.info("emitter created");
        // jwt에서 userId 정보를 받아와야함
        Long userId = 1L;
        sseService.addSseEmitter(userId, emitter);


        return emitter;
    }
}
