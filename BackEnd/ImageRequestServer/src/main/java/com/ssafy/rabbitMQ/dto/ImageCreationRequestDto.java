package com.ssafy.rabbitMQ.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageCreationRequestDto {
    Long sseId;
    String prompt;
}
