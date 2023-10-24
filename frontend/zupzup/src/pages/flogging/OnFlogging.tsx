import styled from 'styled-components';

import { FloggingMap, OnFloggingBackground } from 'components';

const OnFlogging = () => {
  return (
    <S.Wrap>
      <OnFloggingBackground />
      <FloggingMap />
    </S.Wrap>
  );
};

export default OnFlogging;

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
