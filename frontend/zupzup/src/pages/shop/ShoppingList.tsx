import { Coin, RegistInfoFrame, TopNavigation } from 'components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';
import styled from 'styled-components';

const ShoppingList = () => {
  const navigate = useNavigate();
  const [isNextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true);
  const [nowSelectId, setNowSelectId] = useState<number>(-1);

  const handleMoreInfo = () => {
    navigate(utils.URL.MYPAGE.SHOP);
  };

  return (
    <S.Wrap>
      <TopNavigation rightComponent={<Coin coin={320} />} />
      <S.TitleFrame>
        <S.MainTitle>상점</S.MainTitle>
        <S.SubTitle>캐릭터의 성장을 위한 아이템을 구매해보세요!</S.SubTitle>
      </S.TitleFrame>

      <S.NextButton disabled={isNextButtonDisabled} onClick={handleMoreInfo}>
        구입하기
      </S.NextButton>
    </S.Wrap>
  );
};

interface ButtonProps {
  disabled: boolean;
}

const S = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100vh;
  `,

  TitleFrame: styled.div`
    margin: 24px 0 0 20px;
  `,
  MainTitle: styled.div`
    font-size: ${({ theme }) => theme.font.size.display1};
    font-family: ${({ theme }) => theme.font.family.display1};
    font-weight: ${({ theme }) => theme.font.weight.body2};
    line-height: ${({ theme }) => theme.font.lineheight.display1};
  `,
  SubTitle: styled.div`
    margin-top: 6px;
    color: ${({ theme }) => theme.color.gray2};
    font-size: ${({ theme }) => theme.font.size.body2};
    font-family: ${({ theme }) => theme.font.family.body2};
    font-weight: ${({ theme }) => theme.font.weight.body2};
    line-height: ${({ theme }) => theme.font.lineheight.body2};
  `,

  NextButton: styled.div<ButtonProps>`
    display: flex;
    margin: auto;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 52px;
    font-weight: ${({ theme }) => theme.font.weight.body2};
    font-family: ${({ theme }) => theme.font.family.focus2};
    font-size: ${({ theme }) => theme.font.size.focus2};
    color: ${({ disabled, theme }) =>
      disabled ? theme.color.gray3 : theme.color.white};
    background-color: ${({ disabled, theme }) =>
      disabled ? theme.color.gray4 : theme.color.main};
    margin-bottom: 20px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  `,
};
export default ShoppingList;
