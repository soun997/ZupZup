package com.twoez.zupzup.global.response;

public record ApiContent<T>(int status, T results) {}
