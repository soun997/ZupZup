package com.twoez.zupzup.item.service;

import com.twoez.zupzup.character.domain.Character;
import com.twoez.zupzup.character.repository.CharacterQueryRepository;
import com.twoez.zupzup.character.repository.CharacterRepository;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import com.twoez.zupzup.global.exception.character.CharacterNotFoundException;
import com.twoez.zupzup.global.exception.item.ItemNotFoundException;
import com.twoez.zupzup.item.domain.Item;
import com.twoez.zupzup.item.repository.ItemRepository;
import com.twoez.zupzup.member.domain.Member;
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
    private final CharacterRepository characterRepository;
    private final CharacterQueryRepository characterQueryRepository;

    public void buy(Long itemId, Long memberId){
        // 아이템 구매 가격 알아오기
        Item item = itemRepository.findById(itemId)
                .orElseThrow(ItemNotFoundException::new);

        // 멤버 코인 차감
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberQueryException(HttpExceptionCode.MEMBER_NOT_FOUND));

        Long coin = member.payCoin(item.getPrice());
        
        // Todo: 멤버의 코인으로 살 수 있는지 확인 과정 필요

        // 캐릭터 exp 증가
        Character character = characterQueryRepository.findByMemberId(memberId)
                .orElseThrow(CharacterNotFoundException::new);

        // Todo: exp 증가, 레벨 증가 필요



        return;
    }

}
