package com.twoez.zupzup.member.controller;

import com.twoez.zupzup.config.security.jwt.JwtValidator;
import com.twoez.zupzup.global.response.ApiResponse;
import com.twoez.zupzup.member.controller.dto.AuthRequest;
import com.twoez.zupzup.member.controller.dto.AuthResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtValidator jwtValidator;

    public ApiResponse<AuthResponse> authorizeUser(
            @RequestBody @Validated AuthRequest authRequest
    ) {
        // TODO 1: authRequest의 jwt에서 idToken을 가져온다. -> jwtValidator
        // TODO 2: jwt에서 발생할 수 있는 에러에 대해 ControllerAdvice 처리를 한다.
        // TODO 3: IdTokenValidator로 idToken으로부터 OidcUser를 가져온다.
        // TODO 4: 만약 OidcUser로부터 얻어낸 사용자 정보가 이미 저장되어 있다면 accessToken과 RefreshToken을 발급한다.
        // TODO 5: 새로운 회원이라면 isNewMember->false 로 응답한다.

    }

}
