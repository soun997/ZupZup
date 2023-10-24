import Lottie from 'lottie-react';
import loadingLottie from 'assets/lottie/loading-lottie.json';
import styled from 'styled-components';

const LoadingAnimation = () => {
  return (
    <LottieFrame>
      <Lottie
        className="lottie"
        animationData={loadingLottie}
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
export default LoadingAnimation;
