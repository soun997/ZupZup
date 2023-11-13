import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { format } from 'date-fns';

import { CalendarHeader, Calendar, Record, Navigation } from 'components';
import { RecordApis } from 'api';
import { PloggingInfo } from 'types';

const PloggingRecord = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [ploggingInfos, setPloggingInfos] = useState<Array<PloggingInfo>>();

  const initDayPloggingInfo = async () => {
    try {
      const response = await RecordApis.getPloggingLogByDay(
        format(selectedDate!, 'yyyy-MM-dd'),
      );
      setPloggingInfos(response.data.results);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (selectedDate !== null) {
      initDayPloggingInfo();
    } else {
      setPloggingInfos([]);
    }
  }, [selectedDate]);

  return (
    <S.Wrap>
      <CalendarHeader />
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      {selectedDate && ploggingInfos && (
        <Record ploggingInfos={ploggingInfos} />
      )}
      <Navigation />
    </S.Wrap>
  );
};

export default PloggingRecord;

const S = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100dvh;
    background-color: ${({ theme }) => theme.color.background};
  `,
};
