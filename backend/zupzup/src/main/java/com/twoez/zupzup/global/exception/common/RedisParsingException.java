package com.twoez.zupzup.global.exception.common;

import com.twoez.zupzup.global.exception.ApplicationException;
import com.twoez.zupzup.global.exception.HttpExceptionCode;

public class RedisParsingException extends ApplicationException {

    public RedisParsingException() {
        super(HttpExceptionCode.REDIS_PARSING_EXCEPTION);
    }

    public RedisParsingException(String exceptionCode) {
        super(HttpExceptionCode.REDIS_PARSING_EXCEPTION, exceptionCode);
    }
}
