package com.twoez.zupzup.fixture.plogginglog;


import com.twoez.zupzup.fixture.member.MemberFixture;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.plogginglog.domain.TotalTrash;

public enum TotalTrashFixture {
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
            MemberFixture.DEFAULT.getMember());

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
    private Member member;

    TotalTrashFixture(
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
            Member member) {
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
        this.member = member;
    }

    public TotalTrash getTotalTrash() {
        return TotalTrash.builder()
                .id(id)
                .totalPlastic(plastic)
                .totalCigarette(cigarette)
                .totalCan(can)
                .totalGlass(glass)
                .totalNormal(normal)
                .totalStyrofoam(styrofoam)
                .totalMetal(metal)
                .totalClothes(clothes)
                .totalBattery(battery)
                .totalVinyl(vinyl)
                .totalPaper(paper)
                .totalMixed(mixed)
                .totalFood(food)
                .totalEtc(etc)
                .isDeleted(isDeleted)
                .member(member)
                .build();
    }
}
