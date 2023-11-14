package com.twoez.zupzup.config.security.handler;


import com.twoez.zupzup.config.security.HttpRequestEndpointChecker;
import com.twoez.zupzup.config.security.filter.HttpRequestUtils;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import com.twoez.zupzup.global.response.ErrorResponse;
import com.twoez.zupzup.global.util.Assertions;
import com.twoez.zupzup.global.util.ExceptionResponseWriter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.stereotype.Component;

/** 인증에 대한 기본 예외 처리 핸들러 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultAuthenticationEntryPoint extends Http403ForbiddenEntryPoint {

    private final HttpRequestEndpointChecker endpointChecker;

    @Override
    public void commence(
            HttpServletRequest request, HttpServletResponse response, AuthenticationException arg2)
            throws IOException {
        log.info("[AuthenticationEntryPoint] {} {}", request.getMethod(), request.getRequestURI());
        arg2.printStackTrace();
        log.info("stackTrace over");

        //        Assertion.with(request)
        //                .setValidation(endpointChecker::existsEndPoint)
        //                .validateOrExecute(
        //                        () -> writeExceptionResponse(response,
        // authenticationExceptionCode));
        //
        //        // Authentication 이 필요한데 유효한 Authorization Header가 없을 경우
        //        Assertion.with(request).setValidation(HttpRequestUtils::hasAuthorizationHeader)
        //                .validateOrExecute(() -> writeExceptionResponse(response,
        //                        HttpExceptionCode.INVALID_AUTHORIZATION_HEADER));

        Assertions.with(request)
                .setValidation(endpointChecker::existsEndPoint)
                .validateOrExecute(
                        () -> writeExceptionResponse(response, HttpExceptionCode.REQUEST_NOT_FOUND))
                .setValidation(HttpRequestUtils::hasAuthorizationHeader)
                .validateOrExecute(
                        () ->
                                writeExceptionResponse(
                                        response, HttpExceptionCode.INVALID_AUTHORIZATION_HEADER))
                .validate();

        if (response.isCommitted()) {
            log.info("response committed");
            return;
        }
        super.commence(request, response, arg2);
    }

    private void writeExceptionResponse(
            HttpServletResponse response, HttpExceptionCode exceptionCode) {
        log.info(exceptionCode.getMessage());
        try {
            ExceptionResponseWriter.writeException(
                    response, exceptionCode.getHttpStatus(), ErrorResponse.from(exceptionCode));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
