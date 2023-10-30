import { TopNavigation } from 'components';
import styled from 'styled-components';
const Opinion = () => {
  return (
    <S.Wrap>
      <TopNavigation />
      <S.TitleFrame>
        <S.MainTitle>펭귄이에게 하고 싶은 말이 있나요 ?</S.MainTitle>
        <S.SubTitle>
          주신 의견은 한글자도 빼놓지 않고 꼼꼼히 읽어볼게요!
        </S.SubTitle>
      </S.TitleFrame>
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
    height: 100vh;
    background-color: ${({ theme }) => theme.color.background};
  `,
  TitleFrame: styled.div`
    margin-top: 75px;
    text-align: center;
  `,
  MainTitle: styled.div`
    font-size: ${({ theme }) => theme.font.size.display1};
    font-family: ${({ theme }) => theme.font.family.display1};
    font-weight: ${({ theme }) => theme.font.weight.body2};
    line-height: ${({ theme }) => theme.font.lineheight.display1};
  `,
  SubTitle: styled.div`
    margin-top: 10px;
    color: ${({ theme }) => theme.color.gray2};
    font-size: ${({ theme }) => theme.font.size.body2};
    font-family: ${({ theme }) => theme.font.family.body2};
    font-weight: ${({ theme }) => theme.font.weight.body2};
    line-height: ${({ theme }) => theme.font.lineheight.body2};
  `,
};
export default Opinion;
