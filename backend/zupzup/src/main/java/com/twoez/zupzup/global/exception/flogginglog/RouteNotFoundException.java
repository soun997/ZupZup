package com.twoez.zupzup.global.exception.flogginglog;


import com.twoez.zupzup.global.exception.ApplicationException;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import lombok.Getter;

@Getter
public class RouteNotFoundException extends ApplicationException {

    public RouteNotFoundException(HttpExceptionCode exceptionCode) {
        super(exceptionCode);
    }

    public RouteNotFoundException() {
        this(HttpExceptionCode.PLOGGING_LOG_NOT_FOUND);
    }
}
