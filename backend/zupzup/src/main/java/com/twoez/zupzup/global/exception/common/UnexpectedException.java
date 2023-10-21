package com.twoez.zupzup.global.exception.common;


import com.twoez.zupzup.global.exception.ApplicationException;
import com.twoez.zupzup.global.exception.ExceptionCode;
import lombok.Getter;

@Getter
public class UnexpectedException extends ApplicationException {

    public UnexpectedException(ExceptionCode exceptionCode) {
        super(exceptionCode);
    }

    public UnexpectedException() {
        this(ExceptionCode.UNEXPECTED_EXCEPTION);
    }
}
