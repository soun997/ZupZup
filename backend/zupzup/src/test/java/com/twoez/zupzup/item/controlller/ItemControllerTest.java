package com.twoez.zupzup.item.controlller;

import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentRequest;
import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.twoez.zupzup.fixture.item.ItemFixture;
import com.twoez.zupzup.fixture.member.MemberFixture;
import com.twoez.zupzup.global.exception.item.CoinNotEnoughException;
import com.twoez.zupzup.global.exception.item.ItemNotFoundException;
import com.twoez.zupzup.item.controller.ItemController;
import com.twoez.zupzup.item.domain.Item;
import com.twoez.zupzup.item.service.ItemQueryService;
import com.twoez.zupzup.item.service.ItemService;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.support.docs.RestDocsTest;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

@WebMvcTest(ItemController.class)
class ItemControllerTest extends RestDocsTest {

    @MockBean ItemQueryService itemQueryService;
    @MockBean ItemService itemService;

    @Test
    @DisplayName("모든 아이템을 조회한다.")
    void itemListTest() throws Exception {

        List<Item> items = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            items.add(ItemFixture.DEFAULT.getItem((long) i, "아이템" + " " + i));
        }

        given(itemQueryService.searchAll()).willReturn(items);

        ResultActions perform = mockMvc.perform(get("/api/v1/items"));

        perform.andExpect(status().isOk());

        perform.andDo(print())
                .andDo(document("item-list", getDocumentRequest(), getDocumentResponse()));
    }

    @Test
    @DisplayName("아이템의 상세정보를 조회한다.")
    void itemDetailsTest() throws Exception {

        Item item = ItemFixture.DEFAULT.getItem(1L, "조회 아이템");

        given(itemQueryService.search(1L)).willReturn(item);

        ResultActions perform =
                mockMvc.perform(
                        get("/api/v1/items/{itemId}", 1L).contentType(MediaType.APPLICATION_JSON));

        perform.andExpect(status().isOk());

        perform.andDo(print())
                .andDo(
                        document(
                                "item-detail",
                                getDocumentRequest(),
                                getDocumentResponse(),
                                pathParameters(parameterWithName("itemId").description("아이템 ID"))));
    }

    @Test
    @DisplayName("아이템을 구매한다.")
    void itemBuyTest() throws Exception {

        Item item = ItemFixture.DEFAULT.getItem(1L, "구매할 아이템");
        Member member = MemberFixture.DEFAULT.getMember();

        given(itemService.buy(item.getId(), member.getId())).willReturn(170L);

        ResultActions perform =
                mockMvc.perform(
                        patch("/api/v1/items/buy")
                                .queryParam("itemId", "1")
                                .contentType(MediaType.APPLICATION_JSON));

        perform.andExpect(status().isOk()).andExpect(jsonPath("$.results.coin").value(170L));

        perform.andDo(print())
                .andDo(
                        document(
                                "item-buy",
                                getDocumentRequest(),
                                getDocumentResponse(),
                                queryParameters(
                                        parameterWithName("itemId").description("아이템 아이디"))));
    }

    @Test
    @DisplayName("아이템을 조회할 수 없다.")
    void itemBuySearchFailTest() throws Exception {
        given(itemService.buy(any(Long.class), any(Long.class)))
                .willThrow(new ItemNotFoundException());

        ResultActions perform =
                mockMvc.perform(
                        patch("/api/v1/items/buy")
                                .queryParam("itemId", "1")
                                .contentType(MediaType.APPLICATION_JSON));

        perform.andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.results.errorCode").value("ERR_ITEM_001"))
                .andExpect(jsonPath("$.results.message").value("아이템을 찾을 수 없습니다."));

        perform.andDo(print())
                .andDo(
                        document(
                                "item-buy-search-fail",
                                getDocumentRequest(),
                                getDocumentResponse(),
                                queryParameters(
                                        parameterWithName("itemId").description("아이템 아이디"))));
    }

    @Test
    @DisplayName("코인이 부족해 아이템을 구매할 수 없다.")
    void itemBuyFailTest() throws Exception {
        given(itemService.buy(any(Long.class), any(Long.class)))
                .willThrow(new CoinNotEnoughException());

        ResultActions perform =
                mockMvc.perform(
                        patch("/api/v1/items/buy")
                                .queryParam("itemId", "1")
                                .contentType(MediaType.APPLICATION_JSON));

        perform.andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.results.errorCode").value("ERR_ITEM_002"))
                .andExpect(jsonPath("$.results.message").value("코인이 충분하지 않습니다."));

        perform.andDo(print())
                .andDo(
                        document(
                                "item-buy-fail",
                                getDocumentRequest(),
                                getDocumentResponse(),
                                queryParameters(
                                        parameterWithName("itemId").description("아이템 아이디"))));
    }
}
