package com.twoez.zupzup.config.security.exception;


import com.twoez.zupzup.global.exception.ApplicationException;
import com.twoez.zupzup.global.exception.HttpExceptionCode;

public class ExpiredAuthorizationTokenException extends ApplicationException {

    public ExpiredAuthorizationTokenException() {
        super(HttpExceptionCode.AUTHORIZATION_TOKEN_EXPIRED_EXCEPTION);
    }
}
