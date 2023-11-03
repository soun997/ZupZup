package com.twoez.zupzup.global.util;

public class MathUtils {

    public static Integer clamp(Integer origin) {

        return Math.max(0, Math.min(Integer.MAX_VALUE - 1, origin));
    }

    public static Long clamp(Long origin) {

        return Math.max(0, Math.min(Long.MAX_VALUE - 1L, origin));
    }
}
