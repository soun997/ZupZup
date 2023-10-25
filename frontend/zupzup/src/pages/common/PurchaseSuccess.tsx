import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';

import { SuccessAnimation, ConfirmButton } from 'components';

const PurchaseSuccess = () => {
  const navigate = useNavigate();

  return (
    <S.Wrap>
      <S.TitleFrame>
        <S.MainTitle>구매가 완료 되었어요</S.MainTitle>
        <S.SubTitle>줍줍님의 성장치가 증가하였어요 🎉</S.SubTitle>
      </S.TitleFrame>
      <SuccessAnimation />
      <S.BottomFrame>
        <ConfirmButton
          text="마이페이지로 이동"
          onClick={() => navigate(utils.URL.MYPAGE.HOME)}
        />
      </S.BottomFrame>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.color.background};
  `,
  TitleFrame: styled.div`
    margin-top: 75px;
    text-align: center;
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
    margin: auto 0 25px 0;
  `,
};
export default PurchaseSuccess;
