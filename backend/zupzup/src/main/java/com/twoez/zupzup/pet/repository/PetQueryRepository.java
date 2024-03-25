package com.twoez.zupzup.pet.repository;


import com.twoez.zupzup.pet.domain.Pet;
import java.util.Optional;

public interface PetQueryRepository {

    Optional<Pet> findByMemberId(Long memberId);
}
