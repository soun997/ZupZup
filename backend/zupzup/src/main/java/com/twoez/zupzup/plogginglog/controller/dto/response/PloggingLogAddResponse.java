package com.twoez.zupzup.plogginglog.controller.dto.response;


import com.twoez.zupzup.plogginglog.domain.PloggingLog;

public record PloggingLogAddResponse(Long id) {

    public static PloggingLogAddResponse from(PloggingLog ploggingLog) {

        return new PloggingLogAddResponse(ploggingLog.getId());
    }
}
