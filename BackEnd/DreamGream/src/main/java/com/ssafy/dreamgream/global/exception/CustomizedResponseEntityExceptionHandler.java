package com.ssafy.dreamgream.global.exception;

import com.amazonaws.services.kms.model.NotFoundException;
import com.ssafy.dreamgream.global.exception.customException.BadRequestException;
import com.ssafy.dreamgream.global.exception.customException.ExpiredTokenException;
import com.ssafy.dreamgream.global.exception.customException.InvalidInputValueException;
import com.ssafy.dreamgream.global.exception.customException.InvalidRefreshTokenException;
import com.ssafy.dreamgream.global.exception.customException.InvalidTokenException;
import com.ssafy.dreamgream.global.exception.customException.MemberNotFoundException;
import com.ssafy.dreamgream.global.exception.customException.NotAuthorizedMemberException;
import com.ssafy.dreamgream.global.exception.customException.NotAuthorizedToPostException;
import com.ssafy.dreamgream.global.exception.customException.OAuth2FailedException;
import com.ssafy.dreamgream.global.exception.customException.PostNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@RestControllerAdvice
public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    // 모든 예외 처리
    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ErrorResponse> handleException(Exception ex) {
        log.error("handleException", ex);
        ErrorResponse errorResponse = new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @ExceptionHandler(NotFoundException.class)
    public final ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException ex) {
        log.error("handleNotFoundException", ex);
        ErrorResponse errorResponse = new ErrorResponse(ErrorCode.NOT_FOUND);
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(BadRequestException.class)
    public final ResponseEntity<ErrorResponse> handleBadRequestException(BadRequestException ex) {
        log.error("handleBadRequestException", ex);
        ErrorResponse errorResponse = new ErrorResponse(ErrorCode.BAD_REQUEST);
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(InvalidInputValueException.class)
    public final ResponseEntity<ErrorResponse> handleInvalidInputValueException(InvalidInputValueException ex) {
        log.error("handleInvalidInputValueException", ex);
        ErrorResponse errorResponse = new ErrorResponse(ErrorCode.INVALID_INPUT_VALUE);
        return new ResponseEntity<>(errorResponse, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }


    @ExceptionHandler(NotAuthorizedMemberException.class)
    public ResponseEntity<ErrorResponse> handleNotAuthorizedMemberException(NotAuthorizedMemberException ex){
        log.error("handleNotAuthorizedMemberException", ex);
        ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }


    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<ErrorResponse> handleInvalidTokenException(InvalidTokenException ex){
        log.error("handleInvalidTokenException", ex);
        ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }


    @ExceptionHandler(ExpiredTokenException.class)
    public ResponseEntity<ErrorResponse> handleExpiredTokenException(ExpiredTokenException ex){
        log.error("handleExpiredTokenException", ex);
        ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }


    @ExceptionHandler(InvalidRefreshTokenException.class)
    public ResponseEntity<ErrorResponse> handleInvalidRefreshTokenException(InvalidRefreshTokenException ex){
        log.error("handleInvalidRefreshTokenException", ex);
        ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }


    @ExceptionHandler(OAuth2FailedException.class)
    public ResponseEntity<ErrorResponse> handleOAuth2FailedException(OAuth2FailedException ex){
        log.error("handleOAuth2FailedException", ex);
        ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }


    @ExceptionHandler(MemberNotFoundException.class)
    public ResponseEntity<?> handleMemberNotFoundException(MemberNotFoundException ex){
        log.error("handleMemberNotFoundException", ex);
        ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }


    @ExceptionHandler(PostNotFoundException.class)
    public ResponseEntity<ErrorResponse> handlePostNotFoundException(PostNotFoundException ex){
        log.error("handlePostNotFoundException", ex);
        ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }


    @ExceptionHandler(NotAuthorizedToPostException.class)
    public ResponseEntity<ErrorResponse> handleNotAuthorizedToPostException(NotAuthorizedToPostException ex){
        log.error("handleNotAuthorizedToPostException", ex);
        ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }


}
