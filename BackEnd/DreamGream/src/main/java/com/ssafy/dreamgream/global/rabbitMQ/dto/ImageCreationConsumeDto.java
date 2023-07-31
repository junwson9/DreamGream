package com.ssafy.dreamgream.global.rabbitMQ.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageCreationConsumeDto {
    Long sseId;
    String url;
}
