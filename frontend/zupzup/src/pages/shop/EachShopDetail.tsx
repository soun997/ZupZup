import { Coin, ConfirmButton, FoodDetailPage, TopNavigation } from 'components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FoodDetail } from 'types/Food';
import * as utils from 'utils';
import { ItemApis } from 'api';
import { Loading } from 'pages';
import { setCoin, store } from 'hooks';
import { useDispatch } from 'react-redux';

const EachShopDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const coin = store.getState().auth.coin;

  const [foodDetail, setFoodDetail] = useState<FoodDetail>();

  const fetchFoodDetail = async () => {
    try {
      const response = await ItemApis.getEachItem(Number(id));
      const data = response.data.results;
      setFoodDetail(data);
    } catch (error) {
      console.error('Error fetching detail info:', error);
    }
  };

  const purchaseItem = async () => {
    if (coin < foodDetail!.price) {
      alert('구매 불가능 합니다');
      return;
    }
    try {
      const response = await ItemApis.buyItem(foodDetail!.id);
      const data = response.data.results.coin;
      dispatch(setCoin(data));
      navigate(utils.URL.MYPAGE.PURCHASE, { state: foodDetail?.exp });
    } catch (error) {
      console.error('Error purchase item:', error);
    }
  };

  useEffect(() => {
    fetchFoodDetail();
  }, []);

  if (!foodDetail) {
    return <Loading />;
  }

  return (
    <S.Wrap>
      <TopNavigation rightComponent={<Coin coin={coin} />} />
      <S.TitleFrame>
        <S.MainTitle>상점</S.MainTitle>
        <S.SubTitle>캐릭터의 성장을 위한 아이템을 구매해보세요!</S.SubTitle>
      </S.TitleFrame>
      <S.Content>
        <FoodDetailPage foodDetail={foodDetail} />
        <S.ButtonSection>
          <ConfirmButton
            text="다시 선택하기"
            color="#a0a0a0"
            onClick={() => navigate(utils.URL.MYPAGE.SHOP)}
          />
          <ConfirmButton
            text={coin >= foodDetail.id ? '구입하기' : '구매 불가'}
            onClick={purchaseItem}
            color={coin >= foodDetail.id ? '#00C4B8' : '#a0a0a0'}
          />
        </S.ButtonSection>
      </S.Content>
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

  Content: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    height: 100%;
  `,

  ButtonSection: styled.div`
    margin: auto 0 50px 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
    & div {
      margin: 0 auto;
    }
  `,
};

export default EachShopDetail;
