package com.twoez.zupzup.character.controller.dto.response;

import com.twoez.zupzup.character.domain.Character;

public record CharacterDetailsResponse(Long characterId,
                                       Integer level,
                                       Integer exp) {

    public static CharacterDetailsResponse of(Character character) {
        return new CharacterDetailsResponse(
                character.getId(),
                character.getLevel(),
                character.getExp());
    }
}
