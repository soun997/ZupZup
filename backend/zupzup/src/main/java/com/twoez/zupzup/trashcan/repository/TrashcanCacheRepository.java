package com.twoez.zupzup.trashcan.repository;


import com.twoez.zupzup.trashcan.domain.Trashcan;
import java.math.BigDecimal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class TrashcanCacheRepository {
    private final TrashcanQueryRepository trashcanQueryRepository;

    /**
     * 위 경도에 따른 쓰레기통 조회 캐싱 사용자들 간의 거리가 1km 이내인 경우 cache hit
     *
     * @param latitude
     * @param longitude
     * @return
     */
    @Cacheable(
            cacheNames = "trashcanList", // xml 파일에서 설정해준 alias
            key =
                    "#latitude.toString().substring(0, 5) + '_' + #longitude.toString().substring(0, 6)" // key : "위도_경도", 소수 점 둘쨰 자리 까지
            )
    public List<Trashcan> findByLocationWithCache(BigDecimal latitude, BigDecimal longitude) {
        return trashcanQueryRepository.findByLocation(latitude, longitude);
    }
}
