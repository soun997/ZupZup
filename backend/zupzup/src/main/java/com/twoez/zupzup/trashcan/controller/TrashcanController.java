package com.twoez.zupzup.trashcan.controller;


import com.twoez.zupzup.global.response.HttpResponse;
import com.twoez.zupzup.trashcan.controller.dto.request.TrashcanListRequest;
import com.twoez.zupzup.trashcan.controller.dto.response.TrashcanListResponse;
import com.twoez.zupzup.trashcan.service.TrashcanQueryService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/trashcans")
@RequiredArgsConstructor
public class TrashcanController {

    private final TrashcanQueryService trashcanQueryService;

    @PostMapping
    public HttpResponse<List<TrashcanListResponse>> findByLocation(
            @Validated @RequestBody TrashcanListRequest request) {
        return HttpResponse.okBuild(
                trashcanQueryService
                        .findByLocation(request.currentLatitude(), request.currentLongitude())
                        .stream()
                        .map(TrashcanListResponse::from)
                        .toList());
    }
}
