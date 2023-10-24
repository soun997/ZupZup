import { useState } from 'react';
import styled from 'styled-components';

import { CalendarHeader, Calendar, Record, Navigation } from 'components';

const FloggingRecord = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <S.Wrap>
      <CalendarHeader />
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      {selectedDate && <Record />}
      <Navigation />
    </S.Wrap>
  );
};

export default FloggingRecord;

const S = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.color.background};
  `,
};
