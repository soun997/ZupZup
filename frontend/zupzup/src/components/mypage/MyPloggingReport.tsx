import styled from 'styled-components';
import { LastPloggingInfo } from 'types/ProfileInfo';
import NoteSvg from 'assets/icons/note.svg?react';

interface Props {
  lastPlogging: LastPloggingInfo;
  isDayTime: boolean;
}
const MyPloggingReport = ({ lastPlogging, isDayTime }: Props) => {
  return (
    <S.Wrap>
      <S.IndexTitle>
        <NoteSvg />
        <span>누적 레포트</span>
      </S.IndexTitle>
      <S.BoxFrame $daytime={isDayTime}>
        <div className="title">그동안 이만큼 플로깅 했어요</div>
        <div className="eachInfo">
          <div>{lastPlogging.count} 회</div>
          <div>{lastPlogging.hour} 시간</div>
          <div>{lastPlogging.calories} kcal</div>
        </div>
      </S.BoxFrame>
    </S.Wrap>
  );
};

interface StyleProps {
  $daytime: boolean;
}

const S = {
  Wrap: styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: end;
    justify-content: center;
  `,

  IndexTitle: styled.div`
    border-radius: 4px 4px 0px 4px;
    background-color: ${({ theme }) => theme.color.main};
    color: ${({ theme }) => theme.color.white};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 105px;
    height: 26px;
    & span {
      margin-top: 2px;
      font-size: ${({ theme }) => theme.font.size.body3};
      font-weight: ${({ theme }) => theme.font.weight.body2};
    }
    z-index: 1;
  `,

  BoxFrame: styled.div<StyleProps>`
    margin-top: -15px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.6);
    width: 100%;
    padding: 24px 20px 20px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 15px;

    & .title {
      color: ${({ theme, $daytime }) =>
        $daytime ? theme.color.gray3 : theme.color.white};
      font-size: ${({ theme }) => theme.font.size.body2};
      font-weight: ${({ theme }) => theme.font.weight.body2};
    }

    & .eachInfo {
      display: flex;
      justify-content: space-between;

      & div {
        color: ${({ theme, $daytime }) =>
          $daytime ? theme.color.gray2 : theme.color.white};
        font-size: ${({ theme }) => theme.font.size.display2};
        font-weight: ${({ theme }) => theme.font.weight.focus2};
      }
    }
  `,
};

export default MyPloggingReport;
