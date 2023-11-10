package com.twoez.zupzup.member.exception;

import com.twoez.zupzup.global.exception.ApplicationException;
import com.twoez.zupzup.global.exception.HttpExceptionCode;

public class AlreadyRegisteredMemberException extends ApplicationException {

    public AlreadyRegisteredMemberException() {
        super(HttpExceptionCode.ALREADY_REGISTERED);
    }

}
