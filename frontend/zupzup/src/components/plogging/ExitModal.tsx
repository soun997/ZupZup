import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import * as utils from 'utils';

import XSvg from 'assets/icons/x.svg?react';

interface Props {
  setExitOn: (exitOn: boolean) => void;
}

const ExitModal = ({ setExitOn }: Props) => {
  const navigate = useNavigate();

  return (
    <S.Wrap>
      <S.ModalBox>
        <S.Header>
          <S.CancelButton onClick={() => setExitOn(false)}>
            <XSvg />
          </S.CancelButton>
        </S.Header>
        <S.MessageBox>정말 종료하시겠습니까?</S.MessageBox>
        <S.ExitButton onClick={() => navigate(utils.URL.RESULT.FLOGGING)}>
          종료하기
        </S.ExitButton>
      </S.ModalBox>
    </S.Wrap>
  );
};

export default ExitModal;

const S = {
  Wrap: styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #7777;
    z-index: 110;
  `,
  ModalBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 200px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.white};
    padding: 30px;
  `,
  Header: styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    pointer-events: auto;
  `,
  MessageBox: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: ${({ theme }) => theme.font.size.main2};
    font-family: ${({ theme }) => theme.font.family.main2};
    line-height: ${({ theme }) => theme.font.lineheight.main2};
    margin: 20px 0 0 0;
  `,
  CancelButton: styled.button`
    & > svg {
      width: 20px;
      height: 20px;
    }
  `,

  ExitButton: styled.button`
    width: 100%;
    height: 40px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.main};
    color: ${({ theme }) => theme.color.white};
    font-size: ${({ theme }) => theme.font.size.focus3};
    font-family: ${({ theme }) => theme.font.family.focus3};
    line-height: ${({ theme }) => theme.font.lineheight.focus3};
    margin: auto 0 0 0;
    pointer-events: auto;

    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => theme.color.sub};
    }
  `,
};
