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
    SECURITY_AUTHENTICATION_EXCEPTION(HttpStatus.FORBIDDEN, "ERR_AUTH_002", "사용자 인증에 실패했습니다."),
    OAUTH_PROVIDER_NOT_FOUND(HttpStatus.NOT_FOUND, "ERR_AUTH_003", "Oauth Provider 가 존재하지 않습니다."),

    JWT_EXPIRED(HttpStatus.UNAUTHORIZED, "ERR_JWT_001", "JWT 기한이 만료되었습니다."),
    JWT_MALFORMED(HttpStatus.UNAUTHORIZED, "ERR_JWT_002", "JWT가 손상되었습니다."),
    JWT_UNSUPPORTED(HttpStatus.UNAUTHORIZED, "ERR_JWT_003", "지원되지 않는 JWT 입니다."),
    JWT_INVALID_SIGNATURE(HttpStatus.UNAUTHORIZED, "ERR_JWT_004", "signature가 유효하지 않습니다."),
    JWT_NOT_FOUND(HttpStatus.UNAUTHORIZED, "ERR_JWT_005", "JWT를 찾을 수 없습니다.");



    private final HttpStatus httpStatus;
    private final String errorCode;
    private final String message;
}
