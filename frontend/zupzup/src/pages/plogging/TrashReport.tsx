import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinReport, ConfirmButton, TopNavigation } from 'components';
import * as utils from 'utils';
import { TrashAnalyzeReport } from 'types/Trash';
import CONSOLE from 'utils/ColorConsoles';

// const trashReport: TrashAnalyzeReport = {
//   image: '../../../assets/images/trash-image.png',
//   coin: [
//     { name: '플라스틱', value: 12 },
//     { name: '담배꽁초', value: 5 },
//     { name: '일반쓰레기', value: 20 },
//     { name: '기타', value: 2 },
//   ],
//   totalCoin: 39,
// };

const TrashReport = (trashReport: TrashAnalyzeReport) => {
  const navigate = useNavigate();
  const trashAnalyzeImageRef =
    useRef() as React.MutableRefObject<HTMLImageElement>;

  useEffect(() => {
    // read trash analyze image file
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result) {
        trashAnalyzeImageRef.current.src = fileReader.result as string;
      } else {
        CONSOLE.error('캡처 파일 읽기 실패...');
      }
    };
  }, []);

  return (
    <S.Wrap>
      <TopNavigation />
      <S.Content>
        <S.TitleFrame>
          <S.MainTitle>쓰레기 이미지 분석 결과입니다</S.MainTitle>
          <S.SubTitle>인식이 안되었을 경우 재촬영 해주세요</S.SubTitle>
        </S.TitleFrame>
        <S.Image ref={trashAnalyzeImageRef} />
        <CoinReport
          trashDetail={trashReport.trashDetail}
          totalCoin={trashReport.totalCoin}
        ></CoinReport>
      </S.Content>
      <S.BottomFrame>
        <ConfirmButton
          text="플로깅으로 돌아가기"
          onClick={() => navigate(utils.URL.PLOGGING.ON)}
        />
      </S.BottomFrame>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100vh;
  `,

  Content: styled.div`
    padding: 0 24px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  Image: styled.img`
    width: 100%;
    margin-top: 44px;
  `,

  TitleFrame: styled.div`
    margin-top: 20px;
  `,
  MainTitle: styled.div`
    font-size: ${({ theme }) => theme.font.size.display1};
    font-family: ${({ theme }) => theme.font.family.display1};
    font-weight: ${({ theme }) => theme.font.weight.body2};
    line-height: ${({ theme }) => theme.font.lineheight.display1};
  `,
  SubTitle: styled.div`
    margin-top: 10px;
    color: ${({ theme }) => theme.color.gray2};
    font-size: ${({ theme }) => theme.font.size.body2};
    font-family: ${({ theme }) => theme.font.family.body2};
    font-weight: ${({ theme }) => theme.font.weight.body2};
    line-height: ${({ theme }) => theme.font.lineheight.body2};
  `,
  BottomFrame: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    bottom: 0;
    width: 100%;
    margin: auto 0 50px 0;
  `,
};
export default TrashReport;
