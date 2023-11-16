package com.twoez.zupzup.global.exception.plogginglog;


import com.twoez.zupzup.global.exception.ApplicationException;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import lombok.Getter;

@Getter
public class TrashNotFoundException extends ApplicationException {

    public TrashNotFoundException(HttpExceptionCode exceptionCode) {
        super(exceptionCode);
    }

    public TrashNotFoundException() {
        this(HttpExceptionCode.TRASH_NOT_FOUND);
    }
}
