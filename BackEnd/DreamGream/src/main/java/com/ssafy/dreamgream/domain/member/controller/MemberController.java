package com.ssafy.dreamgream.domain.member.controller;

import com.ssafy.dreamgream.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<?> join() {
        log.info("회원가입 요청");
        Long memberId = memberService.join();
        return ResponseEntity.ok(memberId);
    }

    @GetMapping
    public ResponseEntity<?> test() {
        return ResponseEntity.ok("test");
    }

    @GetMapping("/test2")
    public ResponseEntity<?> test2() {
        return ResponseEntity.ok("test");
    }

}
