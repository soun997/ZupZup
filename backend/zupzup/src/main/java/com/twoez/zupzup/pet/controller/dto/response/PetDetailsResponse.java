package com.twoez.zupzup.pet.controller.dto.response;


import com.twoez.zupzup.pet.domain.Pet;

public record PetDetailsResponse(Long characterId, Integer level, Integer exp) {

    public static PetDetailsResponse of(Pet character) {
        return new PetDetailsResponse(character.getId(), character.getLevel(), character.getExp());
    }
}
