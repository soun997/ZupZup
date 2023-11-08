package com.twoez.zupzup.global.exception.plogginglog;


import com.twoez.zupzup.global.exception.ApplicationException;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import lombok.Getter;

@Getter
public class TotalPloggingLogNotFoundException extends ApplicationException {

    public TotalPloggingLogNotFoundException(HttpExceptionCode exceptionCode) {
        super(exceptionCode);
    }

    public TotalPloggingLogNotFoundException() {
        this(HttpExceptionCode.TOTAL_PLOGGING_LOG_NOT_FOUND);
    }
}
