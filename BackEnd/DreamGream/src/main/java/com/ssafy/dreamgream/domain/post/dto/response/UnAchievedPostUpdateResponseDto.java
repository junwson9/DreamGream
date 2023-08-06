package com.ssafy.dreamgream.domain.post.dto.response;

import lombok.*;

@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UnAchievedPostUpdateResponseDto {
    private String title;
    private String content;
    private String deadLine;
    private Boolean isDisplay;
}
