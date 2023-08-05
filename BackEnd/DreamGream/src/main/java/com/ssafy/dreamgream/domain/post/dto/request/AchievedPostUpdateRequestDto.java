package com.ssafy.dreamgream.domain.post.dto.request;

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
    private String deadLine;
    private Boolean isDisplay;
    private Boolean isAchieved;
    private String achievementContent;
    private LocalDateTime achievedDate;
    private Boolean imgUpdateFlag;
}
