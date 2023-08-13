package com.ssafy.dreamgream.global.rabbitMQ;

import com.ssafy.rabbitMQ.dto.ImageCreationRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageCreationResponseConsumer {

    private final ImageService imageService;

    // 이미지 생성 요청 listener
    @RabbitListener(queues = "${rabbitmq.queue.request.name}")
    public void receiveImageCreationRequest(@Payload ImageCreationRequestDto requestDto) {
        log.info("SSE_ID : {}", requestDto.getSseId());
        log.info("prompt : {}", requestDto.getPrompt());

        imageService.creatImage(requestDto.getSseId(), requestDto.getPrompt());
    }
}
