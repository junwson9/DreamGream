package com.ssafy.dreamgream.global.config.rabbitMQ.dto;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageCreationProduceDto {
    Long sseID;
    String prompt;
}
