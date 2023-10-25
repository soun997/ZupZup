import styled from 'styled-components';

import CoinSvg from 'assets/icons/coin.svg?react';
import SmallRunnerSvg from 'assets/icons/smallrunner.svg?react';

interface Props {
  exitOn: boolean;
  setExitOn: (exitOn: boolean) => void;
}

interface ModalState {
  modalOn: boolean;
}

const OnPloggingHeader = ({ exitOn, setExitOn }: Props) => {
  return (
    <S.Wrap>
      <S.CurrentState>
        <S.CurrentCoin>
          <CoinSvg />
          15
        </S.CurrentCoin>
        <S.ExitButton onClick={() => setExitOn(true)} modalOn={exitOn}>
          <SmallRunnerSvg /> 종료하기
        </S.ExitButton>
      </S.CurrentState>
    </S.Wrap>
  );
};

export default OnPloggingHeader;

const S = {
  Wrap: styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 94px;
    z-index: 100;
  `,
  CurrentState: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 94px;
    padding: 0 30px;
  `,
  CurrentCoin: styled.div`
    display: flex;
    align-items: center;
    font-size: ${({ theme }) => theme.font.size.display3};
    font-family: ${({ theme }) => theme.font.family.display3};
    line-height: ${({ theme }) => theme.font.lineheight.display3};
    color: ${({ theme }) => theme.color.gray2};

    & > svg {
      margin: 2px;
    }
  `,
  ExitButton: styled.button<ModalState>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 110px;
    height: 34px;
    border-radius: 4px;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.main};
    font-size: ${({ theme }) => theme.font.size.focus2};
    font-family: ${({ theme }) => theme.font.family.focus2};
    line-height: ${({ theme }) => theme.font.lineheight.focus2};
    padding: 6px 10px;
    pointer-events: ${({ modalOn }) => (modalOn ? 'none' : 'auto')};

    &:hover {
      background-color: ${({ theme }) => theme.color.sub};
    }
  `,
};
