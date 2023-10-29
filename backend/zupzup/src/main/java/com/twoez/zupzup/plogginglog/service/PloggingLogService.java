package com.twoez.zupzup.plogginglog.service;

import com.twoez.zupzup.plogginglog.domain.PloggingLog;
import com.twoez.zupzup.plogginglog.repository.PloggingLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PloggingLogService {

    private final PloggingLogRepository ploggingLogRepository;

    public PloggingLog add(PloggingLog ploggingLog) {

        return ploggingLogRepository.save(ploggingLog);
    }
}
