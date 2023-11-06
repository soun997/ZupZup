package com.twoez.zupzup.character.controller;


import com.twoez.zupzup.character.controller.dto.response.CharacterDetailsResponse;
import com.twoez.zupzup.character.service.CharacterQueryService;
import com.twoez.zupzup.global.response.ApiResponse;
import com.twoez.zupzup.member.domain.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/characters")
public class CharacterController {

    private final CharacterQueryService characterQueryService;

    @GetMapping
    public ApiResponse<CharacterDetailsResponse> characterDetails(
            @AuthenticationPrincipal LoginUser loginUser) {

        return ApiResponse.ok(CharacterDetailsResponse.of(characterQueryService.search(loginUser)));
    }
}
