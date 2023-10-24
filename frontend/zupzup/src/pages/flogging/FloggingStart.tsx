import styled from 'styled-components';

<<<<<<< HEAD:frontend/zupzup/src/pages/flogging/FloggingStart.tsx
import { FloggingStartBackground, FloggingMap, Navigation } from 'components';
=======
import { FloggingBackground, FloggingMap, Navigation } from 'components';
>>>>>>> c27f15b74edb21b3656a9e0143f8e100066e19d1:frontend/zupzup/src/pages/flogging/Flogging.tsx

const FloggingStart = () => {
  return (
    <S.Wrap>
      <FloggingStartBackground />
      <FloggingMap />
      <Navigation />
    </S.Wrap>
  );
};

export default FloggingStart;

const S = {
  Wrap: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.color.background};
  `,
};
