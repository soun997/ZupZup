import { useState } from 'react';
import styled from 'styled-components';

import { PloggingInfo, PloggingMap, OnPloggingBackground } from 'components';

const OnPlogging = () => {
  const [exitOn, setExitOn] = useState<boolean>(false);
  const [ploggingInfoOn, setPloggingInfoOn] = useState<boolean>(false);

  return (
    <S.Wrap>
      <PloggingInfo
        exitOn={exitOn}
        setExitOn={setExitOn}
        ploggingInfoOn={ploggingInfoOn}
        setPloggingInfoOn={setPloggingInfoOn}
      />
      <OnPloggingBackground exitOn={exitOn} setExitOn={setExitOn} />
      <PloggingMap exitOn={exitOn} />
    </S.Wrap>
  );
};

export default OnPlogging;

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
