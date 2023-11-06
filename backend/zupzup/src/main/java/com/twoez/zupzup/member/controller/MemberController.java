package com.twoez.zupzup.member.controller;


import com.twoez.zupzup.config.security.jwt.AuthorizationToken;
import com.twoez.zupzup.global.response.ApiResponse;
import com.twoez.zupzup.member.controller.dto.MemberHealthCreateResponse;
import com.twoez.zupzup.member.controller.dto.RegisterMemberRequest;
import com.twoez.zupzup.member.domain.LoginUser;
import com.twoez.zupzup.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api/v1/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PutMapping("/register")
    public ApiResponse<MemberHealthCreateResponse> register(
            @RequestBody RegisterMemberRequest registerMemberRequest) {
        log.info("register called!!");
        log.info("request : {}", registerMemberRequest);
        Long requestedMemberId = registerMemberRequest.memberId();
        memberService.modifyMemberHealth(registerMemberRequest);
        memberService.validateMember(requestedMemberId);
        AuthorizationToken authorizationToken =
                memberService.issueAuthorizationToken(requestedMemberId);

        return ApiResponse.ok(
                MemberHealthCreateResponse.from(authorizationToken, requestedMemberId));
    }

    @PostMapping("/logout")
    public ApiResponse<String> logout(@AuthenticationPrincipal LoginUser loginUser) {
        memberService.logout(loginUser.memberId());
        return ApiResponse.status(HttpStatus.OK).build();
    }

    @GetMapping("/test")
    public ApiResponse<String> testtest(@AuthenticationPrincipal LoginUser loginUser) {
        log.info("test called!!");
        log.info("login user : {}", loginUser);
        return ApiResponse.ok("test success");
    }
}
