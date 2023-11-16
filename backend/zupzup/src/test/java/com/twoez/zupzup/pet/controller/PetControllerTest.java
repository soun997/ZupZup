package com.twoez.zupzup.pet.controller;

import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentRequest;
import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.twoez.zupzup.fixture.pet.PetFixture;
import com.twoez.zupzup.pet.domain.Pet;
import com.twoez.zupzup.pet.service.PetQueryService;
import com.twoez.zupzup.support.docs.RestDocsTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.ResultActions;

@WebMvcTest(PetController.class)
public class PetControllerTest extends RestDocsTest {

    @MockBean PetQueryService petQueryService;

    @Test
    @DisplayName("사용자는 본인의 펫을 조회할 수 있다.")
    void petDetailsTest() throws Exception {

        Pet pet = PetFixture.DEFAULT.getCharacter();

        given(petQueryService.search(any(Long.class))).willReturn(pet);

        ResultActions perform = mockMvc.perform(get("/api/v1/pets"));

        perform.andExpect(status().isOk());

        perform.andDo(print())
                .andDo(document("pet-details", getDocumentRequest(), getDocumentResponse()));
    }
}
