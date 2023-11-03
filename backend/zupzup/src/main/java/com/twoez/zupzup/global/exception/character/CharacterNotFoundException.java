package com.twoez.zupzup.global.exception.character;

import com.twoez.zupzup.global.exception.ApplicationException;
import com.twoez.zupzup.global.exception.HttpExceptionCode;

public class CharacterNotFoundException extends ApplicationException {

    public CharacterNotFoundException(HttpExceptionCode exceptionCode) {
        super(exceptionCode);
    }

    public CharacterNotFoundException() {
        this(HttpExceptionCode.CHARACTER_NOT_FOUND);
    }
}
