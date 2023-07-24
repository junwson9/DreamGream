package com.ssafy.dreamgream.domain.post.dto.request;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class PostRequestDto {
    String title;
    String content;
    String deadline;
    @JsonProperty("is_display")
    String isDisplay;
    // 카테고리
}
