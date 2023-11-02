package com.twoez.zupzup.item.controlller;

import com.twoez.zupzup.fixture.item.ItemFixture;
import com.twoez.zupzup.item.controller.dto.ItemController;
import com.twoez.zupzup.item.domain.Item;
import com.twoez.zupzup.item.service.ItemQueryService;
import com.twoez.zupzup.support.docs.RestDocsTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentRequest;
import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
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
            items.add(ItemFixture.DEFAULT.getItem("아이템" +" "+i));
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

}
