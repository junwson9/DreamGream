package com.ssafy.dreamgream.domain.post.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.sql.Blob;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
public class PostUpdateRequestDto {
    private Long postId;
    private String title;
    private String content;
    private String deadline;
    private Boolean isDisplay;
    private Boolean isAchieved;
    private String achievementContent;
    private String achievedDate;
    private Long cheerCnt;
    private String aiImg;
    private Blob achievementImg;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    public LocalDateTime getAchievedDate() {
        return LocalDateTime.parse(achievedDate, DateTimeFormatter.ISO_DATE_TIME);
    }

    public void setAchievedDate(LocalDateTime achievedDate) {
        this.achievedDate = achievedDate.format(DateTimeFormatter.ISO_DATE_TIME);
    }
}