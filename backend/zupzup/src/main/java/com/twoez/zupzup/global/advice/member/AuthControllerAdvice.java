package com.twoez.zupzup.global.advice.member;


import com.twoez.zupzup.config.security.exception.InvalidAuthorizationTokenException;
import com.twoez.zupzup.config.security.exception.InvalidIdTokenException;
import com.twoez.zupzup.config.security.exception.InvalidJwtException;
import com.twoez.zupzup.global.advice.AdviceLoggingUtils;
import com.twoez.zupzup.global.response.ErrorResponse;
import com.twoez.zupzup.global.response.HttpResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AuthControllerAdvice {

    @ExceptionHandler(InvalidIdTokenException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public HttpResponse<ErrorResponse> idTokenKidExcepiton(InvalidIdTokenException e) {
        AdviceLoggingUtils.exceptionLog(e);
        return HttpResponse.status(e.getExceptionCode().getHttpStatus())
                .body(ErrorResponse.from(e.getExceptionCode()));
    }

    @ExceptionHandler(InvalidAuthorizationTokenException.class)
    public HttpResponse<ErrorResponse> invalidAuthorizationTokenException(
            InvalidAuthorizationTokenException e) {
        AdviceLoggingUtils.exceptionLog(e);
        return HttpResponse.status(e.getExceptionCode().getHttpStatus())
                .body(ErrorResponse.from(e.getExceptionCode()));
    }

    @ExceptionHandler(InvalidJwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public HttpResponse<ErrorResponse> invalidJwtException(InvalidJwtException e) {
        AdviceLoggingUtils.exceptionLog(e);
        return HttpResponse.status(e.getExceptionCode().getHttpStatus())
                .body(ErrorResponse.from(e.getExceptionCode()));
    }
}
