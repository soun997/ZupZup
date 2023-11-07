import styled from 'styled-components';

import { RecordBox } from 'components';
import { PloggingInfo } from 'types';

interface Props {
  ploggingInfos: Array<PloggingInfo>;
}

const Record = ({ ploggingInfos }: Props) => {
  return (
    <S.Wrap>
      {ploggingInfos &&
        [...ploggingInfos].map(ploggingInfo => (
          <RecordBox ploggingInfo={ploggingInfo} />
        ))}
      {ploggingInfos.length === 0 && (
        <S.NotExistsPlogging>
          <S.NotExistsPloggingImage
            src={`${import.meta.env.VITE_S3_URL}/character/no-result.png`}
          />
          <S.NotExistsPloggingComment>
            플로깅 기록이 없습니다.
          </S.NotExistsPloggingComment>
        </S.NotExistsPlogging>
      )}
    </S.Wrap>
  );
};

export default Record;

const S = {
  Wrap: styled.div`
    width: 100%;
    height: calc(100vh - 280px);
    max-height: calc(100vh - 280px);
    background-color: ${({ theme }) => theme.color.background};
    padding: 20px 15px;

    overflow-y: auto;

    &::-webkit-scrollbar {
      height: 0px;
      width: 0px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.color.main};
      border-radius: 45px;
    }
    &::-webkit-scrollbar-thumb:active {
      background: ${({ theme }) => theme.color.main};
    }
  `,
  NotExistsPlogging: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  `,
  NotExistsPloggingImage: styled.img`
    width: 60%;
  `,
  NotExistsPloggingComment: styled.div`
    font-size: ${({ theme }) => theme.font.size.body2};
    font-family: ${({ theme }) => theme.font.family.body2};
    line-height: ${({ theme }) => theme.font.lineheight.body2};
    color: ${({ theme }) => theme.color.dark};
  `,
};
