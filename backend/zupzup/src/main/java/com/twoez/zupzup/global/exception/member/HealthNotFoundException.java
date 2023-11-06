package com.twoez.zupzup.global.exception.member;


import com.twoez.zupzup.global.exception.ApplicationException;
import com.twoez.zupzup.global.exception.HttpExceptionCode;

public class HealthNotFoundException extends ApplicationException {
    public HealthNotFoundException(HttpExceptionCode exceptionCode) {
        super(exceptionCode);
    }

    public HealthNotFoundException() {
        this(HttpExceptionCode.HEALTH_NOT_FOUND);
    }
}
