package com.ssafy.dreamgream.global.sse;

import com.ssafy.dreamgream.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/sse")
public class SSEController {

    private final SSEService sseService;
    private final MemberService memberService;

    @GetMapping()
    public SseEmitter handleSSE() {
        SseEmitter emitter = new SseEmitter(600_000L);
        log.info("emitter created");
        // jwt에서 userId 정보를 받아와야함
        Long memberId = memberService.getCurrentMemberId();

        sseService.addSseEmitter(memberId, emitter);


        return emitter;
    }
}
