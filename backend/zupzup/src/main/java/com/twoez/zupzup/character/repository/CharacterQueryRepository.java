package com.twoez.zupzup.character.repository;

import static com.twoez.zupzup.character.domain.QCharacter.character;

import com.twoez.zupzup.character.domain.Character;
import com.twoez.zupzup.global.querydsl.QuerydslRepositorySupport;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public class CharacterQueryRepository extends QuerydslRepositorySupport {

    public CharacterQueryRepository() {
        super(Character.class);
    }

    public Optional<Character> findByMemberId(Long id) {

        return Optional.ofNullable(
                selectFrom(character)
                        .where(character.member.id.eq(id).and(character.isDeleted.isFalse()))
                        .fetchOne());
    }
}
