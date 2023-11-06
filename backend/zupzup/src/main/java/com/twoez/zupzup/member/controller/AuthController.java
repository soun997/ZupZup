package com.twoez.zupzup.member.controller;


import com.twoez.zupzup.config.security.jwt.AuthRequestUser;
import com.twoez.zupzup.config.security.jwt.AuthorizationToken;
import com.twoez.zupzup.config.security.jwt.ExpiredTokenUser;
import com.twoez.zupzup.global.response.ApiResponse;
import com.twoez.zupzup.member.controller.dto.AuthRequest;
import com.twoez.zupzup.member.controller.dto.AuthResponse;
import com.twoez.zupzup.member.controller.dto.ReissueTokenRequest;
import com.twoez.zupzup.member.domain.AuthUser;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.member.service.IdTokenService;
import com.twoez.zupzup.member.service.MemberService;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final IdTokenService idTokenService;
    private final MemberService memberService;

    @PostMapping
    public ApiResponse<AuthResponse> authorizeUser(
            @RequestBody @Validated AuthRequest authRequest) {
        log.info("AuthRequest : {}", authRequest);

        AuthUser authUser = idTokenService.extractAuthUser(authRequest);
        log.info("AuthUser by idToken : {}", authUser);

        // 만약 AuthUser로부터 얻어낸 사용자 정보가 이미 저장되어 있다면 accessToken과 RefreshToken을 발급한다.
        // 새로운 회원이라면 isNewMember->false 로 응답한다.
        Optional<Member> memberOptional = memberService.findMemberByOauth(authUser);

        // TODO : 코드리뷰 받은 대로 리펙토링
        AuthResponse authResponse;
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            // TODO : member로 바꾸기
            if (memberOptional.get().hasHealthInfo()) {
                AuthorizationToken authorizationToken =
                        memberService.issueAuthorizationToken(member.getId());
                authResponse = AuthResponse.from(authorizationToken, member.getId());
            } else {
                log.info("User registered but he or she did not write his/her health info");
                authResponse = AuthResponse.unregisteredUser(member.getId());
            }
        } else {
            Member member = memberService.save(authUser);
            authResponse = AuthResponse.unregisteredUser(member.getId());
        }

        return ApiResponse.ok(authResponse);
    }

    @PostMapping("re-issue")
    public ApiResponse<AuthResponse> reIssueAuthorizationToken(
            @AuthRequestUser ExpiredTokenUser expiredTokenUser,
            @RequestBody @Validated ReissueTokenRequest reissueTokenRequest) {
        log.info(
                "[AuthController] memberId : {} - AuthorizationToken 재발급",
                expiredTokenUser.getMemberId());
        Long memberId = expiredTokenUser.getMemberId();
        AuthorizationToken authorizationToken =
                memberService.reIssueAuthorizationToken(memberId, reissueTokenRequest);
        return ApiResponse.ok(AuthResponse.from(authorizationToken, memberId));
    }
}
