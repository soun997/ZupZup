import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import * as utils from 'utils';
import { ConfirmButton } from 'components';

const PurchaseSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <S.Wrap>
      <S.TitleFrame>
        <S.MainTitle>음~ 맛있는 식사였다고 하네요</S.MainTitle>
        <S.SubTitle>펭깅이의 성장도가 +{state} 증가하였어요 🎉</S.SubTitle>
      </S.TitleFrame>
      <S.GIF
        src={`${
          import.meta.env.VITE_S3_URL
        }/character/after-eating-removebg.gif`}
        alt="eating..."
      />
      <S.BottomFrame>
        <ConfirmButton
          text="상점으로 이동"
          onClick={() => navigate(utils.URL.MYPAGE.SHOP)}
        />
        <ConfirmButton
          text="마이페이지로 이동"
          color="#a0a0a0"
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
    height: 100dvh;
    background-color: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.dark};
  `,
  TitleFrame: styled.div`
    margin-top: 80px;
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
    margin: auto 0 50px 0;
    gap: 12px;
    & div {
      margin: 0 auto;
    }
  `,

  GIF: styled.img`
    width: 95%;
    margin: 150px auto 0;
  `,
};
export default PurchaseSuccess;
