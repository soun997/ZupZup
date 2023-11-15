package com.twoez.zupzup.trashcan.service;


import com.twoez.zupzup.trashcan.domain.Trashcan;
import com.twoez.zupzup.trashcan.repository.TrashcanQueryRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TrashcanQueryService {

    private final TrashcanQueryRepository trashcanQueryRepository;

    /**
     * 위 경도에 따른 쓰레기통 조회 캐싱
     * 사용자들 간의 거리가 1km 이내인 경우 cache hit
     * @param latitude
     * @param longitude
     * @return
     */
    @Cacheable(
            cacheNames = "trashcanList", // xml 파일에서 설정해준 alias
            key = "#latitude.toString().substring(5) + '_' + #longitude.toString().substring(5)" // key : "위도_경도", 소수 점 둘쨰 자리 까지
            )
    public List<Trashcan> findByLocationWithCache(BigDecimal latitude, BigDecimal longitude) {
        return trashcanQueryRepository.findByLocation(latitude, longitude);
    }

    public List<Trashcan> findByLocation(BigDecimal latitude, BigDecimal longitude) {
        return findByLocationWithCache(latitude, longitude)
                .stream()
                .filter(target ->
                        isPossible(latitude.doubleValue(), longitude.doubleValue(),
                                target.getLatitude().doubleValue(), target.getLongitude().doubleValue()))
                .collect(Collectors.toList());
    }

    private static boolean isPossible(
            double sourceLatitude, double sourceLongitude, double targetLatitude, double targetLongitude) {
        return calculateDistance(sourceLatitude, sourceLongitude, targetLatitude, targetLongitude) <= 1;
    }

    private static double calculateDistance(
            double sourceLatitude, double sourceLongitude, double targetLatitude, double targetLongitude) {

        // 지구 반지름 (단위: km)
        double earthRadius = 6371;

        // 위도와 경도의 차이
        double dLat = Math.toRadians(targetLatitude - sourceLatitude);
        double dLon = Math.toRadians(targetLongitude - sourceLongitude);

        // Haversine 공식 계산
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(sourceLatitude)) * Math.cos(Math.toRadians(targetLatitude)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // 거리 계산
        double distance = earthRadius * c;

        return distance;
    }
}
