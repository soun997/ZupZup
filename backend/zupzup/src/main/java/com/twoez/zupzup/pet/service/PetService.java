package com.twoez.zupzup.pet.service;


import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.pet.domain.Pet;
import com.twoez.zupzup.pet.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PetService {

    private final PetRepository petRepository;

    public void add(Member member) {

        petRepository.save(Pet.init(member));
    }
}
