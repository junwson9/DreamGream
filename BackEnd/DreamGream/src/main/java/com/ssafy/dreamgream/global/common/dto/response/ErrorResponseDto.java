package com.ssafy.dreamgream.global.common.dto.response;

import com.ssafy.dreamgream.global.common.exception.ErrorCode;
import lombok.Getter;

@Getter
public class ErrorResponseDto {

    private String success;
    private int status;
    private String errorCode;
    private String message;

    public ErrorResponseDto(ErrorCode errorCode){
        this.success = "FAIL";
        this.status = errorCode.getStatus();
        this.errorCode = errorCode.getErrorCode();
        this.message = errorCode.getMessage();
    }

}
