package com.ssafy.dreamgream.global.config.rabbitMQ.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageCreationConsumeDto {
    Long sseId;
    String base64EncodedImage;
}
