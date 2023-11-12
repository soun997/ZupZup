import styled, { keyframes } from 'styled-components';

import { useCountdownTimer } from 'hooks';
import * as utils from 'utils';

const OnBoarding = () => {
  useCountdownTimer(3, utils.URL.LOGIN.HOME);

  return (
    <S.Wrap>
      <S.Title>줍줍</S.Title>
      {/* <S.Background src={`${import.meta.env.VITE_S3_URL}/background-3.png`} /> */}
    </S.Wrap>
  );
};

export default OnBoarding;

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const S = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100dvh;

    background-image: url(${import.meta.env.VITE_S3_URL}/background-3.png);
    background-size: cover;
  `,
  Title: styled.div`
    margin-top: 160px;
    /* transform: translateY(150px); */
    text-align: center;
    font-family: ${({ theme }) => theme.font.family.title};
    font-size: 80px;
    color: #fff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
    z-index: 1;
    animation: ${FadeIn} 2s;
  `,

  Background: styled.img`
    animation: ${FadeIn} 2s;
  `,
};
