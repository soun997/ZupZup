import { Coin, TopNavigation } from 'components';
import styled from 'styled-components';

const ShoppingList = () => {
  return (
    <S.Wrap>
      <TopNavigation rightComponent={<Coin coin={320} />} />
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100vh;
  `,
};
export default ShoppingList;
