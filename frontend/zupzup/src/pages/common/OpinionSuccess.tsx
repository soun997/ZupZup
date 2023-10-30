import styled from 'styled-components';
import { SuccessAnimation } from 'components';
import useCountdownTimer from 'hooks/useCountdownTimer';
import * as utils from 'utils';

const OpinionSuccess = () => {
  const time = useCountdownTimer(3, utils.URL.MYPAGE.HOME);
  return (
    <S.Wrap>
      <S.TitleFrame>
        <S.MainTitle>전송이 완료되었어요!</S.MainTitle>
        <S.SubTitle>더 나은 서비스를 위한 의견 감사드립니다</S.SubTitle>
      </S.TitleFrame>
      <SuccessAnimation />
      <S.BottomFrame>
        <S.BottomText>{time}초 후 마이페이지로 이동합니다</S.BottomText>
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
  `,
  MainTitle: styled.div`
    font-size: ${({ theme }) => theme.font.size.display1};
    font-family: ${({ theme }) => theme.font.family.display1};
    font-weight: ${({ theme }) => theme.font.weight.body2};
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 35px;
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
    position: absolute;
    bottom: 0;
    width: 100%;
    margin-bottom: 35px;
  `,
  BottomText: styled.div`
    font-size: ${({ theme }) => theme.font.size.body3};
    font-family: ${({ theme }) => theme.font.family.body3};
    font-weight: ${({ theme }) => theme.font.weight.body3};
    line-height: ${({ theme }) => theme.font.lineheight.body3};
  `,
};
export default OpinionSuccess;
