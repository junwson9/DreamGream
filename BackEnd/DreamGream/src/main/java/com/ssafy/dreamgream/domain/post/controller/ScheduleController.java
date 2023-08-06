package com.ssafy.dreamgream.domain.post.controller;

import com.ssafy.dreamgream.domain.post.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/posts")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @PostMapping("/startscheduler")
    public ResponseEntity<String> startScheduler() {
        scheduleService.scheduleCheer();
        scheduleService.scheduleCongrat();
        return new ResponseEntity<>("Scheduler started.", HttpStatus.OK);
    }
}
