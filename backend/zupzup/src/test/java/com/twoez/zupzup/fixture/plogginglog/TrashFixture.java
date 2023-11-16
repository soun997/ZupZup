package com.twoez.zupzup.fixture.plogginglog;


import com.twoez.zupzup.plogginglog.domain.PloggingLog;
import com.twoez.zupzup.plogginglog.domain.Trash;
import jakarta.persistence.*;

public enum TrashFixture {
    DEFAULT(
            1L,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            false,
            PloggingLogFixture.DEFAULT.getPloggingLog());

    private Long id;
    private Integer plastic;
    private Integer cigarette;
    private Integer can;
    private Integer glass;
    private Integer normal;
    private Integer styrofoam;
    private Integer metal;
    private Integer clothes;
    private Integer battery;
    private Integer paper;
    private Integer vinyl;
    private Integer mixed;
    private Integer food;
    private Integer etc;
    private Boolean isDeleted;
    private PloggingLog ploggingLog;

    TrashFixture(
            Long id,
            Integer plastic,
            Integer cigarette,
            Integer can,
            Integer glass,
            Integer normal,
            Integer styrofoam,
            Integer metal,
            Integer clothes,
            Integer battery,
            Integer paper,
            Integer vinyl,
            Integer mixed,
            Integer food,
            Integer etc,
            Boolean isDeleted,
            PloggingLog ploggingLog) {
        this.id = id;
        this.plastic = plastic;
        this.cigarette = cigarette;
        this.can = can;
        this.glass = glass;
        this.normal = normal;
        this.styrofoam = styrofoam;
        this.metal = metal;
        this.clothes = clothes;
        this.battery = battery;
        this.paper = paper;
        this.vinyl = vinyl;
        this.mixed = mixed;
        this.food = food;
        this.etc = etc;
        this.isDeleted = isDeleted;
        this.ploggingLog = ploggingLog;
    }

    public Trash getTrash() {
        return Trash.builder()
                .id(id)
                .plastic(plastic)
                .cigarette(cigarette)
                .can(can)
                .glass(glass)
                .normal(normal)
                .styrofoam(styrofoam)
                .metal(metal)
                .clothes(clothes)
                .battery(battery)
                .vinyl(vinyl)
                .paper(paper)
                .mixed(mixed)
                .food(food)
                .etc(etc)
                .isDeleted(isDeleted)
                .ploggingLog(ploggingLog)
                .build();
    }
}
