package com.ssafy.dreamgream.global.exception.customException;

import com.ssafy.dreamgream.global.exception.ErrorCode;
import lombok.Getter;

@Getter
public class ExpiredTokenException extends RuntimeException {

    private ErrorCode errorCode;

    public ExpiredTokenException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }

}
