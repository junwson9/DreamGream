package com.ssafy.dreamgream.global.config.rabbitMQ.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PromptCreationConsumeDto {
    @JsonProperty("image_prompt")
    String imagePrompt;
}
