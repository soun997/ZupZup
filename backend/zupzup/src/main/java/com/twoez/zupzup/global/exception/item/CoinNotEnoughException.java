package com.twoez.zupzup.global.exception.item;

import com.twoez.zupzup.global.exception.ApplicationException;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import lombok.Getter;

@Getter
public class CoinNotEnoughException extends ApplicationException {

    public CoinNotEnoughException(HttpExceptionCode exceptionCode){
        super(exceptionCode);
    }
    public CoinNotEnoughException(){
        this(HttpExceptionCode.COIN_NOT_ENOUGH);
    }
}
