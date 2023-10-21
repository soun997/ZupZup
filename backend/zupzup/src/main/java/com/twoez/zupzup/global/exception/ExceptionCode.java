package com.twoez.zupzup.global.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ExceptionCode {
    UNEXPECTED_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "ERR_GLOBAL_001", "예상치 못한 오류가 발생했습니다.");

    private final HttpStatus httpStatus;
    private final String errorCode;
    private final String message;
}
