package com.twoez.zupzup.plogginglog.controller.dto.request;

import com.twoez.zupzup.plogginglog.domain.Location;
import com.twoez.zupzup.plogginglog.domain.Route;
import jakarta.validation.Valid;
import java.util.List;

// TODO: List를 검증하기 위한 custom validation 구현
public record RouteAddRequest(
        @Valid List<Location> locations) {

    public Route toDocument(Long ploggingLogId) {
        return new Route(ploggingLogId, locations);
    }
}
