package com.ssafy.dreamgream.global.rabbitMQ;

import com.ssafy.dreamgream.global.rabbitMQ.dto.ImageCreationProduceDto;
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

    @Value("${rabbitmq.queue.request.routing-key}")
    private String imageCreationRequestRoutingKey;

    public void sendImageCreationRequest(Long sseId, String prompt) {
        log.info("message producer started");
        ImageCreationProduceDto dto = ImageCreationProduceDto.builder()
                .sseID(sseId)
                .prompt(prompt)
                .build();
        rabbitTemplate.convertAndSend(imageCreationRequestExchange, imageCreationRequestRoutingKey, dto);
        log.info("message sent!");
    }
}
