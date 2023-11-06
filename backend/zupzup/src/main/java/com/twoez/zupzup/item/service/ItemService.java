package com.twoez.zupzup.item.service;

import com.twoez.zupzup.character.repository.CharacterQueryRepository;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import com.twoez.zupzup.global.exception.character.CharacterNotFoundException;
import com.twoez.zupzup.global.exception.item.ItemNotFoundException;
import com.twoez.zupzup.item.domain.Item;
import com.twoez.zupzup.item.repository.ItemRepository;
import com.twoez.zupzup.member.exception.MemberQueryException;
import com.twoez.zupzup.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;
    private final CharacterQueryRepository characterQueryRepository;

    public Long buy(Long itemId, Long memberId){
        Item item = itemRepository.findById(itemId)
                .orElseThrow(ItemNotFoundException::new);
        updateExperience(memberId, item);
        return buyItem(memberId, item);
    }

    private Long buyItem(Long memberId, Item item) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberQueryException(HttpExceptionCode.MEMBER_NOT_FOUND))
                .buyItem(Long.valueOf(item.getPrice()));
    }

    private void updateExperience(Long memberId, Item item) {
        characterQueryRepository.findByMemberId(memberId)
                .orElseThrow(CharacterNotFoundException::new)
                .addExp(item.getExp());
    }

}
