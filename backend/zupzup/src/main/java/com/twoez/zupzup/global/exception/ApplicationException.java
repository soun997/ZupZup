package com.twoez.zupzup.global.exception;


import lombok.Getter;

@Getter
public class ApplicationException extends RuntimeException {

    private final ExceptionCode exceptionCode;

    public ApplicationException(ExceptionCode exceptionCode) {
        this.exceptionCode = exceptionCode;
    }
}
