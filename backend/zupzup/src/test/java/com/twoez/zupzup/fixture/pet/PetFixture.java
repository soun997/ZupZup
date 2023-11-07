package com.twoez.zupzup.fixture.pet;


import com.twoez.zupzup.fixture.member.MemberFixture;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.pet.domain.Pet;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public enum PetFixture {
    DEFAULT(1L, 1, 50, false, MemberFixture.DEFAULT.getMember());

    private Long id;
    private Integer level;
    private Integer exp;
    private Boolean isDeleted;
    private Member member;

    PetFixture(Long id, Integer level, Integer exp, Boolean isDeleted, Member member) {
        this.id = id;
        this.level = level;
        this.exp = exp;
        this.isDeleted = isDeleted;
        this.member = member;
    }

    public Pet getCharacter() {
        return Pet.builder()
                .id(id)
                .level(level)
                .exp(exp)
                .isDeleted(isDeleted)
                .member(member)
                .build();
    }
}
