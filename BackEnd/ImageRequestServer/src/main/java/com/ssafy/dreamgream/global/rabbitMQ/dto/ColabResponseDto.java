package com.ssafy.dreamgream.global.rabbitMQ.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ColabResponseDto {
    @JsonProperty("img")
    byte[] imageBytes;
}
