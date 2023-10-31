import styled from 'styled-components';
import { TotalPloggingInfo } from 'types/ProfileInfo';
import { TopNavigation } from 'components';

const ploggingInfo: TotalPloggingInfo = {
  totalCalorie: 330, //cal
  totalCount: 1,
  totalTime: 7200, //초
  totalDistance: 1, //미터
  totalGatheredTrash: 17,
};

const MyPloggingReport = () => {
  return (
    <S.Wrap>
      <TopNavigation title="누적 레포트" rightComponent={<></>} />
      <S.Image src="/assets/character/penguin-stair.png" />
      <S.BoxFrame>
        <div className="title">그동안 이만큼 플로깅 했어요 👍</div>
        <div className="eachInfo">
          <div>{ploggingInfo.totalCount} 회</div>
          <div>{Math.floor(ploggingInfo.totalTime / 3600)} 시간</div>
          <div>{ploggingInfo.totalDistance / 1000} km</div>
          <div>{ploggingInfo.totalCalorie} kcal</div>
        </div>
      </S.BoxFrame>
      <S.BoxFrame>
        <div className="title">플로깅으로 이만큼 개선됐어요!</div>
        <div className="eachInfo">
          <div>{ploggingInfo.totalGatheredTrash}회 쓰레기를 주워주셨군요.</div>
        </div>
      </S.BoxFrame>
      <S.InfoBox>
        <div className="title">❕ 잠시만요! 그 점 알고 계신가요?</div>
        <div className="content">
          플로깅의 효과에 대해 적고싶어요. 자료조사해주세요..플로깅의 효과에
          대해 적고싶어요. 자료조사해주세요..플로깅의 효과에 대해 적고싶어요.
          자료조사해주세요..플로깅의 효과에 대해 적고싶어요. 자료조사해주세요..
        </div>
      </S.InfoBox>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    display: flex;
    width: 100%;
    height: 100dvh;
    flex-direction: column;
    background-color: ${({ theme }) => theme.color.background};
    font-family: ${({ theme }) => theme.font.family.body2};
  `,
  Image: styled.img`
    margin: 20px 0 50px;
    width: 80%;
    align-self: center;
  `,

  BoxFrame: styled.div`
    padding: 0 20px;
    margin-bottom: 50px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 15px;

    & .title {
      font-family: ${({ theme }) => theme.font.family.display3};
      font-size: ${({ theme }) => theme.font.size.body1};
      font-weight: ${({ theme }) => theme.font.weight.body2};
    }

    & .eachInfo {
      display: flex;
      justify-content: space-between;

      & div {
        font-size: ${({ theme }) => theme.font.size.focus2};
        font-weight: ${({ theme }) => theme.font.weight.body2};
      }
    }
  `,

  InfoBox: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    margin-bottom: 40px;
    font-size: ${({ theme }) => theme.font.size.body3};
    font-family: ${({ theme }) => theme.font.family.body2};

    & .title {
      font-family: ${({ theme }) => theme.font.family.focus2};
      font-size: ${({ theme }) => theme.font.size.body2};
    }

    & .content {
      margin-top: 10px;
      padding: 20px;
      background-color: ${({ theme }) => theme.color.white};
      font-family: ${({ theme }) => theme.font.family.body2};
      line-height: 1.5;
    }
  `,
};

export default MyPloggingReport;
