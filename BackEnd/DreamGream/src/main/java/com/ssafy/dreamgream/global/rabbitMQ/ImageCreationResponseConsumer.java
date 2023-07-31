package com.ssafy.dreamgream.global.rabbitMQ;

import com.ssafy.dreamgream.global.rabbitMQ.dto.ImageCreationConsumeDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageCreationResponseConsumer {

    private final ImageService imageService;

    @RabbitListener(queues = "image-creation-response-queue")
    public void receiveImageCreationResponse(ImageCreationConsumeDto responseDto) {
        // Process the image creation response
        Long sseId = responseDto.getSseId();
        String url = responseDto.getUrl();

        log.info("url : {}", url);

    }
}
