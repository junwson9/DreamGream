package com.ssafy.dreamgream.global.rabbitMQ;

import com.ssafy.rabbitMQ.dto.ImageCreationResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageCreationResponseConsumer {

    private final ImageService imageService;

    @RabbitListener(queues = "${rabbitmq.queue.response.name}")
    public void receiveImageCreationResponse(ImageCreationResponseDto responseDto) {
        // Process the image creation response
        Long sseId = responseDto.getSseId();
        String url = responseDto.getUrl();
        log.info("consumer received");
        log.info("sse id : {}", sseId);
        log.info("url : {}", url);

        imageService.processImageResponse(sseId, url);

    }
}
