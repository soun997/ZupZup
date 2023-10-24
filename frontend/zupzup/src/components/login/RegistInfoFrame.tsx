import styled from 'styled-components';
import { Theme } from 'styles';

interface ButtonProps {
  disabled: boolean;
}

const RegistInfoFrame = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.color.background};
  `,

  NextButton: styled.div<ButtonProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 52px;
    font-weight: ${({ theme }) => theme.font.weight.body2};
    font-family: ${({ theme }) => theme.font.family.focus2};
    font-size: ${({ theme }) => theme.font.size.focus2};
    color: ${({ disabled }: ButtonProps) =>
      disabled ? Theme.color.gray3 : Theme.color.white};
    background-color: ${({ disabled }: ButtonProps) =>
      disabled ? Theme.color.gray4 : Theme.color.main};
    margin-bottom: 20px;
    cursor: ${({ disabled }: ButtonProps) =>
      disabled ? 'not-allowed' : 'pointer'};
  `,

  InputSection: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
  `,
};

export default RegistInfoFrame;
