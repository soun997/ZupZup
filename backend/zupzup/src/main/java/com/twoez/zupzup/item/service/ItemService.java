package com.twoez.zupzup.item.service;

import com.twoez.zupzup.character.domain.Character;
import com.twoez.zupzup.character.repository.CharacterQueryRepository;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import com.twoez.zupzup.global.exception.character.CharacterNotFoundException;
import com.twoez.zupzup.global.exception.item.CoinNotEnoughException;
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
    private final CharacterQueryRepository characterQueryRepository;

    public Long buy(Long itemId, Long memberId){
        // 아이템 구매 가격 알아오기
        Item item = itemRepository.findById(itemId)
                .orElseThrow(ItemNotFoundException::new);

        // 구매 가능 여부 확인
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberQueryException(HttpExceptionCode.MEMBER_NOT_FOUND));


        if(member.getCoin() <(long) item.getPrice()){
            throw new CoinNotEnoughException(HttpExceptionCode.COIN_NOT_ENOUGH);
        }

        // 캐릭터 exp , 레벨 증가
        Character character = characterQueryRepository.findByMemberId(memberId)
                .orElseThrow(CharacterNotFoundException::new);

        character.addExp(item.getExp());

        // 멤버 코인 차감
        return member.payCoin(item.getPrice());

    }

}
