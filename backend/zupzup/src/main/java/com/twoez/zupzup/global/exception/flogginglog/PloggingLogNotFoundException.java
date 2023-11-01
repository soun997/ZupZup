package com.twoez.zupzup.global.exception.flogginglog;


import com.twoez.zupzup.global.exception.ApplicationException;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import lombok.Getter;

@Getter
public class PloggingLogNotFoundException extends ApplicationException {

    public PloggingLogNotFoundException(HttpExceptionCode exceptionCode) {
        super(exceptionCode);
    }

    public PloggingLogNotFoundException() {
        this(HttpExceptionCode.PLOGGING_LOG_NOT_FOUND);
    }
}
