package com.ssafy.dreamgream.domain.post.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LikeDto {
    @JsonProperty("postId")
    private String postId;

    @JsonProperty("userId")
    private String userId;

    public LikeDto() {
    }

    public LikeDto(String postId, String userId) {
        this.postId = postId;
        this.userId = userId;
    }

    // Getters and Setters
    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}

