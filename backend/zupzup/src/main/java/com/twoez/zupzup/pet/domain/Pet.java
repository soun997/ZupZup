package com.twoez.zupzup.pet.domain;


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
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Pet extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pet_id")
    private Long id;

    @Column(nullable = false)
    private Integer level;

    @Column(nullable = false)
    private Integer exp;

    @Column(nullable = false)
    @ColumnDefault("false")
    private Boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Pet(Long id, Integer level, Integer exp, Boolean isDeleted, Member member) {
        this.id = id;
        this.level = level;
        this.exp = exp;
        this.isDeleted = isDeleted;
        this.member = member;
    }

    public static Pet init(Member member) {

        return Pet.builder().level(0).exp(0).isDeleted(false).member(member).build();
    }

    public void addExp(Integer itemExp) {
        this.exp += itemExp;
        if (isMaxLevelAndMaxExp()) {
            this.exp = 100;
            return;
        }
        levelUp();
    }

    private void levelUp() {
        if (isExpMax()) {
            this.level++;
            this.exp -= 100;
        }
    }

    private boolean isExpMax() {
        return this.exp >= 100;
    }

    private boolean isMaxLevelAndMaxExp() {
        return this.level == 10 && this.exp >= 100;
    }
}
