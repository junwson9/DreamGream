package com.ssafy.dreamgream.domain.post.controller;

import com.ssafy.dreamgream.domain.post.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping("/startscheduler")
    public ResponseEntity<String> startScheduler() {
        scheduleService.scheduleCheer();
        scheduleService.scheduleCelebrate();
        return new ResponseEntity<>("Scheduler started.", HttpStatus.OK);
    }
}
