package com.twoez.zupzup.history.repository;


import com.twoez.zupzup.history.domain.PloggingLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PloggingLogRepository extends JpaRepository<PloggingLog, Long> {}
