import { TrashApis } from 'api';
import { Loading } from 'pages';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TrashDetail } from 'types';
import { TrashTable } from 'types/PloggingReport';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  trashDetail: TrashDetail;
}

const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  trashDetail,
}) => {
  const [coinTable, setCoinTable] = useState<TrashTable>();
  useEffect(() => {
    async function load() {
      const coinData = await TrashApis.getTrashDetail();
      const coinTableFromJson = coinData.data;
      setCoinTable(coinTableFromJson);
    }
    load();
  }, []);

  if (!isOpen) return null;

  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  const handleWrapperClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <S.ModalOverlay onClick={handleClose}>
      <S.ModalWrapper onClick={handleWrapperClick}>
        <S.ModalHeader>
          <h2>일일 레포트</h2>
          <button onClick={onClose}>닫기</button>
        </S.ModalHeader>
        <S.ModalContent>
          {coinTable ? (
            Object.keys(trashDetail)
              .filter((type: string) => trashDetail[type] > 0)
              .map((type, idx) => (
                <S.EachFrame key={idx}>
                  <div className="eachName">{coinTable[type].kor}</div>
                  <div className="eachVal">
                    {trashDetail[type] * (coinTable as TrashTable)[type].coin}{' '}
                    Coins
                  </div>
                </S.EachFrame>
              ))
          ) : (
            <Loading />
          )}
        </S.ModalContent>
      </S.ModalWrapper>
    </S.ModalOverlay>
  );
};

const S = {
  ModalOverlay: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  ModalWrapper: styled.div`
    background: ${({ theme }) => theme.color.background};
    padding: 2.4em 2em;
    border-radius: 10px;
    width: 80%;
    max-width: 300px;
  `,
  ModalHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    & h2 {
      font-size: ${({ theme }) => theme.font.size.focus1};
      font-family: ${({ theme }) => theme.font.family.focus1};
      color: ${({ theme }) => theme.color.dark};
    }
    border-bottom: 1px solid ${({ theme }) => theme.color.dark};
    padding-bottom: 0.5em;

    & button {
      border: none;
      background: transparent;
      font-size: ${({ theme }) => theme.font.size.focus2};
      font-family: ${({ theme }) => theme.font.family.focus2};
      color: ${({ theme }) => theme.color.gray2};
      height: fit-content;
      /* margin-top: -5px; */
    }
  `,

  ModalContent: styled.div`
    margin-top: 1.2em;
    gap: 1.3em;
    display: flex;
    flex-direction: column;
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
      color: ${({ theme }) => theme.color.gray1};
      font-size: ${({ theme }) => theme.font.size.focus3};
      font-family: ${({ theme }) => theme.font.family.focus3};
    }
  `,
};

export default ReportModal;
