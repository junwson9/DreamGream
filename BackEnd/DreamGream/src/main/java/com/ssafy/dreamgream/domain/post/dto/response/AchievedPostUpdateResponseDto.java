package com.ssafy.dreamgream.domain.post.dto.response;

import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.post.entity.Category;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AchievedPostUpdateResponseDto {
    private String title;
    private String content;
    private String deadLine;
    private Boolean isDisplay;
    private Boolean isAchieved;
    private String achievementContent;
    private LocalDateTime achievedDate;
    private Long cheerCnt;
    private Long celebrateCnt;
    private String aiImg;
    private String achievementImg;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
}
