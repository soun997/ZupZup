package com.twoez.zupzup.plogginglog.repository;


import com.twoez.zupzup.plogginglog.domain.TotalPloggingLog;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TotalPloggingLogRepository extends JpaRepository<TotalPloggingLog, Long> {

    Optional<TotalPloggingLog> findByMemberId(Long memberId);
}
