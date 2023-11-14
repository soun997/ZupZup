package com.twoez.zupzup.plogging.controller;


import com.twoez.zupzup.global.response.HttpResponse;
import com.twoez.zupzup.member.domain.LoginUser;
import com.twoez.zupzup.plogging.controller.dto.PloggerResponse;
import com.twoez.zupzup.plogging.service.PloggingService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/ploggings")
public class PloggingController {

    private final PloggingService ploggingService;

    @PostMapping("/start")
    public HttpResponse<PloggerResponse> ploggerAdd(@AuthenticationPrincipal LoginUser loginUser) {
        return HttpResponse.okBuild(
                (PloggerResponse.from(ploggingService.add(loginUser.getMemberId()))));
    }

    @DeleteMapping("/finish")
    public HttpResponse<PloggerResponse> ploggerRemove(
            @AuthenticationPrincipal LoginUser loginUser) {

        return HttpResponse.okBuild(
                PloggerResponse.from(ploggingService.remove(loginUser.getMemberId())));
    }

    @GetMapping("/number-of-users")
    public HttpResponse<PloggerResponse> ploggerCount() {

        return HttpResponse.okBuild(PloggerResponse.from(ploggingService.count()));
    }
}
