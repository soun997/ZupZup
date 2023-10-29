package com.twoez.zupzup.plogginglog.controller.dto.response;


import com.twoez.zupzup.plogginglog.domain.Location;
import com.twoez.zupzup.plogginglog.domain.Route;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record RouteDetailsResponse(@NotNull List<Location> locations) {

    public static RouteDetailsResponse from(Route route) {

        return new RouteDetailsResponse(route.getLocations());
    }
}
