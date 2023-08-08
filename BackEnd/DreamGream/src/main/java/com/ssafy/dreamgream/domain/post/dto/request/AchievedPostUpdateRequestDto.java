package com.ssafy.dreamgream.domain.post.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AchievedPostUpdateRequestDto {
    private String content;

    @JsonProperty("dead_line")
    private String deadLine;

    @JsonProperty("is_display")
    private Boolean isDisplay;

    @JsonProperty("is_achieved")
    private Boolean isAchieved;

    @JsonProperty("achievement_content")
    private String achievementContent;

    @JsonProperty("achieved_date")
    private LocalDateTime achievedDate;

    @JsonProperty("img_update_flag")
    private Boolean imgUpdateFlag;
}
