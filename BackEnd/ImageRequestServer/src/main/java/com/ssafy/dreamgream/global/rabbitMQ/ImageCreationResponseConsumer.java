package com.ssafy.dreamgream.global.rabbitMQ;

import com.ssafy.dreamgream.global.rabbitMQ.dto.ColabResponseDto;
import com.ssafy.dreamgream.global.s3.S3Uploader;
import com.ssafy.rabbitMQ.dto.ImageCreationRequestDto;
import com.ssafy.rabbitMQ.dto.ImageCreationResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageCreationResponseConsumer {

    private final ImageService imageService;

    // 이미지 생성 요청 listener
    @RabbitListener(queues = "image-creation-request-queue")
    public void receiveImageCreationRequest(@Payload ImageCreationRequestDto requestDto) {
        log.info("SSE_ID : {}", requestDto.getSseId());
        log.info("prompt : {}", requestDto.getPrompt());

        imageService.creatImage(requestDto.getSseId(), requestDto.getPrompt());
    }
}
