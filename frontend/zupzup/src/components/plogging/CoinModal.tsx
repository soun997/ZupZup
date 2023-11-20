import React from 'react';
import styled from 'styled-components';
import { PLOGGING_COIN_INFO } from 'utils';

interface CoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const trashCoin = PLOGGING_COIN_INFO;

const CoinModal: React.FC<CoinModalProps> = ({ isOpen, onClose }) => {
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
          <h2>코인 산정 기준</h2>
          <button onClick={onClose}>닫기</button>
        </S.ModalHeader>
        <S.ModalContent>
          👁‍🗨 코인은 쓰레기 분해에 걸리는 시간에 따라 산정되었습니다
          {trashCoin.map((eachTrash, idx) => (
            <S.EachFrame key={idx}>
              <div className="eachName">{eachTrash.name}</div>
              <div className="eachVal">{eachTrash.decomposeTime}</div>
            </S.EachFrame>
          ))}
        </S.ModalContent>
      </S.ModalWrapper>
    </S.ModalOverlay>
  );
};

const S = {
  ModalOverlay: styled.div`
    position: fixed;
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
    }
  `,

  ModalContent: styled.div`
    margin-top: 1.2em;
    gap: 1.3em;
    display: flex;
    flex-direction: column;
    line-height: 1.3;
    font-size: ${({ theme }) => theme.font.size.focus2};
    font-family: ${({ theme }) => theme.font.family.focus2};
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

export default CoinModal;
