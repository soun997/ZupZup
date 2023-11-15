package com.twoez.zupzup.trashcan.service;


import com.twoez.zupzup.trashcan.domain.Trashcan;
import com.twoez.zupzup.trashcan.repository.TrashcanCacheRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class TrashcanQueryService {

    private final TrashcanCacheRepository trashcanCacheRepository;
    private static final int RANGE = 1;

    public List<Trashcan> findByLocation(BigDecimal latitude, BigDecimal longitude) {
        log.info("위치 조회 서비스 호출");
        return trashcanCacheRepository.findByLocationWithCache(latitude, longitude).stream()
                .filter(
                        target ->
                                isNearByTrashcanFromUser(
                                        latitude.doubleValue(),
                                        longitude.doubleValue(),
                                        target.getLatitude().doubleValue(),
                                        target.getLongitude().doubleValue()))
                .collect(Collectors.toList());
    }

    private static boolean isNearByTrashcanFromUser(
            double sourceLatitude,
            double sourceLongitude,
            double targetLatitude,
            double targetLongitude) {
        return calculateDistance(sourceLatitude, sourceLongitude, targetLatitude, targetLongitude)
                <= RANGE;
    }

    private static double calculateDistance(
            double sourceLatitude,
            double sourceLongitude,
            double targetLatitude,
            double targetLongitude) {

        // 지구 반지름 (단위: km)
        double earthRadius = 6371;

        // 위도와 경도의 차이
        double dLat = Math.toRadians(targetLatitude - sourceLatitude);
        double dLon = Math.toRadians(targetLongitude - sourceLongitude);

        // Haversine 공식 계산
        double a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2)
                        + Math.cos(Math.toRadians(sourceLatitude))
                                * Math.cos(Math.toRadians(targetLatitude))
                                * Math.sin(dLon / 2)
                                * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // 거리 계산
        double distance = earthRadius * c;

        return distance;
    }
}
