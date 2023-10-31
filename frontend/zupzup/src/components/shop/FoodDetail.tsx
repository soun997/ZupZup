import styled from 'styled-components';
import { FoodDetail } from 'types/Food';

const FoodDetail = ({ foodDetail }: { foodDetail: FoodDetail }) => {
  return (
    <S.Wrap>
      <S.Image src={foodDetail.image} />
      <S.Title>{foodDetail.name}</S.Title>
      <S.SubTitle>{foodDetail.coin} 코인</S.SubTitle>
      <S.Body>능력치 : 캐릭터의 성장도 + {foodDetail.exp}</S.Body>
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
    width: 200px;
    height: 200px;
  `,

  Title: styled.div`
    font-size: 20px;
    font-family: ${({ theme }) => theme.font.family.focus1};
    margin-top: 42px;
  `,
  SubTitle: styled.div`
    color: ${({ theme }) => theme.color.main};
    font-size: ${({ theme }) => theme.font.size.focus1};
    font-family: ${({ theme }) => theme.font.family.focus1};
    margin-top: 10px;
  `,
  Body: styled.div`
    color: ${({ theme }) => theme.color.gray2};
    font-size: ${({ theme }) => theme.font.size.body3};
    font-family: ${({ theme }) => theme.font.family.focus1};
    margin-top: 22px;
  `,
};

export default FoodDetail;
