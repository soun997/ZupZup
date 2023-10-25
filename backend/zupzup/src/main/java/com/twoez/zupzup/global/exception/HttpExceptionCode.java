package com.twoez.zupzup.global.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum HttpExceptionCode {
    UNEXPECTED_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "ERR_GLOBAL_001", "예상치 못한 오류가 발생했습니다."),
    INTERNAL_SERVER_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "ERR_GLOBAL_999",
            "서버 내부에서 오류가 발생했습니다."),

    SECURITY_AUTHORIZATION_EXCEPTION(HttpStatus.FORBIDDEN, "ERR_AUTH_001", "사용자 인가에 실패했습니다."),
    SECURITY_AUTHENTICATION_EXCEPTION(HttpStatus.FORBIDDEN, "ERR_AUTH_002", "사용자 인증에 실패했습니다.");



    private final HttpStatus httpStatus;
    private final String errorCode;
    private final String message;
}
