package com.twoez.zupzup.global.advice.pet;


import com.twoez.zupzup.global.advice.AdviceLoggingUtils;
import com.twoez.zupzup.global.exception.pet.PetNotFoundException;
import com.twoez.zupzup.global.response.ApiResponse;
import com.twoez.zupzup.global.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class PetControllerAdvice {

    @ExceptionHandler(PetNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponse<ErrorResponse> petNotFound(PetNotFoundException e) {
        AdviceLoggingUtils.exceptionLog(e);
        return ApiResponse.notFound(ErrorResponse.from(e.getExceptionCode()));
    }
}
