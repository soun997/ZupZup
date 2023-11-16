package com.twoez.zupzup.global.advice.plogging;


import com.twoez.zupzup.global.advice.AdviceLoggingUtils;
import com.twoez.zupzup.global.exception.plogging.PloggingNotFoundException;
import com.twoez.zupzup.global.response.ErrorResponse;
import com.twoez.zupzup.global.response.HttpResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class PloggingControllerAdvice {

    @ExceptionHandler(PloggingNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public HttpResponse<ErrorResponse> ploggingNotFound(PloggingNotFoundException e) {
        AdviceLoggingUtils.exceptionLog(e);
        return HttpResponse.notFoundBuild(ErrorResponse.from(e.getExceptionCode()));
    }
}
