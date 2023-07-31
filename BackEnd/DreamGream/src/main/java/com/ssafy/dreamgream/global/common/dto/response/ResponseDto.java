package com.ssafy.dreamgream.global.common.dto.response;

import lombok.Getter;
import lombok.ToString;

import java.util.Map;

@Getter
@ToString
public class ResponseDto {

    private String status;
    private String message;
    private String errorCode;
    private Map<String, Object> data;

    public ResponseDto() {
    }

    public ResponseDto(String status, String message, String errorCode, Map<String, Object> data) {
        this.status = status;
        this.message = message;
        this.errorCode = errorCode;
        this.data = data;
    }

    public ResponseDto(String status, String message, Map<String, Object> data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public ResponseDto(String status, String message) {
        this.status = status;
        this.message = message;
    }
}
