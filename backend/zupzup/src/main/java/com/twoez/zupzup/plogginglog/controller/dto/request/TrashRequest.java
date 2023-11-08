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
        @NotNull @Min(0) Integer metal,
        @NotNull @Min(0) Integer clothes,
        @NotNull @Min(0) Integer paper,
        @NotNull @Min(0) Integer vinyl,
        @NotNull @Min(0) Integer mixed,
        @NotNull @Min(0) Integer food,
        @NotNull @Min(0) Integer etc,
        @NotNull @Min(0) Integer battery) {

    public Trash toEntity(PloggingLog ploggingLog) {
        return Trash.builder()
                .plastic(plastic)
                .cigarette(cigarette)
                .can(can)
                .glass(glass)
                .normal(normal)
                .styrofoam(styrofoam)
                .metal(metal)
                .clothes(clothes)
                .battery(battery)
                .paper(paper)
                .vinyl(vinyl)
                .mixed(mixed)
                .food(food)
                .etc(etc)
                .isDeleted(false)
                .ploggingLog(ploggingLog)
                .build();
    }
}
