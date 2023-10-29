package com.twoez.zupzup.plogginglog.controller.dto.response;


import com.twoez.zupzup.plogginglog.domain.Location;
import com.twoez.zupzup.plogginglog.domain.Route;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record RouteResponse(@NotNull List<Location> locations) {

    public static RouteResponse from(Route route) {

        return new RouteResponse(route.getLocations());
    }
}
