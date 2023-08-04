package com.ssafy.dreamgream.domain.post.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UnAchievedPostUpdateResponseDto {
    private String title;
    private String content;
    private String deadLine;
    private Boolean isDisplay;

    public void setContent(String content){
        this.content = content;
    }
    public void setTitle(String title){
        this.title = title;
    }
    public void setDeadLine(String deadLine){
        this.deadLine = deadLine;
    }
    public void setIsDisplay(Boolean isDisplay){
        this.isDisplay = isDisplay;
    }

}
