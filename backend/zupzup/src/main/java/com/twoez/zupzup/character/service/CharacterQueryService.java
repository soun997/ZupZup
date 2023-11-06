package com.twoez.zupzup.character.service;


import com.twoez.zupzup.character.domain.Character;
import com.twoez.zupzup.character.repository.CharacterQueryRepository;
import com.twoez.zupzup.global.exception.character.CharacterNotFoundException;
import com.twoez.zupzup.member.domain.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CharacterQueryService {

    private final CharacterQueryRepository characterQueryRepository;

    public Character search(LoginUser loginUser) {

        return characterQueryRepository
                .findByMemberId(loginUser.getMemberId())
                .orElseThrow(CharacterNotFoundException::new);
    }
}
