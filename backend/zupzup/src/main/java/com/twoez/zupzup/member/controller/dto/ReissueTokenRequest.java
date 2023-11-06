package com.twoez.zupzup.member.controller.dto;

import jakarta.validation.constraints.NotBlank;

public record ReissueTokenRequest(@NotBlank String refreshToken) {


}
