package com.ssafy.dreamgream.global.rabbitMQ;

import com.ssafy.rabbitMQ.dto.ImageCreationRequestDto;
import com.ssafy.rabbitMQ.dto.ImageCreationResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageCreationRequestProducer {

    private final RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.exchange.name}")
    private String imageCreationRequestExchange;

    @Value("${rabbitmq.queue.response.routing-key}")
    private String imageCreationRequestRoutingKey;

    public void sendImageCreationRequest(Long sseId, String url) {
        log.info("이미지 생성 완료");
        // 사진을 만들고 응답을 받으면 S3에 저장하고 url을 전송
        // 1. 사진 요청 보내기

        // 2. 이미지 변환 및 S3 저장

        //
        ImageCreationResponseDto dto = ImageCreationResponseDto.builder()
                .sseId(sseId)
                .url(url)
                .build();
        rabbitTemplate.convertAndSend(imageCreationRequestExchange, imageCreationRequestRoutingKey, dto);
        log.info("이미지 url 전송 완료");
    }
}
