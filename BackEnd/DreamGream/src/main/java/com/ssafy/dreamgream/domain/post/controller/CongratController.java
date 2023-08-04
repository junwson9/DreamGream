package com.ssafy.dreamgream.domain.post.controller;

import com.ssafy.dreamgream.domain.post.dto.request.CongratDto;
import com.ssafy.dreamgream.domain.post.service.CongratService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts/congrats")
public class CongratController {

    @Autowired
    private CongratService congratService;

    @PostMapping("/add")
    public ResponseEntity<String> addCongrat(@RequestBody CongratDto congratDto) {
        congratService.addCongrat(congratDto.getPostId(), congratDto.getMemberId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Congrat added successfully for Post ID: " + congratDto.getPostId() + " and User ID: " + congratDto.getMemberId());
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeCongrat(@RequestBody CongratDto congratDto) {
        congratService.removeCongrat(congratDto.getPostId(), congratDto.getMemberId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Congrat removed for Post ID: " + congratDto.getPostId() + " and User ID: " + congratDto.getMemberId());
    }
}
