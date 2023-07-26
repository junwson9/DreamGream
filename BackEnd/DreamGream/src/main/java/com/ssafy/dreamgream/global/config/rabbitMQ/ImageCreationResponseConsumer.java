package com.ssafy.dreamgream.global.config.rabbitMQ;

import com.ssafy.dreamgream.global.config.rabbitMQ.dto.ImageCreationConsumeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ImageCreationResponseConsumer {

    private final ImageService imageService;

    @RabbitListener(queues = "image-creation-response-queue")
    public void receiveImageCreationResponse(ImageCreationConsumeDto responseDto) {
        // Process the image creation response
        Long sseId = responseDto.getSseId();
        String base64EncodedPhoto = responseDto.getBase64EncodedImage();

        // Your logic to handle the SSE ID and the base64 encoded photo
        imageService.processImageResponse(sseId, base64EncodedPhoto);
    }
}
