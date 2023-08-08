package com.ssafy.dreamgream.global.exception.customException;

import com.ssafy.dreamgream.global.exception.ErrorCode;
import lombok.Getter;

@Getter
public class OAuth2FailedException extends RuntimeException {

    private ErrorCode errorCode;

    public OAuth2FailedException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }

}
