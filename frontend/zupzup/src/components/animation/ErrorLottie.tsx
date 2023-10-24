import Lottie from 'lottie-react';
import errorLottie from 'assets/lottie/404-lottie.json';
import styled from 'styled-components';

const ErrorAnimation = () => {
  return (
    <LottieFrame>
      <Lottie
        className="lottie"
        animationData={errorLottie}
        height={200}
        width={200}
      />
    </LottieFrame>
  );
};

const LottieFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .lottie {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 90%;
  }
`;
export default ErrorAnimation;
