package com.ssafy.dreamgream.domain.post.dto.request;

import lombok.*;

import java.sql.Blob;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostUpdateRequestDto {
    private Long postid;
    private String title;
    private String content;
    private String deadline;
    private Boolean isdisplay;
    private Boolean isachieved;
    private String achievementcontent;
    private String achieveddate;
    private Long cheercnt;
    private String aiimg;
    private String achievementimg;
    private LocalDateTime createddate;
    private LocalDateTime modifieddate;
    public LocalDateTime getAchievedDate() {
        return LocalDateTime.parse(achieveddate, DateTimeFormatter.ISO_DATE_TIME);
    }
}