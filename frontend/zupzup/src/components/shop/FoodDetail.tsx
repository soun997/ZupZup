import styled from 'styled-components';
import { FoodDetail } from 'types/Food';

const FoodDetail = ({ foodDetail }: { foodDetail: FoodDetail }) => {
  return (
    <S.Wrap>
      <S.Image src={foodDetail.image} />
      <S.Title>{foodDetail.name}</S.Title>
      <S.Content>지금까지 이런 소시지는 없었다. 이것은..더보기</S.Content>
      <S.Body>능력치 : 캐릭터의 성장도 + {foodDetail.exp}</S.Body>
      <S.SubTitle>$ {foodDetail.coin} 코인</S.SubTitle>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Image: styled.img`
    width: 75%;
  `,

  Title: styled.div`
    font-size: 20px;
    font-family: ${({ theme }) => theme.font.family.focus1};
    margin-top: 5%;
  `,
  SubTitle: styled.div`
    color: ${({ theme }) => theme.color.main};
    font-size: ${({ theme }) => theme.font.size.focus1};
    font-family: ${({ theme }) => theme.font.family.focus1};
    margin-top: 2px;
  `,
  Body: styled.div`
    color: ${({ theme }) => theme.color.gray2};
    font-size: ${({ theme }) => theme.font.size.body2};
    font-family: ${({ theme }) => theme.font.family.focus1};
    margin: 12px 0;
  `,

  Content: styled.div`
    color: ${({ theme }) => theme.color.gray2};
    font-size: ${({ theme }) => theme.font.size.body3};
    font-family: ${({ theme }) => theme.font.family.body1};
    margin: 10px 0;
  `,
};

export default FoodDetail;
