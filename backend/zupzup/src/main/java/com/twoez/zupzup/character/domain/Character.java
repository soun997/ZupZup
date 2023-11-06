package com.twoez.zupzup.character.domain;


import com.twoez.zupzup.global.audit.BaseTime;
import com.twoez.zupzup.member.domain.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Character extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "character_id")
    private Long id;

    private Integer level;

    private Integer exp;

    private Boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Character(
            Long id,
            Integer level,
            Integer exp,
            Boolean isDeleted,
            Member member) {
        this.id = id;
        this.level = level;
        this.exp = exp;
        this.isDeleted = isDeleted;
        this.member = member;
    }

    public void addExp(Integer itemExp) {
        this.exp += itemExp;
        if(isMaxLevelAndMaxExp()){
            this.exp = 100;
            return;
        }
        levelUp();
    }

    private void levelUp() {
        if(isExpMax()){
            this.level++;
            this.exp -=100;
        }
    }

    private boolean isExpMax() {
        return this.exp >= 100;
    }

    private boolean isMaxLevelAndMaxExp() {
        return this.level == 10 && this.exp >= 100;
    }
}
