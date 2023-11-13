package com.twoez.zupzup.plogginglog.domain;


import com.twoez.zupzup.global.audit.BaseTime;
import com.twoez.zupzup.member.domain.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TotalTrash extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "total_trash_id")
    private Long id;

    @Column(nullable = false)
    private Integer totalPlastic;

    @Column(nullable = false)
    private Integer totalCigarette;

    @Column(nullable = false)
    private Integer totalCan;

    @Column(nullable = false)
    private Integer totalGlass;

    @Column(nullable = false)
    private Integer totalNormal;

    @Column(nullable = false)
    private Integer totalStyrofoam;

    @Column(nullable = false)
    private Integer totalMetal;

    @Column(nullable = false)
    private Integer totalClothes;

    @Column(nullable = false)
    private Integer totalBattery;

    @Column(nullable = false)
    private Integer totalPaper;

    @Column(nullable = false)
    private Integer totalVinyl;

    @Column(nullable = false)
    private Integer totalMixed;

    @Column(nullable = false)
    private Integer totalFood;

    @Column(nullable = false)
    private Integer totalEtc;

    @Column(nullable = false)
    @ColumnDefault("false")
    private Boolean isDeleted;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public TotalTrash(
            Long id,
            Integer totalPlastic,
            Integer totalCigarette,
            Integer totalCan,
            Integer totalGlass,
            Integer totalNormal,
            Integer totalStyrofoam,
            Integer totalMetal,
            Integer totalClothes,
            Integer totalBattery,
            Integer totalVinyl,
            Integer totalPaper,
            Integer totalMixed,
            Integer totalFood,
            Integer totalEtc,
            Boolean isDeleted,
            Member member) {
        this.id = id;
        this.totalPlastic = totalPlastic;
        this.totalCigarette = totalCigarette;
        this.totalCan = totalCan;
        this.totalGlass = totalGlass;
        this.totalNormal = totalNormal;
        this.totalStyrofoam = totalStyrofoam;
        this.totalMetal = totalMetal;
        this.totalClothes = totalClothes;
        this.totalBattery = totalBattery;
        this.totalVinyl = totalVinyl;
        this.totalPaper = totalPaper;
        this.totalMixed = totalMixed;
        this.totalFood = totalFood;
        this.totalEtc = totalEtc;
        this.isDeleted = isDeleted;
        this.member = member;
    }

    public static TotalTrash init(Member member) {

        return TotalTrash.builder()
                .totalPlastic(0)
                .totalCigarette(0)
                .totalCan(0)
                .totalGlass(0)
                .totalNormal(0)
                .totalStyrofoam(0)
                .totalMetal(0)
                .totalClothes(0)
                .totalBattery(0)
                .totalVinyl(0)
                .totalPaper(0)
                .totalMixed(0)
                .totalFood(0)
                .totalEtc(0)
                .isDeleted(false)
                .member(member)
                .build();
    }

    public void update(
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
            Integer etc) {
        this.totalPlastic += plastic;
        this.totalCigarette += cigarette;
        this.totalCan += can;
        this.totalGlass += glass;
        this.totalNormal += normal;
        this.totalStyrofoam += styrofoam;
        this.totalMetal += metal;
        this.totalClothes += clothes;
        this.totalBattery += battery;
        this.totalVinyl += vinyl;
        this.totalPaper += paper;
        this.totalMixed += mixed;
        this.totalFood += food;
        this.totalEtc += etc;
    }
}
