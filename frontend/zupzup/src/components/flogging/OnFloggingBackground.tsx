import styled from 'styled-components';

import SmallRunnerSvg from 'assets/icons/smallrunner.svg?react';
import CoinSvg from 'assets/icons/coin.svg?react';

const OnFloggingBackground = () => {
  return (
    <S.Wrap>
      <S.CurrentState>
        <S.CurrentCoin>
          <CoinSvg />
          15
        </S.CurrentCoin>
        <S.ExitButton>
          <SmallRunnerSvg /> 종료하기
        </S.ExitButton>
      </S.CurrentState>
      <S.UserAccess>
        <S.CameraButton></S.CameraButton>
        <S.FloggingInfoButton></S.FloggingInfoButton>
        <S.TrashButton></S.TrashButton>
      </S.UserAccess>
    </S.Wrap>
  );
};

export default OnFloggingBackground;

const S = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      #f5f4f8 0%,
      rgba(255, 255, 255, 0.65) 20.02%,
      rgba(255, 255, 255, 0) 35.13%,
      rgba(255, 255, 255, 0) 100%
    );

    filter: drop-shadow(0px 20px 20px rgba(112, 112, 112, 0.1));
    box-shadow: 0px 20px 20px 0px rgba(112, 112, 112, 0.1);
    z-index: 99;
    pointer-events: none;
  `,
  CurrentState: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 94px;
    padding: 0 30px;
  `,
  CurrentCoin: styled.div`
    display: flex;
    align-items: center;
    font-size: ${({ theme }) => theme.font.size.display3};
    font-family: ${({ theme }) => theme.font.family.display3};
    line-height: ${({ theme }) => theme.font.lineheight.display3};
    color: ${({ theme }) => theme.color.gray2};

    & > svg {
      margin: 2px;
    }
  `,
  ExitButton: styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 110px;
    height: 34px;
    border-radius: 4px;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.main};
    padding: 6px 10px;
    pointer-events: auto;

    &:hover {
      background-color: ${({ theme }) => theme.color.sub};
    }
  `,
  UserAccess: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto 0 56px;
    padding: 0 28px;
  `,
  CameraButton: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 58px;
    height: 58px;
    border-radius: 29px;
    background-color: ${({ theme }) => theme.color.main};
    color: ${({ theme }) => theme.color.white};
    pointer-events: auto;
  `,
  FloggingInfoButton: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160px;
    height: 34px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.color.main};
    color: ${({ theme }) => theme.color.white};
    pointer-events: auto;
  `,
  TrashButton: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 58px;
    height: 58px;
    border-radius: 29px;
    background-color: ${({ theme }) => theme.color.main};
    color: ${({ theme }) => theme.color.white};
    pointer-events: auto;
  `,
};
