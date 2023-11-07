import styled from 'styled-components';

import { format } from 'date-fns';

const CalendarMonth = () => {
  const now = new Date();
  return (
    <S.Wrap>
      <S.Month>{format(now, 'yyyy년 MM월')}</S.Month>
    </S.Wrap>
  );
};

export default CalendarMonth;

const S = {
  Wrap: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 84px;
    background-color: ${({ theme }) => theme.color.white};
    padding: 0 20px;
  `,
  Month: styled.div`
    font-size: ${({ theme }) => theme.font.size.display3};
    font-family: ${({ theme }) => theme.font.family.display3};
    line-height: ${({ theme }) => theme.font.lineheight.display3};
    color: ${({ theme }) => theme.color.dark};
  `,
};
