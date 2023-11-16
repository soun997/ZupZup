package com.twoez.zupzup.global.advice;


import com.twoez.zupzup.global.exception.ApplicationException;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AdviceLoggingUtils {

    public static void exceptionLog(ApplicationException e) {
        log.info(
                "[EXCEPTION] ({}) {} : {}",
                e.getExceptionCode().getHttpStatus().value(),
                e.getExceptionCode().getErrorCode(),
                e.getExceptionCode().getMessage());
    }

    public static void exceptionLog(HttpExceptionCode exceptionCode, Exception e) {
        log.info(
                "[EXCEPTION] ({}) {} : {}",
                exceptionCode.getHttpStatus().value(),
                exceptionCode.getErrorCode(),
                e.getMessage());
    }
}
