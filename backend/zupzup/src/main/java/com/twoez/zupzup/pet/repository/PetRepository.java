package com.twoez.zupzup.pet.repository;


import com.twoez.zupzup.pet.domain.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long>, PetQueryRepository {}
