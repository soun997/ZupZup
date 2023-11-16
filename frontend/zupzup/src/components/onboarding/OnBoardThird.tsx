import styled from 'styled-components';

const OnBoardThird = () => {
  return (
    <S.Wrap>
      <S.TitleFrame>
        <S.MainTitle>
          쓰레기통 버튼을 누르면
          <br />주변의 쓰레기통 위치를 확인할 수 있어요
        </S.MainTitle>
        <S.SubTitle>주운 쓰레기를 꼭 쓰레기통에 버려주세요!</S.SubTitle>
      </S.TitleFrame>
      <S.Image
        src={`${import.meta.env.VITE_S3_URL}/character/penguin-trash.png`}
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
export default OnBoardThird;
