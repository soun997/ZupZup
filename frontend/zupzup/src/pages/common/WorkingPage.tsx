import styled from 'styled-components';
import useCountdownTimer from 'hooks/useCountdownTimer';
import * as utils from 'utils';

const WorkingPage = () => {
  const time = useCountdownTimer(10, utils.URL.PLOGGING.LOBBY);

  return (
    <S.Wrap>
      <S.Image src="/assets/images/coding.png" />
      <S.Content>
        안녕하세요, 줍줍 개발자팀입니다 😀 <br />
        저희 서비스를 이용하시다가 이 페이지를 발견하게
        <br />
        하여 죄송할 따름입니다. <br />
        현 페이지는 개발 중에 있습니다 😢 <br />
        <br />
        빠른 시일 내에 개발을 완료하여 더 탄탄한 서비스로 찾아뵙겠습니다!
        약속할게요 🙏
      </S.Content>
      <S.BottomFrame>
        <S.BottomText>{time}초 후 메인화면으로 이동합니다</S.BottomText>
      </S.BottomFrame>
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
  Content: styled.div`
    display: flex;
    position: relative;
    padding: 30px 20px;
    margin: 0 20px;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.color.white};
    font-family: ${({ theme }) => theme.font.family.focus3};
    font-size: ${({ theme }) => theme.font.size.body3};
    font-weight: ${({ theme }) => theme.font.weight.body3};
    line-height: 2.4;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 0;
      height: 0;
      border: 20px solid transparent;
      border-bottom-color: ${({ theme }) => theme.color.white};
      border-top: 0;
      border-left: 0;
      margin-left: -10px;
      margin-top: -20px;
    }
  `,

  BottomFrame: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    margin-bottom: 35px;
  `,
  BottomText: styled.div`
    font-size: ${({ theme }) => theme.font.size.body3};
    font-weight: ${({ theme }) => theme.font.weight.body3};
    font-family: ${({ theme }) => theme.font.family.body3};
    line-height: ${({ theme }) => theme.font.lineheight.body3};
  `,
  Image: styled.img`
    width: 90%;
    margin-top: 80px;
  `,
};
export default WorkingPage;
