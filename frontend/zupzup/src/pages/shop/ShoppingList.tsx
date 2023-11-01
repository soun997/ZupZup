import { Coin, DrawerCarousel, TopNavigation } from 'components';
import styled from 'styled-components';
import { Food } from 'types/Food';

const FoodList: Food[] = [
  { id: 1, image: '/assets/images/food/food1.png' },
  { id: 2, image: '/assets/images/food/food2.png' },
  { id: 3, image: '/assets/images/food/food3.png' },
  { id: 4, image: '/assets/images/food/food4.png' },
  { id: 5, image: '/assets/images/food/food5.png' },
  { id: 6, image: '/assets/images/food/food6.png' },
  { id: 1, image: '/assets/images/food/food7.png' },
  { id: 1, image: '/assets/images/food/food8.png' },
  { id: 1, image: '/assets/images/food/food9.png' },
  { id: 1, image: '/assets/images/food/food10.png' },
  { id: 1, image: '/assets/images/food/food11.png' },
];
const ShoppingList = () => {
  return (
    <S.Wrap>
      <TopNavigation rightComponent={<Coin coin={320} />} />
      <S.TitleFrame>
        <S.MainTitle>상점</S.MainTitle>
        <S.SubTitle>캐릭터의 성장을 위한 아이템을 구매해보세요!</S.SubTitle>
      </S.TitleFrame>
      <DrawerCarousel foodList={FoodList} />
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
