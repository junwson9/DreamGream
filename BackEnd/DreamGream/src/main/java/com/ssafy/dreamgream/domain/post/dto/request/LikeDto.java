package com.ssafy.dreamgream.domain.post.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LikeDto {
    private String key;
    private String member;

    public LikeDto(){}

    public LikeDto(String key, String member){
        this.key = key;
        this.member = member;
    }

}

