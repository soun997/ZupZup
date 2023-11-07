package com.twoez.zupzup.plogginglog.service;

import static com.twoez.zupzup.global.exception.HttpExceptionCode.MEMBER_NOT_FOUND;

import com.twoez.zupzup.global.exception.flogginglog.TotalPloggingLogNotFoundException;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.member.exception.MemberQueryException;
import com.twoez.zupzup.member.repository.MemberRepository;
import com.twoez.zupzup.plogginglog.controller.dto.request.LogRequest;
import com.twoez.zupzup.plogginglog.controller.dto.request.PloggingLogRequest;
import com.twoez.zupzup.plogginglog.controller.dto.request.TrashRequest;
import com.twoez.zupzup.plogginglog.domain.PloggingLog;
import com.twoez.zupzup.plogginglog.domain.TotalPloggingLog;
import com.twoez.zupzup.plogginglog.repository.PloggingLogRepository;
import com.twoez.zupzup.plogginglog.repository.TotalPloggingLogRepository;
import com.twoez.zupzup.plogginglog.repository.TrashRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PloggingLogService {

    private final PloggingLogRepository ploggingLogRepository;
    private final TotalPloggingLogRepository totalPloggingLogRepository;
    private final MemberRepository memberRepository;
    private final TrashRepository trashRepository;

    // ploggingLog를 save하거나 totalPloggingLog를 update할 때 오류가 발생한다면 둘 다 rollback 필요
    public PloggingLog add(LogRequest request, Long memberId) {

        Member member =
                memberRepository
                        .findById(memberId)
                        .orElseThrow(() -> new MemberQueryException(MEMBER_NOT_FOUND));

        PloggingLogRequest ploggingLogRequest = request.ploggingLogRequest();

        PloggingLog ploggingLog = ploggingLogRepository.save(ploggingLogRequest.toEntity(member));

        TrashRequest trashRequest = request.trashRequest();

        // 쓰레기 저장
        trashRepository.save(trashRequest.toEntity(ploggingLog));

        member.updateCoins(ploggingLogRequest.coin());

        // TotalPlogginLog가 있으면 가져오고, 없으면 새로 생성
        TotalPloggingLog totalPloggingLog =
                totalPloggingLogRepository
                        .findByMemberId(memberId)
                        .orElseThrow(TotalPloggingLogNotFoundException::new);
        totalPloggingLog.update(
                ploggingLogRequest.distance(),
                ploggingLogRequest.durationTime(),
                ploggingLogRequest.calories(),
                ploggingLogRequest.gatheredTrash());

        return ploggingLog;
    }
}
