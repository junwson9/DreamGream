package com.ssafy.dreamgream.domain.post.dto.request;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class PostRequestDto {
    String title;
    @JsonProperty("category_id")
    String categoryId;
    @JsonProperty("ai_img_url")
    String aiImg;
    String content;
    @JsonProperty("dead_line")
    boolean deadline;
    @JsonProperty("is_display")
    boolean isDisplay;
}
