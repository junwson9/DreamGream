package com.ssafy.dreamgream.global.rabbitMQ.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PromptCreationConsumeDto {
    @JsonProperty("image_prompt")
    String imagePrompt;
}
