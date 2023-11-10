import styled from 'styled-components';

import { format, addMonths, subMonths } from 'date-fns';

import NextSvg from 'assets/icons/next.svg?react';
import PrevSvg from 'assets/icons/prev.svg?react';

interface Props {
  currentDate: Date;
  setCurrentDate: (currentDate: Date) => void;
}

const CalendarMonth = ({ currentDate, setCurrentDate }: Props) => {
  return (
    <S.Wrap>
      <PrevSvg onClick={() => setCurrentDate(subMonths(currentDate, 1))} />
      <S.Month>{format(currentDate, 'yyyy년 MM월')}</S.Month>
      <NextSvg onClick={() => setCurrentDate(addMonths(currentDate, 1))} />
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

    & > svg {
      width: 20px;
      filter: ${({ theme }) => theme.color.darkFilter};
      margin: 0 5px 2px;
      cursor: pointer;
    }
  `,
  Month: styled.div`
    font-size: ${({ theme }) => theme.font.size.display3};
    font-family: ${({ theme }) => theme.font.family.display3};
    line-height: ${({ theme }) => theme.font.lineheight.display3};
    color: ${({ theme }) => theme.color.dark};
  `,
};
