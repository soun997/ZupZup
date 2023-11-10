import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { TrashDetail } from 'types/Trash';
import ArrowSvg from 'assets/icons/angle-right.svg?react';
import { useNavigate } from 'react-router-dom';
import { Loading } from 'pages';

interface Props {
  trashDetail: TrashDetail;
  totalCoin: number;
}

interface TrashTable {
  [type: string]: TrashTableDetail;
  plastic: TrashTableDetail;
  cigarette: TrashTableDetail;
  can: TrashTableDetail;
  glass: TrashTableDetail;
  paper: TrashTableDetail;
  styrofoam: TrashTableDetail;
  metal: TrashTableDetail;
  clothes: TrashTableDetail;
  battery: TrashTableDetail;
  vinyl: TrashTableDetail;
  normal: TrashTableDetail;
  food: TrashTableDetail;
  mixed: TrashTableDetail;
  etc: TrashTableDetail;
}

interface TrashTableDetail {
  type: number[];
  desc: string;
  coin: number;
}

const COIN_TABLE_URI = '/classify/classify_type.json';

const CoinReport = ({ trashDetail, totalCoin }: Props) => {
  const navigate = useNavigate();
  const [coinTable, setCoinTable] = useState<TrashTable>();

  useEffect(() => {
    async function load() {
      const coinTableFromJson = await fetch(COIN_TABLE_URI)
        .then(response => response.json())
        .catch(error => {
          console.log(error);
        });
      setCoinTable(coinTableFromJson);
    }
    load();
  }, []);

  return (
    <S.Wrap>
      <S.TitleFrame>
        <S.Title>획득한 코인</S.Title>
        <S.Caption onClick={() => navigate('/')}>
          코인 산정 기준이 궁금하신가요?
          <ArrowSvg />
        </S.Caption>
      </S.TitleFrame>
      <S.ContentFrame>
        {coinTable ? (
          Object.keys(trashDetail)
            .filter((type: string) => trashDetail[type] > 0)
            .map((type, idx) => (
              <S.EachFrame key={idx}>
                <div className="eachName">{type}</div>
                <div className="eachVal">
                  {trashDetail[type] * (coinTable as TrashTable)[type].coin}{' '}
                  Coins
                </div>
              </S.EachFrame>
            ))
        ) : (
          <Loading />
        )}
      </S.ContentFrame>
      <S.ResultFrame>
        <S.Title>총 획득 코인</S.Title>
        <S.Title>{totalCoin} 원</S.Title>
      </S.ResultFrame>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.color.main};
  `,

  TitleFrame: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 38px;
  `,
  Title: styled.div`
    font-size: ${({ theme }) => theme.font.size.focus1};
    font-family: ${({ theme }) => theme.font.family.focus1};
  `,
  Caption: styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: ${({ theme }) => theme.font.size.caption};
    font-family: ${({ theme }) => theme.font.family.caption};
    color: ${({ theme }) => theme.color.gray3};
  `,

  ContentFrame: styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 30px 0px 24px 12px;
    border-bottom: 1px solid #e5e5e5;
  `,

  EachFrame: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    .eachName {
      font-size: ${({ theme }) => theme.font.size.focus2};
      font-family: ${({ theme }) => theme.font.family.focus2};
      color: ${({ theme }) => theme.color.gray2};
    }

    .eachVal {
      font-size: ${({ theme }) => theme.font.size.focus1};
      font-family: ${({ theme }) => theme.font.family.focus1};
    }
  `,

  ResultFrame: styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 16px;
  `,
};

export default CoinReport;
