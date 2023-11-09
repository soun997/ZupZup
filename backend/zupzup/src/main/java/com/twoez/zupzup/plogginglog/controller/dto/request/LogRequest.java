package com.twoez.zupzup.plogginglog.controller.dto.request;


import jakarta.validation.constraints.NotNull;

public record LogRequest(
        @NotNull PloggingLogRequest ploggingLogRequest, @NotNull TrashRequest trashRequest) {}
