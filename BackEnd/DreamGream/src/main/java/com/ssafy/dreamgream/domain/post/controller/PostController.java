package com.ssafy.dreamgream.domain.post.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/post")
public class PostController {

    @GetMapping("/test")
    public String Test() {
        log.info("test request!");
        return "test request";
    }
}
