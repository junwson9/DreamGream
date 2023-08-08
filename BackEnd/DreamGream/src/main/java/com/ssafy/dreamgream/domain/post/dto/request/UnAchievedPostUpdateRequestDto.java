package com.ssafy.dreamgream.domain.post.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UnAchievedPostUpdateRequestDto {

    @NotNull(message = "상세내용은 필수 값입니다.")
    @Size(max = 500, message = "상세내용은 최대 500자까지 입력 가능합니다.")
    private String content;

    @NotNull(message = "목표시기는 필수 값입니다.")
    @JsonProperty("dead_line")
    private String deadLine;

    @NotNull(message = "공개여부는 필수 값입니다.")
    @JsonProperty("is_display")
    private Boolean isDisplay;

    @NotNull(message = "카테고리는 필수 값입니다.")
    @Min(value = 1, message = "카테고리 ID는 최소 1 이상이어야 합니다.")
    @Max(value = 9, message = "카테고리 ID는 최대 9 이하여야 합니다.")
    @JsonProperty("category_id")
    private String categoryId;
}
