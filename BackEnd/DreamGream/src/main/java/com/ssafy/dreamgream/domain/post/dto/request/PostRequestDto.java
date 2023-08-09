package com.ssafy.dreamgream.domain.post.dto.request;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostRequestDto {

    @NotNull(message = "버킷리스트는은 필수 값입니다.")
    @Pattern(regexp = "^[가-힣a-zA-Z0-9,.!?]*$", message = "버킷리스트는 한글,영어,숫자만 가능합니다")
    String title;

    @JsonProperty("category_id")
    @Pattern(regexp = "[1-9]", message = "카테고리 id는 1~9 숫자만 가능합니다.")
    Long categoryId;

    @JsonProperty("ai_img")
    @NotNull(message = "AI 이미지 URL은 필수 값입니다.")
    @Pattern(regexp = ".*\\.png$", message = "이미지 url은 .png로 끝나야 합니다.")
    String aiImg;

    @NotNull(message = "상세내용은 필수 값입니다.")
    @Size(max = 500, message = "상세내용은 최대 500자까지 입력 가능합니다.")
    String content;

    @JsonProperty("dead_line")
    @NotNull(message = "기한은 필수 값입니다.")
    String deadline;

    @JsonProperty("is_display")
    @NotNull(message = "공개범위는 필수 값입니다.")
    boolean isDisplay;
}
