package com.twoez.zupzup.global.exception;


import lombok.Getter;

@Getter
public class ApplicationException extends RuntimeException {

    private final HttpExceptionCode exceptionCode;

    public ApplicationException(HttpExceptionCode exceptionCode) {
        this.exceptionCode = exceptionCode;
    }

    public ApplicationException(HttpExceptionCode exceptionCode, String exceptionMessage) {
        super(exceptionMessage);
        this.exceptionCode = exceptionCode;
    }
}
