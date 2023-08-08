package com.ssafy.dreamgream.domain.post.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Enumerated;
import javax.validation.constraints.*;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AchievedPostUpdateRequestDto {
    @NotNull(message = "상세내용은 필수 값입니다.")
    @Size(max = 500, message = "상세내용은 최대 500자까지 입력 가능합니다.")
    private String content;

    @NotNull(message = "목표시기는 필수 값입니다.")
    @JsonProperty("dead_line")
    private String deadLine;

    @NotNull(message = "공개여부는 필수 값입니다.")
    @JsonProperty("is_display")
    private Boolean isDisplay;

    @NotNull(message = "달성 상태는 필수 값입니다.")
//    @AssertTrue(message = "반드시 달성 상태여야 합니다.")
    @JsonProperty("is_achieved")
    private Boolean isAchieved;

    @NotNull(message = "달성소감은 필수 값입니다.")
    @Size(max = 500, message = "달성소감은 최대 500자까지 입력 가능합니다.")
    @JsonProperty("achievement_content")
    private String achievementContent;

    @NotNull(message = "달성시기는 필수 값입니다.")
    @PastOrPresent(message = "달성시기는 미래 시점이어야 합니다.") // 미래 시점이라는 조건이 없어야함! 고객이 버킷리스트를 달성한 다음에 달성완료 처리를 하는 거니까
    @JsonProperty("achieved_date")
    private LocalDateTime achievedDate;

    @NotNull(message = "이미지 업데이트 여부는 필수 값입니다.")
    @JsonProperty("img_update_flag")
    private Boolean imgUpdateFlag;

    @NotNull(message = "카테고리는 필수 값입니다.")
    @Min(value = 1, message = "카테고리 ID는 최소 1 이상이어야 합니다.")
    @Max(value = 9, message = "카테고리 ID는 최대 9 이하여야 합니다.")
    @JsonProperty("category_id")
    private Long categoryId;
}
