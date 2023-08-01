package com.ssafy.dreamgream.domain.post.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
public class PostUpdateRequestDto {
    private Long postId;
    private String title;
    private String content;
    private String deadline;
    private String isDisplay;
    private String isAchieved;
    private String achievementContent;
    private String achievedDate;
    private Long cheerCnt;
    private byte[] aiImg;
    private byte[] achievementImg;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    public LocalDateTime getAchievedDate() {
        return LocalDateTime.parse(achievedDate, DateTimeFormatter.ISO_DATE_TIME);
    }

    public void setAchievedDate(LocalDateTime achievedDate) {
        this.achievedDate = achievedDate.format(DateTimeFormatter.ISO_DATE_TIME);
    }
}
