package com.twoez.zupzup.fixture.plogginglog;


import com.twoez.zupzup.fixture.member.MemberFixture;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.plogginglog.domain.TotalPloggingLog;

public enum TotalPloggingLogFixture {
    DEFAULT(1L, 10L, 100L, 10L * 60 * 60, 2000L, 200L, false, MemberFixture.DEFAULT.getMember());
    private Long id;
    private Long totalCount;
    private Long totalDistance;
    private Long totalDurationTime;
    private Long totalCalories;
    private Long totalGatheredTrash;
    private Boolean isDeleted;
    private Member member;

    TotalPloggingLogFixture(
            Long id,
            Long totalCount,
            Long totalDistance,
            Long totalDurationTime,
            Long totalCalories,
            Long totalGatheredTrash,
            Boolean isDeleted,
            Member member) {
        this.id = id;
        this.totalCount = totalCount;
        this.totalDistance = totalDistance;
        this.totalDurationTime = totalDurationTime;
        this.totalCalories = totalCalories;
        this.totalGatheredTrash = totalGatheredTrash;
        this.isDeleted = isDeleted;
        this.member = member;
    }

    public TotalPloggingLog getTotalPloggingLog() {
        return TotalPloggingLog.builder()
                .id(id)
                .totalCount(totalCount)
                .totalDistance(totalDistance)
                .totalDurationTime(totalDurationTime)
                .totalCalories(totalCalories)
                .totalGatheredTrash(totalGatheredTrash)
                .isDeleted(isDeleted)
                .member(member)
                .build();
    }
}
