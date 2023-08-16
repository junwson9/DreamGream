package com.ssafy.dreamgream.global.rabbitMQ.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PromptCreationProduceDto {
    String title;
    String gender;
    String birthyear;
    @JsonProperty("category_name")
    String categoryName;
}
