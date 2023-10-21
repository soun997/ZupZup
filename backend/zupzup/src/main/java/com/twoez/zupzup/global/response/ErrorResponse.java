package com.twoez.zupzup.global.response;


import com.twoez.zupzup.global.exception.ExceptionCode;

public record ErrorResponse(String errorCode, String message) {

    public static ErrorResponse from(ExceptionCode exceptionCode) {
        return new ErrorResponse(exceptionCode.getErrorCode(), exceptionCode.getMessage());
    }
}
