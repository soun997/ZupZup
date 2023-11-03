package com.twoez.zupzup.global.advice.common;


import com.twoez.zupzup.global.advice.AdviceLoggingUtils;
import com.twoez.zupzup.global.exception.common.RedisParsingException;
import com.twoez.zupzup.global.exception.common.UnexpectedException;
import com.twoez.zupzup.global.response.ApiResponse;
import com.twoez.zupzup.global.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalControllerAdvice {

    @ExceptionHandler(UnexpectedException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse<ErrorResponse> unexpected(UnexpectedException exception) {
        AdviceLoggingUtils.exceptionLog(exception);
        return ApiResponse.internalServerError(ErrorResponse.from(exception.getExceptionCode()));
    }

    @ExceptionHandler(RedisParsingException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse<ErrorResponse> redisParsing(RedisParsingException exception) {
        AdviceLoggingUtils.exceptionLog(exception);
        return ApiResponse.internalServerError(ErrorResponse.from(exception.getExceptionCode()));
    }
}
