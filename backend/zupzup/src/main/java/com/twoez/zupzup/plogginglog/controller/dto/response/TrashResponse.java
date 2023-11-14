package com.twoez.zupzup.plogginglog.controller.dto.response;


import com.twoez.zupzup.plogginglog.domain.Trash;
import lombok.Builder;

@Builder
public record TrashResponse(
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
        Integer etc) {

    public static TrashResponse from(Trash trash) {
        return TrashResponse.builder()
                .plastic(trash.getPlastic())
                .cigarette(trash.getCigarette())
                .can(trash.getCan())
                .glass(trash.getGlass())
                .normal(trash.getNormal())
                .styrofoam(trash.getStyrofoam())
                .metal(trash.getMetal())
                .clothes(trash.getClothes())
                .battery(trash.getBattery())
                .paper(trash.getPaper())
                .vinyl(trash.getVinyl())
                .mixed(trash.getMixed())
                .food(trash.getFood())
                .etc(trash.getEtc())
                .build();
    }
}
