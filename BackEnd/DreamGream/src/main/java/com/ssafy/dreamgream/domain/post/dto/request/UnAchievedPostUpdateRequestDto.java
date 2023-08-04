package com.ssafy.dreamgream.domain.post.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UnAchievedPostUpdateRequestDto {
    private String content;
    private String deadline;
    private Boolean isdisplay;
}
