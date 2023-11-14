package com.twoez.zupzup.global.exception.plogging;


import com.twoez.zupzup.global.exception.ApplicationException;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import lombok.Getter;

@Getter
public class PloggingNotFoundException extends ApplicationException {

    public PloggingNotFoundException(HttpExceptionCode exceptionCode) {
        super(exceptionCode);
    }

    public PloggingNotFoundException() {
        this(HttpExceptionCode.PLOGGING_NOT_FOUND);
    }
}
