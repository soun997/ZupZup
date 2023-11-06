package com.twoez.zupzup.plogginglog.service;


import com.twoez.zupzup.global.exception.flogginglog.PloggingLogNotFoundException;
import com.twoez.zupzup.plogginglog.domain.PloggingLog;
import com.twoez.zupzup.plogginglog.repository.PloggingLogQueryRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PloggingLogQueryService {

    private final PloggingLogQueryRepository ploggingLogQueryRepository;

    public List<LocalDate> searchInMonthDistinct(LocalDate date, Long memberId) {
        return ploggingLogQueryRepository.findByMonth(date, memberId).stream()
                .map(ploggingLog -> ploggingLog.getStartDateTime().toLocalDate())
                .distinct()
                .toList();
    }

    public List<PloggingLog> searchInPeriod(
            LocalDateTime startDate, LocalDateTime endDate, Long memberId) {
        return ploggingLogQueryRepository.findByBetweenStartDateAndEndDate(
                startDate, endDate, memberId);
    }

    public List<PloggingLog> searchByDate(LocalDate date, Long memberId) {
        return ploggingLogQueryRepository.findByDate(date, memberId);
    }

    public PloggingLog searchRecentLog(Long memberId) {
        return ploggingLogQueryRepository
                .findOneOrderByDateDesc(memberId)
                .orElseThrow(PloggingLogNotFoundException::new);
    }
}
