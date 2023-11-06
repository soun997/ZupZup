package com.twoez.zupzup.character.controller;

import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentRequest;
import static com.twoez.zupzup.support.docs.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.twoez.zupzup.character.domain.Character;
import com.twoez.zupzup.character.service.CharacterQueryService;
import com.twoez.zupzup.fixture.character.CharacterFixture;
import com.twoez.zupzup.member.domain.LoginUser;
import com.twoez.zupzup.support.docs.RestDocsTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.ResultActions;

@WebMvcTest(CharacterController.class)
public class CharacterControllerTest extends RestDocsTest {

    @MockBean CharacterQueryService characterQueryService;

    @Test
    @DisplayName("사용자는 본인의 캐릭터를 조회할 수 있다.")
    void characterDetailsTest() throws Exception {

        Character character = CharacterFixture.DEFAULT.getCharacter();

        given(characterQueryService.search(any(LoginUser.class))).willReturn(character);

        ResultActions perform = mockMvc.perform(get("/api/v1/characters"));

        perform.andExpect(status().isOk());

        perform.andDo(print())
                .andDo(document("character-details", getDocumentRequest(), getDocumentResponse()));
    }
}
