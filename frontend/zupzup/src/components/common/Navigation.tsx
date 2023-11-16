import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import CalendarSvg from 'assets/icons/calendar.svg?react';
import ProfileSvg from 'assets/icons/profile.svg?react';
import ShoesSvg from 'assets/icons/shoes.svg?react';

import * as utils from 'utils';

interface Props {
  currentPage: string;
}

interface SideButtonProps {
  $currentPage: boolean;
}

const Navigation = ({ currentPage }: Props) => {
  const navigate = useNavigate();

  return (
    <S.Wrap>
      <S.Nav>
        <S.SideButton
          $currentPage={currentPage === 'ploggingRecord'}
          onClick={() => navigate(utils.URL.CALENDAR.CALENDAR)}
        >
          <CalendarSvg />
        </S.SideButton>
        <S.MainButton onClick={() => navigate(utils.URL.PLOGGING.LOBBY)}>
          <ShoesSvg />
        </S.MainButton>
        <S.SideButton
          $currentPage={
            currentPage === 'myPage' ||
            currentPage === 'settings' ||
            currentPage === 'profileSettings'
          }
        >
          <ProfileSvg onClick={() => navigate(utils.URL.MYPAGE.HOME)} />
        </S.SideButton>
      </S.Nav>
    </S.Wrap>
  );
};

export default Navigation;

const S = {
  Wrap: styled.div`
    margin: auto 0 0;
    bottom: 0;
    width: 100%;
    z-index: 9999;
  `,
  Nav: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    left: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.color.background};
    border-radius: 8px 8px 0 0;
    box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.04);
    padding: 0 50px;
  `,
  MainButton: styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
    left: calc(50% - 36px);
    bottom: 30px;
    border-radius: 36px;
    background-color: ${({ theme }) => theme.color.main};
    box-shadow: 0px 2px 2px 0px rgba(255, 255, 255, 0.25) inset;

    &:active {
      background-color: ${({ theme }) => theme.color.sub};
      cursor: pointer;
    }

    & > svg {
      filter: ${({ theme }) => theme.color.white};
    }
  `,
  SideButton: styled.div<SideButtonProps>`
    &:active {
      cursor: pointer;
    }

    & > svg {
      filter: ${({ theme, $currentPage }) =>
        $currentPage ? theme.color.mainFilter : theme.color.darkFilter};
    }
  `,
};
