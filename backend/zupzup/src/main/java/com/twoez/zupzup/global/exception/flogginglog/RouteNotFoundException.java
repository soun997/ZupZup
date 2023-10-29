package com.twoez.zupzup.global.exception.flogginglog;


import com.twoez.zupzup.global.exception.ApplicationException;
import com.twoez.zupzup.global.exception.ExceptionCode;
import lombok.Getter;

@Getter
public class RouteNotFoundException extends ApplicationException {

    public RouteNotFoundException(ExceptionCode exceptionCode) {
        super(exceptionCode);
    }

    public RouteNotFoundException() {
        this(ExceptionCode.PLOGGING_LOG_NOT_FOUND);
    }
}
