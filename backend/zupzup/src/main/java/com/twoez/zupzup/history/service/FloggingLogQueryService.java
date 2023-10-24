package com.twoez.zupzup.history.service;


import com.twoez.zupzup.history.domain.FloggingLog;
import com.twoez.zupzup.history.repository.FloggingLogQueryRepository;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FloggingLogQueryService {

    private final FloggingLogQueryRepository floggingLogQueryRepository;

    public List<FloggingLog> searchInPeriod(LocalDateTime startDate, LocalDateTime endDate,
            Long memberId) {
        return floggingLogQueryRepository.findByBetweenStartDateAndEndDate(startDate, endDate,
                memberId);
    }

    public List<FloggingLog> searchByDate(LocalDate date, Long memberId) {
        return floggingLogQueryRepository.findByDate(date, memberId);
    }

    public FloggingLog searchRecentLog(Long memberId) {
        return floggingLogQueryRepository.findOneOrderByDateDesc(memberId)
                .orElseThrow(EntityNotFoundException::new);
    }
}
