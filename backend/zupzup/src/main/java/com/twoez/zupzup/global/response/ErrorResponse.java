package com.twoez.zupzup.global.response;


import com.twoez.zupzup.global.exception.HttpExceptionCode;

public record ErrorResponse(String errorCode, String message) {

    public static ErrorResponse from(HttpExceptionCode exceptionCode) {
        return new ErrorResponse(exceptionCode.getErrorCode(), exceptionCode.getMessage());
    }

    public static ErrorResponse from(HttpExceptionCode exceptionCode, String errorMessage) {
        return new ErrorResponse(exceptionCode.getErrorCode(), errorMessage);
    }
}
