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
    private String deadline;
    private Boolean isdisplay;
}
