package com.twoez.zupzup.item;

import com.twoez.zupzup.item.controller.ItemController;
import com.twoez.zupzup.item.domain.Item;
import com.twoez.zupzup.item.repository.ItemRepository;
import com.twoez.zupzup.member.domain.Gender;
import com.twoez.zupzup.member.domain.LoginUser;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.member.domain.Oauth;
import com.twoez.zupzup.member.domain.OauthProvider;
import com.twoez.zupzup.member.domain.Role;
import com.twoez.zupzup.member.repository.MemberRepository;
import com.twoez.zupzup.pet.domain.Pet;
import com.twoez.zupzup.pet.repository.PetRepository;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ItemIntegrationTest {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private PetRepository petRepository;
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private ItemController itemController;

    private static Logger log = LoggerFactory.getLogger(ItemIntegrationTest.class);

    Member member;
    Pet pet;
    Item item;
    LoginUser loginUser;

    @BeforeEach
    void setup() {
        member = createMember();
        memberRepository.save(member);
        pet = Pet.init(member);
        petRepository.save(pet);
        item = createItem();
        itemRepository.save(item);
        loginUser = new LoginUser(member, null, null);
    }

    @Test
    @DisplayName("아이템 구매 요청이 동시에 들어오더라도 이를 순차적으로 처리한다.")
    void itemBuyDuplicateTest() throws InterruptedException {

        int numberOfThreads = Runtime.getRuntime().availableProcessors();
        log.info("쓰레드 개수: {}", numberOfThreads);
        ExecutorService executorService = Executors.newFixedThreadPool(numberOfThreads);
        CountDownLatch latch = new CountDownLatch(numberOfThreads);

        for (int i = 0; i < numberOfThreads; i++) {
            executorService.execute(() -> {
                try {
                    itemController.itemBuy(item.getId(), loginUser);
                } finally {
                    latch.countDown();
                }
            });
        }
        latch.await();

        member = memberRepository.findById(member.getId()).get();
        pet = petRepository.findById(pet.getId()).get();
        Assertions.assertThat(member.getCoin()).isEqualTo(10000 - numberOfThreads * item.getPrice());
        Assertions.assertThat(pet.getExp()).isEqualTo(numberOfThreads * item.getExp());
    }
    private Member createMember() {

        OauthProvider oauthProvider = OauthProvider.KAKAO;
        return Member.builder()
                .oauth(new Oauth(oauthProvider, "soyun1234"))
                .name("소윤팤")
                .gender(Gender.F)
                .birthYear(2000)
                .height(158)
                .weight(60)
                .coin(10000L)
                .role(List.of(Role.ROLE_USER))
                .isDeleted(false)
                .build();
    }

    private Item createItem() {

        return Item.builder()
                .name("꽃게")
                .description("꽃게 먹고... 꼭 깨!")
                .exp(1)
                .price(100L)
                .itemImgUrl("/image.png")
                .isDeleted(false)
                .build();
    }
}
