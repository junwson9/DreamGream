package com.ssafy.dreamgream.global.exception.customException;

import com.ssafy.dreamgream.global.exception.ErrorCode;
import lombok.Getter;

@Getter
public class InvalidInputValueException extends RuntimeException {

    private ErrorCode errorCode;

    public InvalidInputValueException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }

}
