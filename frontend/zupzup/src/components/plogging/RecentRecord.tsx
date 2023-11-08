import styled from 'styled-components';
import { useState, useEffect } from 'react';

import SmallClockSvg from 'assets/icons/smallclock.svg?react';
import { RecordApis } from 'api';

interface RecentRecord {
  startDateTime: string;
  endDateTime: string;
  calories: number;
  distance: number;
}

const calculateDaysPassed = (inputDate: string): number => {
  const inputDateObj = new Date(inputDate);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - inputDateObj.getTime();

  const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;

  return daysPassed;
};

const RecentRecord = () => {
  const [recentRecord, setRecentRecord] = useState<RecentRecord | null>(null);
  const [recentDay, setRecentDay] = useState<number>(0);
  const fetchNowPloggingUser = async () => {
    try {
      const response = await RecordApis.getPloggingLogByRecent();
      const data = response.data.results;
      console.log(data);

      if (!data) {
        setRecentRecord(null);
      } else {
        setRecentRecord(data);
        setRecentDay(calculateDaysPassed(data.endDate));
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchNowPloggingUser();
  }, []);

  return (
    <S.Wrap>
      <S.RecordBox>
        <SmallClockSvg />
        {recentRecord ? (
          <>
            <S.RecordInfo>{recentDay}일 전</S.RecordInfo>&nbsp;|&nbsp;
            <S.RecordInfo>
              {(recentRecord.distance / 1000).toFixed(1)} km
            </S.RecordInfo>
          </>
        ) : (
          <S.RecordInfo>최근 플로깅 기록이 없습니다</S.RecordInfo>
        )}
      </S.RecordBox>
    </S.Wrap>
  );
};

export default RecentRecord;

const S = {
  Wrap: styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 45px;
    padding: 0 16px;
  `,
  RecordBox: styled.div`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.color.gray2};
    font-size: ${({ theme }) => theme.font.size.focus3};
    font-family: ${({ theme }) => theme.font.family.focus3};
    line-height: ${({ theme }) => theme.font.lineheight.focus3};

    & > svg {
      margin: 0 5px 0 0;
    }
  `,
  RecordInfo: styled.div`
    font-size: ${({ theme }) => theme.font.size.focus3};
    font-family: ${({ theme }) => theme.font.family.focus3};
    line-height: ${({ theme }) => theme.font.lineheight.focus3};
  `,
};
