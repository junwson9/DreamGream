package com.ssafy.dreamgream.global.common.dto.response;

import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import lombok.Getter;
import lombok.ToString;

import java.util.List;
import java.util.Map;

@Getter
@ToString
public class ResponseDto {

    private String success;
    private String message;
    private Map<String, ?> data;

    public ResponseDto() {
    }

    public ResponseDto(String success, String message, Map<String, ?> data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public ResponseDto(String success, String message) {
        this.success = success;
        this.message = message;
    }

}
