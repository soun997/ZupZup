package com.twoez.zupzup.plogging.controller.dto;


public record PloggerResponse(Long totalPlogger) {

    public static PloggerResponse from(Long totalPlogger) {

        return new PloggerResponse(totalPlogger);
    }
}
