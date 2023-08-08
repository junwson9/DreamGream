package com.ssafy.dreamgream.global.exception;

import lombok.Getter;

@Getter
public class ErrorResponse {

    private String success;
    private int status;
    private String errorCode;
    private String message;

    public ErrorResponse(ErrorCode errorCode){
        this.success = "FAIL";
        this.status = errorCode.getStatus();
        this.errorCode = errorCode.getErrorCode();
        this.message = errorCode.getMessage();
    }

}
