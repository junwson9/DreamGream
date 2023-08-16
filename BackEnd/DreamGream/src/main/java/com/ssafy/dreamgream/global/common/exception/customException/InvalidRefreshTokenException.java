package com.ssafy.dreamgream.global.common.exception.customException;

import com.ssafy.dreamgream.global.common.exception.ErrorCode;
import lombok.Getter;

@Getter
public class InvalidRefreshTokenException extends RuntimeException {

    private ErrorCode errorCode;

    public InvalidRefreshTokenException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }

}
