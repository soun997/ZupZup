package com.twoez.zupzup.global.advice.item;

import com.twoez.zupzup.global.advice.AdviceLoggingUtils;
import com.twoez.zupzup.global.exception.item.CoinNotEnoughException;
import com.twoez.zupzup.global.exception.item.ItemNotFoundException;
import com.twoez.zupzup.global.response.ApiResponse;
import com.twoez.zupzup.global.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ItemControllerAdvice {

    @ExceptionHandler(ItemNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponse<ErrorResponse> itemNotFound(ItemNotFoundException e){
        AdviceLoggingUtils.exceptionLog(e);
        return ApiResponse.notFound(ErrorResponse.from(e.getExceptionCode()));
    }

    @ExceptionHandler(CoinNotEnoughException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse<ErrorResponse> coinNotEnough(CoinNotEnoughException e) {
        AdviceLoggingUtils.exceptionLog(e);
        return ApiResponse.badRequest(ErrorResponse.from(e.getExceptionCode()));
    }
}
