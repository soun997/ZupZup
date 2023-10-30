package com.twoez.zupzup.plogginglog.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.twoez.zupzup.fixture.member.MemberFixture;
import com.twoez.zupzup.fixture.plogginglog.PloggingLogFixture;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.member.repository.MemberRepository;
import com.twoez.zupzup.plogginglog.domain.PloggingLog;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class PloggingLogQueryRepositoryTest {

    @Autowired PloggingLogQueryRepository ploggingLogQueryRepository;
    @Autowired PloggingLogRepository ploggingLogRepository;
    @Autowired MemberRepository memberRepository;
    Member member;

    @BeforeEach
    void initObjects() {
        this.member = memberRepository.save(MemberFixture.NONE_ID.getMember());
    }

    @Test
    @DisplayName("기간 내의 플로깅 로그들을 조회한다.")
    void searchInPeriod() {
        LocalDateTime now = LocalDateTime.now();
        ploggingLogRepository.save(
                PloggingLogFixture.DEFAULT.getPloggingLogWithPeriod(now, now.plusHours(1), member));

        LocalDateTime startDate = now.minusDays(1);
        LocalDateTime endDate = now.plusDays(2);
        List<PloggingLog> ploggingLogs =
                ploggingLogQueryRepository.findByBetweenStartDateAndEndDate(
                        startDate, endDate, member.getId());

        assertThat(ploggingLogs).hasSize(1);
        assertThat(ploggingLogs.get(0).getStartDateTime()).isAfter(startDate);
        assertThat(ploggingLogs.get(0).getEndDateTime()).isBefore(endDate);
    }

    @Test
    @DisplayName("특정 일의 플로깅 로그들을 가져온다.")
    void searchByDate() {
        LocalDateTime now = LocalDateTime.now();
        ploggingLogRepository.save(
                PloggingLogFixture.DEFAULT.getPloggingLogWithPeriod(now, now.plusDays(2), member));

        LocalDate date = now.toLocalDate();
        List<PloggingLog> ploggingLogs =
                ploggingLogQueryRepository.findByDate(date, member.getId());

        assertThat(ploggingLogs).hasSize(1);
        assertThat(ploggingLogs.get(0).getStartDateTime().toLocalDate()).isEqualTo(date);
    }

    @Test
    @DisplayName("최근 플로깅 로그를 조회한다.")
    void searchRecent() {
        LocalDateTime now = LocalDateTime.now();
        ploggingLogRepository.save(
                PloggingLogFixture.DEFAULT.getPloggingLogWithPeriod(now, now.plusHours(1), member));

        Optional<PloggingLog> findPloggingLog =
                ploggingLogQueryRepository.findOneOrderByDateDesc(member.getId());

        assertThat(findPloggingLog).isNotEmpty();
    }
}
