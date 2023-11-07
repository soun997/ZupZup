package com.twoez.zupzup.plogginglog.controller.dto.response;


import com.twoez.zupzup.plogginglog.domain.PloggingLog;

public record LogAddResponse(Long id) {

    public static LogAddResponse from(PloggingLog ploggingLog) {

        return new LogAddResponse(ploggingLog.getId());
    }
}
