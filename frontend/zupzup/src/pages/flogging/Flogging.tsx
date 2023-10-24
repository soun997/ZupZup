import styled from 'styled-components';

import { FloggingBackground, FloggingMap, Navigation } from 'components';

const Flogging = () => {
  return (
    <S.Wrap>
      <FloggingBackground />
      <FloggingMap />
      <Navigation />
    </S.Wrap>
  );
};

export default Flogging;

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
