package com.ssafy.dreamgream.global.common.exception;

import com.amazonaws.services.kms.model.NotFoundException;
import com.ssafy.dreamgream.global.common.dto.response.ErrorResponseDto;
import com.ssafy.dreamgream.global.common.exception.customException.PostNotFoundException;
import com.ssafy.dreamgream.global.common.exception.customException.BadRequestException;
import com.ssafy.dreamgream.global.common.exception.customException.ExpiredTokenException;
import com.ssafy.dreamgream.global.common.exception.customException.InvalidInputValueException;
import com.ssafy.dreamgream.global.common.exception.customException.InvalidRefreshTokenException;
import com.ssafy.dreamgream.global.common.exception.customException.InvalidTokenException;
import com.ssafy.dreamgream.global.common.exception.customException.MemberNotFoundException;
import com.ssafy.dreamgream.global.common.exception.customException.NotAuthorizedMemberException;
import com.ssafy.dreamgream.global.common.exception.customException.NotAuthorizedToPostException;
import com.ssafy.dreamgream.global.common.exception.customException.OAuth2FailedException;
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
    public final ResponseEntity<ErrorResponseDto> handleException(Exception ex) {
        log.error("handleException", ex);
        ErrorResponseDto errorResponseDto = new ErrorResponseDto(ErrorCode.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(errorResponseDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @ExceptionHandler(NotFoundException.class)
    public final ResponseEntity<ErrorResponseDto> handleNotFoundException(NotFoundException ex) {
        log.error("handleNotFoundException", ex);
        ErrorResponseDto errorResponseDto = new ErrorResponseDto(ErrorCode.NOT_FOUND);
        return new ResponseEntity<>(errorResponseDto, HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(BadRequestException.class)
    public final ResponseEntity<ErrorResponseDto> handleBadRequestException(BadRequestException ex) {
        log.error("handleBadRequestException", ex);
        ErrorResponseDto errorResponseDto = new ErrorResponseDto(ErrorCode.BAD_REQUEST);
        return new ResponseEntity<>(errorResponseDto, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(InvalidInputValueException.class)
    public final ResponseEntity<ErrorResponseDto> handleInvalidInputValueException(InvalidInputValueException ex) {
        log.error("handleInvalidInputValueException", ex);
        ErrorResponseDto errorResponseDto = new ErrorResponseDto(ErrorCode.INVALID_INPUT_VALUE);
        return new ResponseEntity<>(errorResponseDto, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }


    @ExceptionHandler(NotAuthorizedMemberException.class)
    public ResponseEntity<ErrorResponseDto> handleNotAuthorizedMemberException(NotAuthorizedMemberException ex){
        log.error("handleNotAuthorizedMemberException", ex);
        ErrorResponseDto response = new ErrorResponseDto(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }


    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<ErrorResponseDto> handleInvalidTokenException(InvalidTokenException ex){
        log.error("handleInvalidTokenException", ex);
        ErrorResponseDto response = new ErrorResponseDto(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }


    @ExceptionHandler(ExpiredTokenException.class)
    public ResponseEntity<ErrorResponseDto> handleExpiredTokenException(ExpiredTokenException ex){
        log.error("handleExpiredTokenException", ex);
        ErrorResponseDto response = new ErrorResponseDto(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }


    @ExceptionHandler(InvalidRefreshTokenException.class)
    public ResponseEntity<ErrorResponseDto> handleInvalidRefreshTokenException(InvalidRefreshTokenException ex){
        log.error("handleInvalidRefreshTokenException", ex);
        ErrorResponseDto response = new ErrorResponseDto(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }


    @ExceptionHandler(OAuth2FailedException.class)
    public ResponseEntity<ErrorResponseDto> handleOAuth2FailedException(OAuth2FailedException ex){
        log.error("handleOAuth2FailedException", ex);
        ErrorResponseDto response = new ErrorResponseDto(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }


    @ExceptionHandler(MemberNotFoundException.class)
    public ResponseEntity<?> handleMemberNotFoundException(MemberNotFoundException ex){
        log.error("handleMemberNotFoundException", ex);
        ErrorResponseDto response = new ErrorResponseDto(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }


    @ExceptionHandler(PostNotFoundException.class)
    public ResponseEntity<ErrorResponseDto> handlePostNotFoundException(PostNotFoundException ex){
        log.error("handlePostNotFoundException", ex);
        ErrorResponseDto response = new ErrorResponseDto(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }


    @ExceptionHandler(NotAuthorizedToPostException.class)
    public ResponseEntity<ErrorResponseDto> handleNotAuthorizedToPostException(NotAuthorizedToPostException ex){
        log.error("handleNotAuthorizedToPostException", ex);
        ErrorResponseDto response = new ErrorResponseDto(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ex.getErrorCode().getStatus()));
    }


}
