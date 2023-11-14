package com.twoez.zupzup.global.util;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.function.Predicate;
import java.util.function.Supplier;


/**
 * 다양한 validation에 대해 RuntimeException 예외 핸들링 방식을 제공합니다.
 * @param <T>
 */
public class Assertions<T> {
    private T param;
    private int validationId;
    private final Map<Integer, Predicate<T>> predicateMap;
    private final Map<Integer, Object> exceptionHandlerMap;

    private Assertions(T param) {
        this.param = param;
        this.validationId = 1;
        predicateMap = new HashMap<>();
        exceptionHandlerMap = new HashMap<>();
    }

    public static <T> Assertions<T> with(T param) {
        return new Assertions<>(param);
    }

    public Assertions<T> setValidation(Predicate<T> predicate) {
        this.predicateMap.put(validationId, predicate);
        return this;
    }

    public <X extends RuntimeException> Assertions<T> validateOrThrow(Supplier<? extends X> exceptionSupplier)
            throws X {
        checkValidation(validationId);
        this.exceptionHandlerMap.put(validationId++, exceptionSupplier);
        return this;
    }

    public Assertions<T> validateOrExecute(Runnable exceptionHandler) {
        checkValidation(validationId);
        this.exceptionHandlerMap.put(validationId++, exceptionHandler);
        return this;
    }

    private void checkValidation(int validationId) {
        if (Objects.isNull(predicateMap.get(validationId))) {
            throw new IllegalStateException("검증 로직이 없습니다.");
        }
    }

    public void validate() {
        for (int i=1; i<validationId; i++) {
            Predicate<T> predicate = predicateMap.get(i);
            Object handler = exceptionHandlerMap.get(i);
            if (handler instanceof Supplier) { // validateOrThrow
                Supplier<? extends RuntimeException> exceptionSupplier = (Supplier<? extends RuntimeException>) handler;
                if (!predicate.test(param)) {
                    i = validationId;
                    throw exceptionSupplier.get();
                }
            } else { // validateOrExecute
                Runnable exceptionHandler = (Runnable) handler;
                if (!predicate.test(param)) {
                    i = validationId;
                    exceptionHandler.run();
                }
            }
        }
    }

}
