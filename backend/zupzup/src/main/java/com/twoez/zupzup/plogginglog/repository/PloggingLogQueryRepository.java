package com.twoez.zupzup.plogginglog.repository;

import static com.twoez.zupzup.plogginglog.domain.QPloggingLog.ploggingLog;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.twoez.zupzup.global.querydsl.QuerydslRepositorySupport;
import com.twoez.zupzup.plogginglog.domain.PloggingLog;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)
public class PloggingLogQueryRepository extends QuerydslRepositorySupport {

    public PloggingLogQueryRepository() {
        super(PloggingLog.class);
    }

    public List<PloggingLog> findByBetweenStartDateAndEndDate(
            LocalDateTime startDate, LocalDateTime endDate, Long memberId) {
        return selectFrom(ploggingLog)
                .leftJoin(ploggingLog.member)
                .fetchJoin()
                .where(
                        ploggingLog
                                .member
                                .id
                                .eq(memberId)
                                .and(ploggingLog.startDateTime.after(startDate))
                                .and(ploggingLog.endDateTime.before(endDate)))
                .orderBy(ploggingLog.startDateTime.asc())
                .fetch();
    }

    public List<PloggingLog> findByMonth(LocalDate date, Long memberId) {
        return findByMonthQuery(date, memberId).fetch();
    }

    public List<PloggingLog> findByDate(LocalDate date, Long memberId) {
        return findByMonthQuery(date, memberId).where(eqDay(date)).fetch();
    }

    private JPAQuery<PloggingLog> findByMonthQuery(LocalDate date, Long memberId) {
        
        return selectFrom(ploggingLog)
                .leftJoin(ploggingLog.member)
                .fetchJoin()
                .where(ploggingLog.member.id.eq(memberId).and(eqYear(date)).and(eqMonth(date)));
    }

    private static BooleanExpression eqDay(LocalDate date) {
        return ploggingLog.startDateTime.dayOfMonth().eq(date.getDayOfMonth());
    }

    private static BooleanExpression eqMonth(LocalDate date) {
        return ploggingLog.startDateTime.month().eq(date.getMonthValue());
    }

    private static BooleanExpression eqYear(LocalDate date) {
        return ploggingLog.startDateTime.year().eq(date.getYear());
    }

    private static BooleanExpression eqMemberId(Long memberId) {
        return ploggingLog.member.id.eq(memberId);
    }

    public Optional<PloggingLog> findOneOrderByDateDesc(Long memberId) {
        return Optional.ofNullable(
                selectFrom(ploggingLog)
                        .leftJoin(ploggingLog.member)
                        .fetchJoin()
                        .where(eqMemberId(memberId))
                        .orderBy(ploggingLog.startDateTime.desc())
                        .limit(1)
                        .fetchOne());
    }
}
