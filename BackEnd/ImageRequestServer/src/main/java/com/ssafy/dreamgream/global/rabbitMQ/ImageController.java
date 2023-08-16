package com.ssafy.dreamgream.global.rabbitMQ;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ImageController {

    @GetMapping("/test")
    public ResponseEntity<?> test() {
      log.info("테스트 시작");

      log.info("테스트 종료");

      return new ResponseEntity<>(HttpStatus.OK);
    }
}
