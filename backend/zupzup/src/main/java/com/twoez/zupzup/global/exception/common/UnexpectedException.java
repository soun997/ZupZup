package com.twoez.zupzup.global.exception.common;


import com.twoez.zupzup.global.exception.ApplicationException;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import lombok.Getter;

@Getter
public class UnexpectedException extends ApplicationException {

    public UnexpectedException(HttpExceptionCode exceptionCode) {
        super(exceptionCode);
    }

    public UnexpectedException() {
        this(HttpExceptionCode.UNEXPECTED_EXCEPTION);
    }
}
