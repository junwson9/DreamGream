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
        ImageCreationResponseDto dto = ImageCreationResponseDto.builder()
                .sseId(sseId)
                .url(url)
                .build();
        rabbitTemplate.convertAndSend(imageCreationRequestExchange, imageCreationRequestRoutingKey, dto);
        log.info("이미지 url 전송 완료");
    }
}
