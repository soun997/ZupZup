package com.twoez.zupzup.plogginglog.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.twoez.zupzup.fixture.member.MemberFixture;
import com.twoez.zupzup.fixture.plogginglog.PloggingLogFixture;
import com.twoez.zupzup.fixture.plogginglog.TotalPloggingLogFixture;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.member.repository.MemberRepository;
import com.twoez.zupzup.plogginglog.controller.dto.request.LogRequest;
import com.twoez.zupzup.plogginglog.controller.dto.request.PloggingLogRequest;
import com.twoez.zupzup.plogginglog.controller.dto.request.TrashRequest;
import com.twoez.zupzup.plogginglog.domain.PloggingLog;
import com.twoez.zupzup.plogginglog.domain.TotalPloggingLog;
import com.twoez.zupzup.plogginglog.repository.PloggingLogRepository;
import com.twoez.zupzup.plogginglog.repository.TotalPloggingLogRepository;
import com.twoez.zupzup.plogginglog.repository.TrashRepository;
import java.time.LocalDateTime;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class PloggingLogServiceTest {

    @Mock PloggingLogRepository ploggingLogRepository;
    @Mock TotalPloggingLogRepository totalPloggingLogRepository;
    @Mock MemberRepository memberRepository;
    @Mock TrashRepository trashRepository;
    @InjectMocks PloggingLogService ploggingLogService;

    PloggingLogRequest ploggingLogRequest =
            new PloggingLogRequest(
                    10,
                    LocalDateTime.of(2023, 10, 30, 0, 0),
                    LocalDateTime.of(2023, 10, 30, 2, 0),
                    7200,
                    600,
                    50,
                    200,
                    "https://image.com");
    TrashRequest trashRequest = new TrashRequest(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);

    LogRequest request = new LogRequest(ploggingLogRequest, trashRequest);

    @Test
    @DisplayName("플로깅 기록을 저장한다.")
    void addPloggingLogTest() {

        Member member = MemberFixture.DEFAULT.getMember();
        TotalPloggingLog total = TotalPloggingLogFixture.DEFAULT.getTotalPloggingLog();
        PloggingLog ploggingLog = PloggingLogFixture.DEFAULT.getPloggingLog();

        given(memberRepository.findById(any(Long.class))).willReturn(Optional.of(member));
        given(totalPloggingLogRepository.findByMemberId(any(Long.class)))
                .willReturn(Optional.of(total));
        given(ploggingLogRepository.save(any(PloggingLog.class))).willReturn(ploggingLog);

        PloggingLog result = ploggingLogService.add(request, any(Long.class));

        assertThat(result).isEqualTo(ploggingLog);
    }

    @Test
    @DisplayName("플로깅 기록을 저장할 때, 사용자 보유 코인을 증가시킨다.")
    void updateMemberCoinTest() {

        Member originMember = MemberFixture.DEFAULT.getMember();
        Member updatedMember = MemberFixture.DEFAULT.getMember();
        TotalPloggingLog total = TotalPloggingLogFixture.DEFAULT.getTotalPloggingLog();
        PloggingLog ploggingLog = PloggingLogFixture.DEFAULT.getPloggingLog();

        given(memberRepository.findById(any(Long.class))).willReturn(Optional.of(updatedMember));
        given(totalPloggingLogRepository.findByMemberId(any(Long.class)))
                .willReturn(Optional.of(total));
        given(ploggingLogRepository.save(any(PloggingLog.class))).willReturn(ploggingLog);

        PloggingLog result = ploggingLogService.add(request, any(Long.class));

        assertThat(result).isEqualTo(ploggingLog);
        assertThat(updatedMember.getCoin())
                .isEqualTo(originMember.getCoin() + request.ploggingLogRequest().coin());
    }

    @Test
    @DisplayName("플로깅 기록을 저장할 때, 플로깅 기록 집계 테이블을 갱신한다.")
    void updateTotalPloggingLogTest() {

        Member member = MemberFixture.DEFAULT.getMember();
        TotalPloggingLog originTotal = TotalPloggingLogFixture.DEFAULT.getTotalPloggingLog();
        TotalPloggingLog updatedTotal = TotalPloggingLogFixture.DEFAULT.getTotalPloggingLog();
        PloggingLog ploggingLog = PloggingLogFixture.DEFAULT.getPloggingLog();

        given(memberRepository.findById(any(Long.class))).willReturn(Optional.of(member));
        given(totalPloggingLogRepository.findByMemberId(any(Long.class)))
                .willReturn(Optional.of(updatedTotal));
        given(ploggingLogRepository.save(any(PloggingLog.class))).willReturn(ploggingLog);

        PloggingLog result = ploggingLogService.add(request, any(Long.class));

        assertThat(result).isEqualTo(ploggingLog);
        assertThat(updatedTotal.getTotalDistance())
                .isEqualTo(
                        originTotal.getTotalDistance() + request.ploggingLogRequest().distance());
    }
}
