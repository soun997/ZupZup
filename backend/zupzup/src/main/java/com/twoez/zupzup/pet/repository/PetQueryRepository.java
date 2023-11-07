package com.twoez.zupzup.pet.repository;

import static com.twoez.zupzup.pet.domain.QPet.pet;

import com.twoez.zupzup.global.querydsl.QuerydslRepositorySupport;
import com.twoez.zupzup.pet.domain.Pet;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public class PetQueryRepository extends QuerydslRepositorySupport {

    public PetQueryRepository() {
        super(Pet.class);
    }

    public Optional<Pet> findByMemberId(Long id) {

        return Optional.ofNullable(
                selectFrom(pet)
                        .where(pet.member.id.eq(id).and(pet.isDeleted.isFalse()))
                        .fetchOne());
    }
}
