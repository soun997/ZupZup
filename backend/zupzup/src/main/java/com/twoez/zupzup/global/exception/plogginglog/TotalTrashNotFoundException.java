package com.twoez.zupzup.global.exception.plogginglog;


import com.twoez.zupzup.global.exception.ApplicationException;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import lombok.Getter;

@Getter
public class TotalTrashNotFoundException extends ApplicationException {

    public TotalTrashNotFoundException(HttpExceptionCode exceptionCode) {
        super(exceptionCode);
    }

    public TotalTrashNotFoundException() {
        this(HttpExceptionCode.TOTAL_TRASH_NOT_FOUND);
    }
}
