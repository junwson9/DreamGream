package com.ssafy.dreamgream.global.rabbitMQ;

import com.ssafy.rabbitMQ.dto.ImageCreationRequestDto;
import com.ssafy.rabbitMQ.dto.ImageCreationResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageCreationResponseConsumer {

    private final ImageService imageService;

    @RabbitListener(queues = "image-creation-response-queue")
    public void receiveImageCreationResponse(ImageCreationResponseDto responseDto) {
        // Process the image creation response
        Long sseId = responseDto.getSseId();
        String url = responseDto.getUrl();
        log.info("consumer received");
        log.info("url : {}", url);

    }

/*    @RabbitListener(queues = "image-creation-request-queue")
    public void receiveImageCreationRequest(@Payload ImageCreationRequestDto requestDto) {
        log.info("SSE_ID : {}", requestDto.getSseId());
        log.info("prompt : {}", requestDto.getPrompt());

        // colab 서버로 이미지 생성 요청 보냄
    }*/
}