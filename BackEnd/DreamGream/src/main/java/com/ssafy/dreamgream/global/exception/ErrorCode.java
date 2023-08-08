package com.ssafy.dreamgream.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    NOT_FOUND(404,"CM01-ERR-404","PAGE NOT FOUND"),
    INTERNAL_SERVER_ERROR(500,"CMO2-ERR-500","INTERNAL SERVER ERROR"),
    BAD_REQUEST(400, "CM03-ERR-400", "BAD REQUEST"),
    INVALID_INPUT_VALUE(403,"CMO4-ERR-403","INVALID INPUT VALUE"),
    NOT_AUTHORIZED_MEMBER(401,"AU01-ERR-400","EMAIL DUPLICATED"),
    INVALID_TOKEN(401, "AU02-ERR-401", ""),
    EXPIRED_TOKEN(401, "AU03-ERR-401", ""),
    OAUTH2_FAILED(401, "AU04-ERR-401", ""),
    MEMBER_NOT_FOUND(403, "ME01-ERR-403", ""),
    POST_NOT_FOUND(403, "PO01-ERR-403", ""),
    NOT_AUTHORIZED_TO_POST(401, "PO02-ERR-401", "")
    ;
    

    private int status;
    private String errorCode;
    private String message;

}
