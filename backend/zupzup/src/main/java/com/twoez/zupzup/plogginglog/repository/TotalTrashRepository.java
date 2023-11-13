package com.twoez.zupzup.plogginglog.repository;


import com.twoez.zupzup.plogginglog.domain.TotalTrash;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TotalTrashRepository extends JpaRepository<TotalTrash, Long> {
    Optional<TotalTrash> findByMemberId(Long memberId);
}
