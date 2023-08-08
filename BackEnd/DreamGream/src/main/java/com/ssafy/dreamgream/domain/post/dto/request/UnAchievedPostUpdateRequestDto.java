package com.ssafy.dreamgream.domain.post.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UnAchievedPostUpdateRequestDto {
    private String content;
    @JsonProperty("dead_line")
    private String deadLine;
    @JsonProperty("is_display")
    private Boolean isDisplay;
}
