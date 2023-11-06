package com.twoez.zupzup.plogginglog.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.twoez.zupzup.fixture.member.MemberFixture;
import com.twoez.zupzup.fixture.plogginglog.PloggingLogFixture;
import com.twoez.zupzup.global.exception.flogginglog.PloggingLogNotFoundException;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.plogginglog.domain.PloggingLog;
import com.twoez.zupzup.plogginglog.repository.PloggingLogQueryRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class PloggingLogQueryServiceTest {

    @Mock PloggingLogQueryRepository ploggingLogQueryRepository;
    @InjectMocks PloggingLogQueryService ploggingLogQueryService;

    Member member = MemberFixture.DEFAULT.getMember();

    @Test
    @DisplayName("특정 월의 플로깅 로그들을 가져온다.")
    void searchInMonth() {
        LocalDateTime now = LocalDateTime.now();
        PloggingLog ploggingLog1 =
                PloggingLogFixture.DEFAULT.getPloggingLogWithPeriod(now, now.plusDays(2), member);
        PloggingLog ploggingLog2 =
                PloggingLogFixture.DEFAULT.getPloggingLogWithPeriod(now, now.plusHours(2), member);
        PloggingLog ploggingLog3 =
                PloggingLogFixture.DEFAULT.getPloggingLogWithPeriod(
                        now.plusDays(1), now.plusDays(2), member);
        given(ploggingLogQueryRepository.findByMonth(any(LocalDate.class), any(Long.class)))
                .willReturn(List.of(ploggingLog1, ploggingLog2, ploggingLog3));

        List<LocalDate> localDates =
                ploggingLogQueryService.searchInMonthDistinct(now.toLocalDate(), member.getId());

        assertThat(localDates).hasSize(2);
        assertThat(localDates.get(0).getMonth()).isEqualTo(LocalDate.now().getMonth());
        assertThat(localDates.get(1).getMonth()).isEqualTo(LocalDate.now().getMonth());
    }

    @Test
    @DisplayName("기간 내의 플로깅 로그들을 가져온다.")
    void searchInPeriod() {
        LocalDateTime now = LocalDateTime.now();
        PloggingLog ploggingLog =
                PloggingLogFixture.DEFAULT.getPloggingLogWithPeriod(now, now.plusDays(2), member);
        given(
                        ploggingLogQueryRepository.findByBetweenStartDateAndEndDate(
                                any(LocalDateTime.class),
                                any(LocalDateTime.class),
                                any(Long.class)))
                .willReturn(List.of(ploggingLog));

        List<PloggingLog> ploggingLogs =
                ploggingLogQueryService.searchInPeriod(
                        LocalDateTime.now(), LocalDateTime.now().plusDays(2), member.getId());

        assertThat(ploggingLogs).containsExactly(ploggingLog);
    }

    @Test
    @DisplayName("특정 일의 플로깅 로그들을 가져온다.")
    void searchByDate() {
        LocalDateTime now = LocalDateTime.now();
        PloggingLog ploggingLog =
                PloggingLogFixture.DEFAULT.getPloggingLogWithPeriod(now, now.plusDays(2), member);
        given(ploggingLogQueryRepository.findByDate(any(LocalDate.class), any(Long.class)))
                .willReturn(List.of(ploggingLog));

        List<PloggingLog> ploggingLogs =
                ploggingLogQueryService.searchByDate(LocalDate.now(), member.getId());

        assertThat(ploggingLogs).containsExactly(ploggingLog);
    }

    @Test
    @DisplayName("최근 플로깅 로그를 가져온다.")
    void searchRecent() {
        LocalDateTime now = LocalDateTime.now();
        PloggingLog ploggingLog =
                PloggingLogFixture.DEFAULT.getPloggingLogWithPeriod(now, now.plusDays(2), member);
        given(ploggingLogQueryRepository.findOneOrderByDateDesc(any(Long.class)))
                .willReturn(Optional.ofNullable(ploggingLog));

        PloggingLog findPloggingLog = ploggingLogQueryService.searchRecentLog(member.getId());

        assertThat(findPloggingLog).isEqualTo(ploggingLog);
    }

    @Test
    @DisplayName("최근 플로깅 로그가 없으면 예외가 발생한다")
    void ifNotExistsRecentPloggingLogThrowsPloggingNotFoundException() {
        given(ploggingLogQueryRepository.findOneOrderByDateDesc(any(Long.class)))
                .willReturn(Optional.empty());

        assertThatThrownBy(() -> ploggingLogQueryService.searchRecentLog(member.getId()))
                .isInstanceOf(PloggingLogNotFoundException.class);
    }
}
