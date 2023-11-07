package com.twoez.zupzup.global.exception.pet;


import com.twoez.zupzup.global.exception.ApplicationException;
import com.twoez.zupzup.global.exception.HttpExceptionCode;

public class PetNotFoundException extends ApplicationException {

    public PetNotFoundException(HttpExceptionCode exceptionCode) {
        super(exceptionCode);
    }

    public PetNotFoundException() {
        this(HttpExceptionCode.PET_NOT_FOUND);
    }
}
