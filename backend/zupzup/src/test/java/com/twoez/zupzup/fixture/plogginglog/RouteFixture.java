package com.twoez.zupzup.fixture.plogginglog;


import com.twoez.zupzup.plogginglog.controller.dto.request.RouteAddRequest;
import com.twoez.zupzup.plogginglog.domain.Location;
import com.twoez.zupzup.plogginglog.domain.Route;
import java.util.List;
import java.util.stream.IntStream;

public enum RouteFixture {
    DEFAULT;
    private Long id = 1L;
    private List<Location> locations =
            IntStream.range(0, 10)
                    .mapToObj(idx -> Location.of((double) idx, (double) (idx + 1)))
                    .toList();

    public Route getRoute() {
        return new Route(id, locations);
    }

    public RouteAddRequest getRouteAddRequest() {
        return new RouteAddRequest(locations);
    }
}
