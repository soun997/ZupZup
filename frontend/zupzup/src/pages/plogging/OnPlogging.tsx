import { useState } from 'react';
import styled from 'styled-components';

import {
  ExitModal,
  OnPloggingHeader,
  PloggingMap,
  OnPloggingBackground,
} from 'components';
import { useStopWatch } from 'hooks';

const OnPlogging = () => {
  const [exitOn, setExitOn] = useState<boolean>(false);
  const [ploggingInfoOn, setPloggingInfoOn] = useState<boolean>(false);
  const stopwatch = useStopWatch();

  return (
    <S.Wrap>
      {exitOn && <ExitModal setExitOn={setExitOn} />}
      <OnPloggingHeader exitOn={exitOn} setExitOn={setExitOn} />
      <OnPloggingBackground
        time={stopwatch}
        exitOn={exitOn}
        setExitOn={setExitOn}
        ploggingInfoOn={ploggingInfoOn}
        setPloggingInfoOn={setPloggingInfoOn}
      />
      <PloggingMap exitOn={exitOn} ploggingInfoOn={ploggingInfoOn} />
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
