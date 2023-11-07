package com.twoez.zupzup.trash.domain;

import com.twoez.zupzup.global.audit.BaseTime;
import com.twoez.zupzup.plogginglog.domain.PloggingLog;
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
    private Integer styroform;

    @Column(nullable = false)
    private Integer alnuminium;

    @Column(nullable = false)
    private Integer clothes;

    @Column(nullable = false)
    private Integer battery;

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
            Integer styroform,
            Integer alnuminium,
            Integer clothes,
            Integer battery,
            Boolean isDeleted,
            PloggingLog ploggingLog ){
        this.id = id;
        this.plastic = plastic;
        this.cigarette = cigarette;
        this.can = can;
        this.glass = glass;
        this.normal = normal;
        this.styroform = styroform;
        this.alnuminium = alnuminium;
        this.clothes = clothes;
        this.battery = battery;
        this.isDeleted = isDeleted;
        this.ploggingLog = ploggingLog;
    }

}
