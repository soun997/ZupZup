package com.twoez.zupzup.feedback.repository;


import com.twoez.zupzup.feedback.domain.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    Page<Feedback> findAllByOrderByIdDesc(Pageable pageable);
}
