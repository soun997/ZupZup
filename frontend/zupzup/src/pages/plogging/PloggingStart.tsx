import styled from 'styled-components';

import { FloggingStartBackground, FloggingMap, Navigation } from 'components';

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
