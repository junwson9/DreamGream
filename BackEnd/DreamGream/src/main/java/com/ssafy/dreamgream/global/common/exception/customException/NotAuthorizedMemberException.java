package com.ssafy.dreamgream.global.common.exception.customException;

import com.ssafy.dreamgream.global.common.exception.ErrorCode;
import lombok.Getter;

@Getter
public class NotAuthorizedMemberException extends RuntimeException {

    private ErrorCode errorCode;

    public NotAuthorizedMemberException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }

}
