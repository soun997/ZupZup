import { useState } from "react";
import styled from "styled-components";

import * as components from "components";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <S.Wrap>
      <components.CalendarHeader />
      <components.Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {selectedDate && <components.Record />}
    </S.Wrap>
  );
};

export default Calendar;

const S = {
  Wrap: styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.color.background};
  `,
};
