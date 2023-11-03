package com.twoez.zupzup.global.exception.item;

import com.twoez.zupzup.global.exception.ApplicationException;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import lombok.Getter;

@Getter
public class ItemNotFoundException extends ApplicationException {

    public ItemNotFoundException(HttpExceptionCode exceptionCode){
        super(exceptionCode);
    }
    public ItemNotFoundException(){
        this(HttpExceptionCode.ITEM_NOT_FOUND);
    }
}
