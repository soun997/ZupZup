import styled from 'styled-components';
import { TotalPloggingInfo } from 'types/ProfileInfo';
import { PloggingMemo, TopNavigation } from 'components';
import { URL } from 'utils';
import { RecordApis } from 'api';
import { useEffect, useState } from 'react';
import { Loading } from 'pages';
import ErrorSvg from 'assets/icons/error-check.svg?react';
import { TrashDetail } from 'types';

const MyPloggingReport = () => {
  const [ploggingInfo, setPloggingInfo] = useState<TotalPloggingInfo>();
  const [trashInfo, setTrashInfo] = useState<TrashDetail>();

  const fetchMyReport = async () => {
    try {
      const response = await RecordApis.getMyPloggingInfo();
      console.log(response);
      const data: TotalPloggingInfo = response.data.results;
      setPloggingInfo(data);
      setTrashInfo({
        plastic: data.totalPlastic,
        battery: data.totalBattery,
        can: data.totalCan,
        cigarette: data.totalCigarette,
        clothes: data.totalClothes,
        paper: data.totalPaper,
        etc: data.totalEtc,
        food: data.totalFood,
        glass: data.totalGlass,
        metal: data.totalMetal,
        mixed: data.totalMixed,
        normal: data.totalNormal,
        styrofoam: data.totalStyrofoam,
        vinyl: data.totalVinyl,
      });
    } catch (error) {
      console.error('Error fetching report info:', error);
    }
  };

  const formatTimeToString = (totalDurationTime: number): string => {
    const hours = Math.floor(totalDurationTime / 3600);
    const minutes = Math.floor((totalDurationTime % 3600) / 60);
    const seconds = totalDurationTime % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    fetchMyReport();
  }, []);

  if (!ploggingInfo) {
    return <Loading />;
  }
  return (
    <S.Wrap>
      <TopNavigation
        title="누적 레포트"
        rightComponent={<></>}
        navigationTo={URL.MYPAGE.HOME}
      />
      <S.Image
        src={`${import.meta.env.VITE_S3_URL}/character/penguin-stair.png`}
      />
      <S.BoxFrame>
        <div className="title">
          그동안 {(ploggingInfo.totalDistance / 1000).toFixed(2)} km 만큼 플로깅
          했어요 👍
        </div>
        <S.BoxInfo>
          <S.EachBoxInfo>
            플로깅 횟수<div className="tag">{ploggingInfo.totalCount} 회</div>
          </S.EachBoxInfo>
          <S.EachBoxInfo>
            플로깅 시간
            <div className="tag">
              {formatTimeToString(ploggingInfo.totalDurationTime)}
            </div>
          </S.EachBoxInfo>
          <S.EachBoxInfo $isLast={true}>
            소모 칼로리
            <div className="tag">{ploggingInfo.totalCalories} kcal</div>
          </S.EachBoxInfo>
        </S.BoxInfo>
      </S.BoxFrame>
      <S.BoxFrame>
        <div className="title">플로깅으로 이만큼 개선됐어요!</div>
        <div className="eachInfo">
          총 {ploggingInfo.totalGatheredTrash}회 쓰레기를 주웠어요.
        </div>
        <div className="memoInfo">
          <PloggingMemo trashInfo={trashInfo!} />
        </div>
        <ErrorCheck>
          <ErrorSvg />
          {'서비스 준비중입니다'}
        </ErrorCheck>
      </S.BoxFrame>

      <S.InfoBox>
        <div className="title">❕ 잠시만요! 그 점 알고 계신가요?</div>
        <div className="content">
          플로깅(plogging) 자세는 스쿼트나 런지 운동 자세와 비슷하여 칼로리
          소모량이 일반 조깅보다 약 50kcal를 더 소모한다는 연구결과가 발표되기도
          했답니다! 일석이조 플로깅, 모두 함께해요 🐧
        </div>
      </S.InfoBox>
    </S.Wrap>
  );
};

interface StyleProps {
  $isLast?: boolean;
}
const S = {
  Wrap: styled.div`
    display: flex;
    width: 100%;
    height: 100dvh;
    overflow-y: scroll;
    flex-direction: column;
    background-color: ${({ theme }) => theme.color.background};
    font-family: ${({ theme }) => theme.font.family.body2};
    color: ${({ theme }) => theme.color.dark};
    padding-top: 10px;
  `,
  Image: styled.img`
    margin: 20px 0 50px;
    width: 80%;
    align-self: center;
  `,

  BoxFrame: styled.div`
    padding: 0 20px;
    margin-bottom: 50px;
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
      padding: 0 10px;
      font-size: ${({ theme }) => theme.font.size.focus2};
      font-weight: ${({ theme }) => theme.font.weight.body2};
    }

    & .memoInfo {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  `,

  BoxInfo: styled.div`
    width: 100%;
    height: 95px;
    background-color: ${({ theme }) => theme.color.white};
    border-radius: 4px;
    padding: 14px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  EachBoxInfo: styled.div<StyleProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: calc(80% / 2);
    font-size: ${({ theme }) => theme.font.size.body3};
    font-weight: ${({ theme }) => theme.font.weight.body3};
    border-right: 0.5px solid
      ${({ theme, $isLast }) =>
        $isLast ? theme.color.white : theme.color.gray3};
    & .tag {
      font-family: ${({ theme }) => theme.font.family.focus1};
      font-size: ${({ theme }) => theme.font.size.focus1};
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

const ErrorCheck = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
  color: ${({ theme }) => theme.color.warning};
  gap: 5px;
  font-size: 12px;
  border: none;
  width: fit-content;
  margin: -5px;
  padding-right: 20px;
  font-family: ${({ theme }) => theme.font.family.body2};
`;

export default MyPloggingReport;
