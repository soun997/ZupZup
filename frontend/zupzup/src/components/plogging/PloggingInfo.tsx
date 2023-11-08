import styled from 'styled-components';

import { useFormatTime } from 'hooks';

import SmallRunnerSvg from 'assets/icons/smallrunner.svg?react';
import CameraSvg from 'assets/icons/camera.svg?react';

interface Props {
  time: number;
  distance: number;
  calorie: number;
  exitOn: boolean;
  setExitOn: (exitOn: boolean) => void;
  setPloggingInfoOn: (ploggiingInfoOn: boolean) => void;
  setCameraOn: (cameraOn: boolean) => void;
}

const PloggingInfo = ({
  time,
  distance,
  setPloggingInfoOn,
  setCameraOn,
  calorie,
}: Props) => {
  return (
    <S.Wrap>
      <S.PloggingInfoBox>
        <S.PloggingTime>
          {useFormatTime.formatTimeByColons(time)}
        </S.PloggingTime>
        <S.PloggingState>
          <S.PloggingStateTitle>현재 플로깅 정보</S.PloggingStateTitle>
          <S.PloggingDistanceBox>
            <S.PloggingDistance>
              {(distance / 1000).toFixed(2)} km
            </S.PloggingDistance>
            &nbsp;째 플로깅 중입니다.
          </S.PloggingDistanceBox>
          <S.PloggingCaloriesBox>
            플로깅으로&nbsp;
            <S.PloggingCalories>{calorie.toFixed(2)} kcal</S.PloggingCalories>
            &nbsp;가 소모되었습니다.
          </S.PloggingCaloriesBox>
        </S.PloggingState>
      </S.PloggingInfoBox>
      <S.UserAccess>
        <S.CameraButton onClick={() => setCameraOn(true)}>
          <CameraSvg />
        </S.CameraButton>
        <S.BackToMapButton onClick={() => setPloggingInfoOn(false)}>
          <SmallRunnerSvg /> 지도로 돌아가기
        </S.BackToMapButton>
      </S.UserAccess>
    </S.Wrap>
  );
};

export default PloggingInfo;

const S = {
  Wrap: styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.color.background};
    padding: 94px 16px 0;
    z-index: 200;
  `,
  PloggingInfoBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  `,
  PloggingTime: styled.div`
    font-size: 40px;
    font-family: ${({ theme }) => theme.font.family.display1};
    line-height: 40px;
    color: ${({ theme }) => theme.color.gray2};
    margin: 70px 0 40px;
  `,
  PloggingState: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 130px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.white};
    padding: 28px 30px;
  `,
  PloggingStateTitle: styled.div`
    width: 100%;
    font-size: ${({ theme }) => theme.font.size.focus2};
    font-family: ${({ theme }) => theme.font.family.focus2};
    line-height: ${({ theme }) => theme.font.lineheight.focus2};
    color: ${({ theme }) => theme.color.dark};
    margin: 0 0 14px 0;
  `,
  PloggingDistanceBox: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    font-size: ${({ theme }) => theme.font.size.focus2};
    font-family: ${({ theme }) => theme.font.family.focus2};
    line-height: ${({ theme }) => theme.font.lineheight.focus2};
    color: ${({ theme }) => theme.color.gray2};
    margin: 0 0 8px;
  `,
  PloggingDistance: styled.div`
    font-size: ${({ theme }) => theme.font.size.focus2};
    font-family: ${({ theme }) => theme.font.family.focus2};
    line-height: ${({ theme }) => theme.font.lineheight.focus2};
    color: ${({ theme }) => theme.color.main};
  `,
  PloggingCaloriesBox: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    font-size: ${({ theme }) => theme.font.size.focus2};
    font-family: ${({ theme }) => theme.font.family.focus2};
    line-height: ${({ theme }) => theme.font.lineheight.focus2};
    color: ${({ theme }) => theme.color.gray2};
  `,
  PloggingCalories: styled.div`
    font-size: ${({ theme }) => theme.font.size.focus2};
    font-family: ${({ theme }) => theme.font.family.focus2};
    line-height: ${({ theme }) => theme.font.lineheight.focus2};
    color: ${({ theme }) => theme.color.main};
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

    &:active {
      background-color: ${({ theme }) => theme.color.sub};
    }
  `,
  BackToMapButton: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160px;
    height: 34px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.color.main};
    color: ${({ theme }) => theme.color.white};
    font-size: ${({ theme }) => theme.font.size.focus2};
    font-family: ${({ theme }) => theme.font.family.focus2};
    line-height: ${({ theme }) => theme.font.lineheight.focus2};
    color: #fff;
    pointer-events: auto;

    & > svg {
      margin: 0 6px 0 0;
    }

    &:active {
      background-color: ${({ theme }) => theme.color.sub};
    }
  `,
};
