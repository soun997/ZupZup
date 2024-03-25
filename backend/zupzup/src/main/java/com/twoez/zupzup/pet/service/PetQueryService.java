package com.twoez.zupzup.pet.service;


import com.twoez.zupzup.global.exception.pet.PetNotFoundException;
import com.twoez.zupzup.pet.domain.Pet;
import com.twoez.zupzup.pet.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PetQueryService {

    private final PetRepository petRepository;

    public Pet search(Long memberId) {

        return petRepository.findByMemberId(memberId).orElseThrow(PetNotFoundException::new);
    }
}
