package com.twoez.zupzup.pet.repository;

import static com.twoez.zupzup.pet.domain.QPet.pet;

import com.twoez.zupzup.global.querydsl.QuerydslRepositorySupport;
import com.twoez.zupzup.pet.domain.Pet;
import jakarta.persistence.LockModeType;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public class PetQueryRepositoryImpl extends QuerydslRepositorySupport implements PetQueryRepository {

    public PetQueryRepositoryImpl() {
        super(Pet.class);
    }

    @Override
    public Optional<Pet> findByMemberId(Long memberId) {

        return Optional.ofNullable(
                selectFrom(pet)
                        .where(pet.member.id.eq(memberId).and(pet.isDeleted.isFalse()))
                        .setLockMode(LockModeType.PESSIMISTIC_WRITE)
                        .fetchOne());
    }
}
