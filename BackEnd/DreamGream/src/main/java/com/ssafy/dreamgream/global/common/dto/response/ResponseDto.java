package com.ssafy.dreamgream.global.common.dto.response;

import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import lombok.Getter;
import lombok.ToString;

import java.util.List;
import java.util.Map;

@Getter
@ToString
public class ResponseDto {

    private String status;
    private String message;
    private String errorCode;
    private Map<String, ?> data;

    public ResponseDto() {
    }

    public ResponseDto(String status, String message, String errorCode, Map<String, Object> data) {
        this.status = status;
        this.message = message;
        this.errorCode = errorCode;
        this.data = data;
    }

    public ResponseDto(String status, String message, Map<String, ?> data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public ResponseDto(String status, String message) {
        this.status = status;
        this.message = message;
    }

}
