package com.twoez.zupzup.item.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.twoez.zupzup.character.domain.Character;
import com.twoez.zupzup.character.repository.CharacterQueryRepository;
import com.twoez.zupzup.fixture.character.CharacterFixture;
import com.twoez.zupzup.fixture.item.ItemFixture;
import com.twoez.zupzup.fixture.member.MemberFixture;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import com.twoez.zupzup.global.exception.item.CoinNotEnoughException;
import com.twoez.zupzup.item.domain.Item;
import com.twoez.zupzup.item.repository.ItemRepository;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.member.repository.MemberRepository;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ItemServiceTest {
    @Mock ItemRepository itemRepository;
    @Mock MemberRepository memberRepository;
    @Mock CharacterQueryRepository characterQueryRepository;

    @InjectMocks ItemService itemService;

    @Test
    @DisplayName("아이템을 정상 구매 후 캐릭터의 exp가 증가한다.")
    void buyTest() {
        Item item = ItemFixture.DEFAULT.getItem(1L, "구매할 아이템", 10, 30);
        Member member = MemberFixture.DEFAULT.getMember();
        Character character = CharacterFixture.DEFAULT.getCharacter();

        given(itemRepository.findById(any(Long.class))).willReturn(Optional.of(item));
        given(memberRepository.findById(any(Long.class))).willReturn(Optional.of(member));

        given(characterQueryRepository.findByMemberId(any(Long.class)))
                .willReturn(Optional.of(character));

        Long resultCoin = itemService.buy(1L, 1L);

        assertThat(resultCoin).isEqualTo(170L);
        assertThat(member.getCoin()).isEqualTo(170L);
        assertThat(character.getExp()).isEqualTo(60);
        assertThat(character.getLevel()).isEqualTo(1);
    }

    @Test
    @DisplayName("아이템을 정상 구매 후 캐릭터의 레벨과 exp가 변화한다.")
    void levelUpTest() {
        Item item = ItemFixture.DEFAULT.getItem(1L, "구매할 아이템", 80, 30);
        Member member = MemberFixture.DEFAULT.getMember();
        Character character = CharacterFixture.DEFAULT.getCharacter();

        given(itemRepository.findById(any(Long.class))).willReturn(Optional.of(item));
        given(memberRepository.findById(any(Long.class))).willReturn(Optional.of(member));

        given(characterQueryRepository.findByMemberId(any(Long.class)))
                .willReturn(Optional.of(character));

        Long resultCoin = itemService.buy(1L, 1L);

        assertThat(resultCoin).isEqualTo(170L);
        assertThat(member.getCoin()).isEqualTo(170L);
        assertThat(character.getExp()).isEqualTo(30);
        assertThat(character.getLevel()).isEqualTo(2);
    }

    @Test
    @DisplayName("코인이 부족해 아이템을 구매할 수 없다.")
    void buyFailTest() {
        Item item = ItemFixture.DEFAULT.getItem(1L, "구매할 아이템", 80, 1000);
        Member member = MemberFixture.DEFAULT.getMember();
        Character character = CharacterFixture.DEFAULT.getCharacter();

        given(itemRepository.findById(any(Long.class))).willReturn(Optional.of(item));
        given(memberRepository.findById(any(Long.class))).willReturn(Optional.of(member));

        given(characterQueryRepository.findByMemberId(any(Long.class)))
                .willReturn(Optional.of(character));

        CoinNotEnoughException e =
                assertThrows(CoinNotEnoughException.class, () -> itemService.buy(1L, 1L));

        assertThat(e.getExceptionCode()).isEqualTo(HttpExceptionCode.COIN_NOT_ENOUGH);
    }
}
