import { Coin, DrawerCarousel, TopNavigation } from 'components';
import styled from 'styled-components';
import { URL } from 'utils';
import { Food } from 'types/Food';
import { useEffect, useState } from 'react';
import { Loading } from 'pages';
import { ItemApis } from 'api';
import { store } from 'hooks';

const ShoppingList = () => {
  const [foodList, setFoodList] = useState<Food[]>();
  const coin = store.getState().auth.coin;

  const fetchFoodList = async () => {
    try {
      const response = await ItemApis.getItemList();
      const data = response.data.results;
      setFoodList(data);
    } catch (error) {
      console.error('Error fetching report info:', error);
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  if (!foodList) {
    return <Loading />;
  }
  return (
    <S.Wrap>
      <TopNavigation
        rightComponent={<Coin coin={coin} />}
        navigationTo={URL.MYPAGE.HOME}
      />
      <S.TitleFrame>
        <S.MainTitle>상점</S.MainTitle>
        <S.SubTitle>캐릭터의 성장을 위한 아이템을 구매해보세요!</S.SubTitle>
      </S.TitleFrame>
      <DrawerCarousel foodList={foodList} />
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
    color: ${({ theme }) => theme.color.dark};
  `,

  TitleFrame: styled.div`
    margin: 24px 0 0 20px;
  `,
  MainTitle: styled.div`
    font-size: ${({ theme }) => theme.font.size.display1};
    font-family: ${({ theme }) => theme.font.family.display1};
    font-weight: ${({ theme }) => theme.font.weight.body2};
    line-height: ${({ theme }) => theme.font.lineheight.display1};
  `,
  SubTitle: styled.div`
    margin-top: 6px;
    color: ${({ theme }) => theme.color.gray2};
    font-size: ${({ theme }) => theme.font.size.body2};
    font-family: ${({ theme }) => theme.font.family.body2};
    font-weight: ${({ theme }) => theme.font.weight.body2};
    line-height: ${({ theme }) => theme.font.lineheight.body2};
  `,
};
export default ShoppingList;
