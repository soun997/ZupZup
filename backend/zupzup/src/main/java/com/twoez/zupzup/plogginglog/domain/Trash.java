package com.twoez.zupzup.plogginglog.domain;


import com.twoez.zupzup.global.audit.BaseTime;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Trash extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trash_id")
    private Long id;

    @Column(nullable = false)
    private Integer plastic;

    @Column(nullable = false)
    private Integer cigarette;

    @Column(nullable = false)
    private Integer can;

    @Column(nullable = false)
    private Integer glass;

    @Column(nullable = false)
    private Integer normal;

    @Column(nullable = false)
    private Integer styrofoam;

    @Column(nullable = false)
    private Integer metal;

    @Column(nullable = false)
    private Integer clothes;

    @Column(nullable = false)
    private Integer battery;

    @Column(nullable = false)
    private Integer paper;

    @Column(nullable = false)
    private Integer vinyl;

    @Column(nullable = false)
    private Integer mixed;

    @Column(nullable = false)
    private Integer food;

    @Column(nullable = false)
    private Integer etc;

    @Column(nullable = false)
    private Boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plogging_log_id")
    private PloggingLog ploggingLog;

    @Builder
    public Trash(
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
            Integer vinyl,
            Integer paper,
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
        this.vinyl = vinyl;
        this.paper = paper;
        this.mixed = mixed;
        this.food = food;
        this.etc = etc;
        this.isDeleted = isDeleted;
        this.ploggingLog = ploggingLog;
    }
}
