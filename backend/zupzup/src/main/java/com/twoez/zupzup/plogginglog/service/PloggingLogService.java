package com.twoez.zupzup.plogginglog.service;


import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.plogginglog.controller.dto.request.PloggingLogRequest;
import com.twoez.zupzup.plogginglog.domain.PloggingLog;
import com.twoez.zupzup.plogginglog.domain.TotalPloggingLog;
import com.twoez.zupzup.plogginglog.repository.PloggingLogRepository;
import com.twoez.zupzup.plogginglog.repository.TotalPloggingLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PloggingLogService {

    private final PloggingLogRepository ploggingLogRepository;
    private final TotalPloggingLogRepository totalPloggingLogRepository;

    // ploggingLog를 save하거나 totalPloggingLog를 update할 때 오류가 발생한다면 둘 다 rollback 필요
    public PloggingLog add(PloggingLogRequest request, Member member) {

        // TotalPlogginLog가 있으면 가져오고, 없으면 새로 생성
        TotalPloggingLog totalPloggingLog =
                totalPloggingLogRepository
                        .findByMemberId(member.getId())
                        .orElseGet(
                                () ->
                                        totalPloggingLogRepository.save(
                                                TotalPloggingLog.init(member)));

        totalPloggingLog.update(
                request.distance(),
                request.durationTime(),
                request.calories(),
                request.gatheredTrash());

        return ploggingLogRepository.save(request.toEntity(member));
    }
}
