import styled from 'styled-components';
import * as utils from 'utils';
import { ConfirmButton, TopNavigation } from 'components';
import { useNavigate } from 'react-router-dom';

const WorkingPage = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(utils.URL.OPINION);
  };
  return (
    <S.Wrap>
      <TopNavigation />
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
        <div className="text">줍줍팀에게 피드백은 언제든 환영입니다!</div>
        <ConfirmButton text="의견 남기기" onClick={handleNavigate} />
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
    color: ${({ theme }) => theme.color.dark};
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
    margin: auto 0 50px 0;
    width: 100%;
    & .text {
      margin-top: 30px;
      margin-bottom: -30px;
      font-size: ${({ theme }) => theme.font.size.body3};
      font-family: ${({ theme }) => theme.font.family.body3};
    }
  `,
  BottomText: styled.div`
    font-size: ${({ theme }) => theme.font.size.body3};
    font-weight: ${({ theme }) => theme.font.weight.body3};
    font-family: ${({ theme }) => theme.font.family.body3};
    line-height: ${({ theme }) => theme.font.lineheight.body3};
  `,
  Image: styled.img`
    width: 90%;
    margin-top: 20px;
  `,
};
export default WorkingPage;
