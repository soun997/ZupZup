package com.twoez.zupzup.item.controlller;

import com.twoez.zupzup.fixture.item.ItemFixture;
import com.twoez.zupzup.item.controller.ItemController;
import com.twoez.zupzup.item.domain.Item;
import com.twoez.zupzup.item.service.ItemQueryService;
import com.twoez.zupzup.support.docs.RestDocsTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentRequest;
import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ItemController.class)
public class ItemControllerTest extends RestDocsTest {

    @MockBean ItemQueryService itemQueryService;

    @Test
    @DisplayName("모든 아이템을 조회한다.")
    void itemList() throws Exception{

        List<Item> items = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            items.add(ItemFixture.DEFAULT.getItem((long) i, "아이템" +" "+i));
        }


        given(
                itemQueryService.searchAll()
        ).willReturn(items);

        ResultActions perform =
                mockMvc.perform(
                        get("/api/v1/items")
                );

        perform.andExpect(status().isOk());

        perform.andDo(print())
                .andDo(
                        document(
                                "item-list",
                                getDocumentRequest(),
                                getDocumentResponse()
                        )
                );
    }

    @Test
    @DisplayName("아이템의 상세정보를 조회한다.")
    void itemDetails() throws Exception{

        Item item = ItemFixture.DEFAULT.getItem(1L, "조회 아이템");

        given(
                itemQueryService.search(1L)
        ).willReturn(item);


        ResultActions perform =
                mockMvc.perform(
                        get("/api/v1/items/{itemId}", 1L)
                                .contentType(MediaType.APPLICATION_JSON)
                );

        perform.andExpect(status().isOk());

        perform.andDo(print())
                .andDo(
                        document(
                                "item-detail",
                                getDocumentRequest(),
                                getDocumentResponse(),
                                pathParameters(
                                        parameterWithName("itemId")
                                                .description("아이템 ID")
                                )
                        )
                );
    }

}
