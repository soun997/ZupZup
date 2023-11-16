import styled from 'styled-components';

const OnBoardFourth = () => {
  return (
    <S.Wrap>
      <S.TitleFrame>
        <S.MainTitle>
          플로깅이 끝난 후에도
          <br /> 
          플로깅 기록을 조회할 수 있어요
        </S.MainTitle>
        <S.SubTitle>캘린더에서 과거 플로깅 기록을 조회해보세요</S.SubTitle>
      </S.TitleFrame>
      <S.Image
        src={`${import.meta.env.VITE_S3_URL}/character/penguin-submit.png`}
      />
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
  `,
  TitleFrame: styled.div`
    margin-top: 50px;
    text-align: center;
  `,
  MainTitle: styled.div`
    font-size: ${({ theme }) => theme.font.size.display2};
    font-family: ${({ theme }) => theme.font.family.display2};
    font-weight: ${({ theme }) => theme.font.weight.body2};
    color: ${({ theme }) => theme.color.dark};
    line-height: 1.45;
  `,
  SubTitle: styled.div`
    margin-top: 15px;
    color: ${({ theme }) => theme.color.gray2};
    font-size: ${({ theme }) => theme.font.size.body2};
    font-family: ${({ theme }) => theme.font.family.body2};
    font-weight: ${({ theme }) => theme.font.weight.body2};
    line-height: ${({ theme }) => theme.font.lineheight.body2};
  `,
  Image: styled.img`
    margin: auto;
    width: 100%;
  `,
};
export default OnBoardFourth;
