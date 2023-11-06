package com.twoez.zupzup.plogginglog.domain;


import com.twoez.zupzup.global.audit.BaseTime;
import com.twoez.zupzup.member.domain.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TotalPloggingLog extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "total_plogging_log_id")
    private Long id;

    @Column(nullable = false)
    private Long totalCount;

    @Column(nullable = false)
    private Long totalDistance;

    @Column(nullable = false)
    private Long totalDurationTime;

    @Column(nullable = false)
    private Long totalCalories;

    @Column(nullable = false)
    private Long totalGatheredTrash;

    @Column(nullable = false)
    @ColumnDefault("false")
    private Boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public TotalPloggingLog(
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

    public static TotalPloggingLog init(Member member) {

        return TotalPloggingLog.builder()
                .totalCount(0L)
                .totalDistance(0L)
                .totalDurationTime(0L)
                .totalCalories(0L)
                .totalGatheredTrash(0L)
                .isDeleted(false)
                .member(member)
                .build();
    }

    public void update(
            Integer distance, Integer durationTime, Integer calories, Integer gatheredTrash) {
        this.totalCount++;
        this.totalDistance += distance;
        this.totalDurationTime += durationTime;
        this.totalCalories += calories;
        this.totalGatheredTrash += gatheredTrash;
    }
}
