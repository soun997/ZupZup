package com.twoez.zupzup.trashcan.controller;

import com.twoez.zupzup.global.response.ApiResponse;
import com.twoez.zupzup.trashcan.controller.dto.request.TrashcanListRequest;
import com.twoez.zupzup.trashcan.controller.dto.response.TrashcanListResponse;
import com.twoez.zupzup.trashcan.service.TrashcanQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/trashcans")
@RequiredArgsConstructor
public class TrashcanController {

    private final TrashcanQueryService trashcanQueryService;

    @GetMapping
    public ApiResponse<List<TrashcanListResponse>> findByLocation(
            @RequestBody TrashcanListRequest request){
        return ApiResponse.ok(
                trashcanQueryService.findByLocation(request.currentLatitude(), request.currentLongitude())
                        .stream()
                        .map(TrashcanListResponse::from)
                        .toList());
    }

}
