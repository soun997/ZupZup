package com.twoez.zupzup.pet.controller;


import com.twoez.zupzup.global.response.ApiResponse;
import com.twoez.zupzup.member.domain.LoginUser;
import com.twoez.zupzup.pet.controller.dto.response.PetDetailsResponse;
import com.twoez.zupzup.pet.service.PetQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/pets")
public class PetController {

    private final PetQueryService petQueryService;

    @GetMapping
    public ApiResponse<PetDetailsResponse> petDetails(
            @AuthenticationPrincipal LoginUser loginUser) {

        return ApiResponse.ok(
                PetDetailsResponse.of(petQueryService.search(loginUser.getMemberId())));
    }
}
