package com.twoez.zupzup.history.repository;

import static com.twoez.zupzup.history.domain.QFloggingLog.floggingLog;

import com.twoez.zupzup.global.querydsl.QuerydslRepositorySupport;
import com.twoez.zupzup.history.domain.FloggingLog;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)
public class FloggingLogQueryRepository extends QuerydslRepositorySupport {

    public FloggingLogQueryRepository() {
        super(FloggingLog.class);
    }


    public List<FloggingLog> findByBetweenStartDateAndEndDate(LocalDateTime startDate,
            LocalDateTime endDate, Long memberId) {
        return selectFrom(floggingLog)
                .leftJoin(floggingLog.member).fetchJoin()
                .where(floggingLog.member.id.eq(memberId)
                        .and(floggingLog.startDateTime.after(startDate))
                        .and(floggingLog.endDateTime.before(endDate)))
                .orderBy(floggingLog.startDateTime.asc())
                .fetch();
    }

    public List<FloggingLog> findByDate(LocalDate date, Long memberId) {
        return selectFrom(floggingLog)
                .leftJoin(floggingLog.member).fetchJoin()
                .where(floggingLog.member.id.eq(memberId)
                        .and(floggingLog.startDateTime.year().eq(date.getYear()))
                        .and(floggingLog.startDateTime.month().eq(date.getMonthValue()))
                        .and(floggingLog.startDateTime.dayOfMonth().eq(date.getDayOfMonth())))
                .fetch();
    }

    public Optional<FloggingLog> findOneOrderByDateDesc(Long memberId) {
        return Optional.ofNullable(selectFrom(floggingLog)
                .leftJoin(floggingLog.member).fetchJoin()
                .where(floggingLog.member.id.eq(memberId))
                .orderBy(floggingLog.startDateTime.desc())
                .limit(1)
                .fetchOne());
    }
}
