package com.twoez.zupzup.plogginglog.service;

import static com.twoez.zupzup.global.exception.HttpExceptionCode.MEMBER_NOT_FOUND;

import com.twoez.zupzup.global.exception.plogginglog.TotalPloggingLogNotFoundException;
import com.twoez.zupzup.global.exception.plogginglog.TotalTrashNotFoundException;
import com.twoez.zupzup.global.exception.plogginglog.TrashNotFoundException;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.member.exception.MemberQueryException;
import com.twoez.zupzup.member.repository.MemberRepository;
import com.twoez.zupzup.plogginglog.controller.dto.request.LogRequest;
import com.twoez.zupzup.plogginglog.domain.PloggingLog;
import com.twoez.zupzup.plogginglog.domain.TotalPloggingLog;
import com.twoez.zupzup.plogginglog.domain.TotalTrash;
import com.twoez.zupzup.plogginglog.domain.Trash;
import com.twoez.zupzup.plogginglog.repository.PloggingLogRepository;
import com.twoez.zupzup.plogginglog.repository.TotalPloggingLogRepository;
import com.twoez.zupzup.plogginglog.repository.TotalTrashRepository;
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
    private final TotalTrashRepository totalTrashRepository;

    // ploggingLog를 save하거나 totalPloggingLog를 update할 때 오류가 발생한다면 둘 다 rollback 필요
    public PloggingLog add(LogRequest request, Long memberId) {

        Member member =
                memberRepository
                        .findById(memberId)
                        .orElseThrow(() -> new MemberQueryException(MEMBER_NOT_FOUND));

        PloggingLog ploggingLog = ploggingLogSave(request, member);
        Trash trash = trashSave(request, ploggingLog);

        member.updateCoins(ploggingLog.getCoin());

        totalPloggingLogUpdate(memberId, ploggingLog);
        totalTrashUpdate(memberId, trash);

        return ploggingLog;
    }

    private void totalPloggingLogUpdate(Long memberId, PloggingLog ploggingLog) {
        // TotalPlogginLog가 있으면 가져오고, 없으면 새로 생성
        TotalPloggingLog totalPloggingLog =
                totalPloggingLogRepository
                        .findByMemberId(memberId)
                        .orElseThrow(TotalPloggingLogNotFoundException::new);

        totalPloggingLog.update(
                ploggingLog.getDistance(),
                ploggingLog.getDurationTime(),
                ploggingLog.getCalories(),
                ploggingLog.getGatheredTrash());
    }

    private void totalTrashUpdate(Long memberId, Trash trash) {
        TotalTrash totalTrash =
                totalTrashRepository
                        .findByMemberId(memberId)
                        .orElseThrow(TotalTrashNotFoundException::new);

        totalTrash.update(
                trash.getPlastic(),
                trash.getCigarette(),
                trash.getCan(),
                trash.getGlass(),
                trash.getNormal(),
                trash.getStyrofoam(),
                trash.getMetal(),
                trash.getClothes(),
                trash.getBattery(),
                trash.getVinyl(),
                trash.getPaper(),
                trash.getMixed(),
                trash.getFood(),
                trash.getEtc());
    }

    private Trash trashSave(LogRequest request, PloggingLog ploggingLog) {
        return trashRepository.save(request.trashRequest().toEntity(ploggingLog));
    }

    public Trash searchTrashByPloggingLogId(Long ploggingLogId) {
        return trashRepository
                .findByPloggingLogId(ploggingLogId)
                .orElseThrow(TrashNotFoundException::new);
    }

    private PloggingLog ploggingLogSave(LogRequest request, Member member) {
        return ploggingLogRepository.save(request.ploggingLogRequest().toEntity(member));
    }
}
