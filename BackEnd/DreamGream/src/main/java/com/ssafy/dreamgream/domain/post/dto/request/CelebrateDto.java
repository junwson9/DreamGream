package com.ssafy.dreamgream.domain.post.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class CelebrateDto {
    @JsonProperty("post_id")
    private String postId;

    @JsonProperty("member_id")
    private String memberId;

}

