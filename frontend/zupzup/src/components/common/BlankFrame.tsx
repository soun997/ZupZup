import styled from 'styled-components';

interface Props {
  margin: number;
}

const BlankFrame = ({ margin }: Props) => {
  return <Frame margin={margin}></Frame>;
};

const Frame = styled.div<Props>`
  margin-top: ${({ margin }) => margin}px;
`;
export default BlankFrame;
