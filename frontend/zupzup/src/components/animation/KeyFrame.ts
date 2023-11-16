import { keyframes } from 'styled-components';

const keyframeForOneLevel = keyframes`
  0%{
    transform: rotate(0deg);
  }
  50%{
    transform: rotate(10deg);
  }
  100%{
    transform: rotate(0deg);
  }
`;
const keyframeForTwoLevel = keyframes`
  0%{
    transform: translateX(-50px);
  }
  50%{
    transform: translateX(-10px);
  }
  100%{
    transform: translateX(10px) translateY(-10px);
  }
`;

const keyframeForThreeLevel = keyframes`
  0%{
    transform: translateX(-50px) rotate(-10deg);
  }
  50%{
    transform: translateX(-10px) rotate(0deg);
  }
  100%{
    transform: translateX(10px) translateY(-10px) rotate(10deg);
  }
`;

const KeyFrameList = [
  keyframeForOneLevel,
  keyframeForTwoLevel,
  keyframeForThreeLevel,
];

export default KeyFrameList;
