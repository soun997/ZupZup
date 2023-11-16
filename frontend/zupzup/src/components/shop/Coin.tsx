import CoinSvg from 'assets/icons/coin.svg?react';
import styled from 'styled-components';

const Coin = ({ coin }: { coin: number }) => {
  return (
    <CurrentCoin>
      <CoinSvg />
      <span>{coin}</span>
    </CurrentCoin>
  );
};
const CurrentCoin = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  & span {
    color: ${({ theme }) => theme.color.gray2};
    font-weight: ${({ theme }) => theme.font.weight.body1};
    font-size: ${({ theme }) => theme.font.size.body1};
    font-family: ${({ theme }) => theme.font.family.focus1};
    margin: 2px 10px 0 0;
  }
`;
export default Coin;
