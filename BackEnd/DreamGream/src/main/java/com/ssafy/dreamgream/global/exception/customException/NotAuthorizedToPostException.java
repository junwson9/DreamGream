package com.ssafy.dreamgream.global.exception.customException;

import com.ssafy.dreamgream.global.exception.ErrorCode;
import lombok.Getter;

@Getter
public class NotAuthorizedToPostException extends RuntimeException {

    private ErrorCode errorCode;

    public NotAuthorizedToPostException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }

}
