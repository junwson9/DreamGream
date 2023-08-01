package com.ssafy.rabbitMQ.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageCreationResponseDto {
    Long sseId;
    String url;
}
