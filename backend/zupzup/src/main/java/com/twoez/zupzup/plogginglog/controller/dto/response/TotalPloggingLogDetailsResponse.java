package com.twoez.zupzup.plogginglog.controller.dto.response;


import com.twoez.zupzup.plogginglog.domain.TotalPloggingLog;
import com.twoez.zupzup.plogginglog.domain.TotalTrash;
import lombok.Builder;

@Builder
public record TotalPloggingLogDetailsResponse(
        Long totalDistance,
        Long totalCount,
        Long totalDurationTime,
        Long totalCalories,
        Long totalGatheredTrash,
        Integer totalPlastic,
        Integer totalCigarette,
        Integer totalCan,
        Integer totalGlass,
        Integer totalNormal,
        Integer totalStyrofoam,
        Integer totalMetal,
        Integer totalClothes,
        Integer totalBattery,
        Integer totalPaper,
        Integer totalVinyl,
        Integer totalMixed,
        Integer totalFood,
        Integer totalEtc) {

    public static TotalPloggingLogDetailsResponse from(
            TotalPloggingLog totalPloggingLog, TotalTrash totalTrash) {

        return TotalPloggingLogDetailsResponse.builder()
                .totalDistance(totalPloggingLog.getTotalDistance())
                .totalCount(totalPloggingLog.getTotalCount())
                .totalDurationTime(totalPloggingLog.getTotalDurationTime())
                .totalCalories(totalPloggingLog.getTotalCalories())
                .totalGatheredTrash(totalPloggingLog.getTotalGatheredTrash())
                .totalPlastic(totalTrash.getTotalPlastic())
                .totalCigarette(totalTrash.getTotalCigarette())
                .totalCan(totalTrash.getTotalCan())
                .totalGlass(totalTrash.getTotalGlass())
                .totalNormal(totalTrash.getTotalNormal())
                .totalStyrofoam(totalTrash.getTotalStyrofoam())
                .totalMetal(totalTrash.getTotalMetal())
                .totalClothes(totalTrash.getTotalClothes())
                .totalBattery(totalTrash.getTotalBattery())
                .totalPaper(totalTrash.getTotalPaper())
                .totalVinyl(totalTrash.getTotalVinyl())
                .totalMixed(totalTrash.getTotalMixed())
                .totalFood(totalTrash.getTotalFood())
                .totalEtc(totalTrash.getTotalEtc())
                .build();
    }
}
