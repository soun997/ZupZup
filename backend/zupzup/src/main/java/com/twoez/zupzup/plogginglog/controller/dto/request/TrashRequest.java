package com.twoez.zupzup.plogginglog.controller.dto.request;


import com.twoez.zupzup.plogginglog.domain.PloggingLog;
import com.twoez.zupzup.plogginglog.domain.Trash;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record TrashRequest(
        @NotNull @Min(0) Integer plastic,
        @NotNull @Min(0) Integer cigarette,
        @NotNull @Min(0) Integer can,
        @NotNull @Min(0) Integer glass,
        @NotNull @Min(0) Integer normal,
        @NotNull @Min(0) Integer styrofoam,
        @NotNull @Min(0) Integer aluminium,
        @NotNull @Min(0) Integer clothes,
        @NotNull @Min(0) Integer battery) {

    public Trash toEntity(PloggingLog ploggingLog) {
        return Trash.builder()
                .plastic(plastic)
                .cigarette(cigarette)
                .can(can)
                .glass(glass)
                .normal(normal)
                .styrofoam(styrofoam)
                .aluminium(aluminium)
                .clothes(clothes)
                .battery(battery)
                .ploggingLog(ploggingLog)
                .build();
    }
}
