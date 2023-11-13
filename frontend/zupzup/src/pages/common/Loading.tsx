import styled from 'styled-components';
import { LoadingAnimation } from 'components';

const Loading = () => {
  return (
    <S.Wrap>
      <LoadingAnimation />
      <S.Text>데이터가 로딩중입니다</S.Text>
      <S.SubText>
        (로딩바가 멈추더라도 진행중이니 조금만 기다려주세요!)
      </S.SubText>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100dvh;
    background-color: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.dark};
  `,

  Text: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -30px;
    font-weight: ${({ theme }) => theme.font.weight.focus3};
    font-size: ${({ theme }) => theme.font.size.body2};
    font-family: ${({ theme }) => theme.font.family.body2};
  `,

  SubText: styled.div`
    font-weight: ${({ theme }) => theme.font.weight.body3};
    font-size: ${({ theme }) => theme.font.size.body3};
    font-family: ${({ theme }) => theme.font.family.body2};
    color: ${({ theme }) => theme.color.main};
    margin-top: 6px;
  `,
};
export default Loading;
