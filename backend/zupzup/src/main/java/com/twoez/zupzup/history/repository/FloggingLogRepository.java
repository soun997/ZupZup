package com.twoez.zupzup.history.repository;


import com.twoez.zupzup.history.domain.FloggingLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FloggingLogRepository extends JpaRepository<FloggingLog, Long> {}
