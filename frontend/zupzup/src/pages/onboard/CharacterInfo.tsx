import { TopNavigation } from 'components';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';
import styled from 'styled-components';

const characterName = '로귄';
const CharacterInfo = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(utils.URL.OPINION);
  };
  return (
    <S.Wrap>
      <TopNavigation />
      <S.Content>
        <S.Image src="/assets/character/penguin-message.png"></S.Image>
        <S.TextContent>
          안녕하세요, {'투이지'}님<br />
          저는 {characterName}이에요. <br />
          아래 과정을 거치면 제가 쑥쑥 자란답니다 🌱
        </S.TextContent>

        <S.Section>
          <S.SubSection>
            <div className="title">1. 플로깅을 하며 코인을 모아주세요</div>
            <div className="content">
              플로깅 중에는 좌측 하단에 카메라 버튼이 있어요. 이 카메라를 통해
              쓰레기 사진을 찍으면 쓰레기에 따라 다른 코인이 각각 부여돼요.{' '}
            </div>
          </S.SubSection>
          <S.SubSection>
            <div className="title">2. 코인을 통해 상점을 이용할 수 있어요</div>
            <div className="content">
              마이페이지에서는 그동안 플로깅으로 획득한 코인을 확인할 수 있어요.
              이 코인을 통해 상점에서 원하는 상품을 구매해보세요.
            </div>
          </S.SubSection>
          <S.SubSection>
            <div className="title">3. 성장 완료!</div>
            <div className="content">
              상품을 구입하면 해당 상품의 EXP 에 따라 제 경험치가 올라가요.
              <br />
              경험치에 따라 레벨이 부여되고, 레벨이 올라갈 수록 달라지는 제
              모습! 기대해주세요 🐧
            </div>
          </S.SubSection>
        </S.Section>

        <S.MoreButton>
          <div className="info">
            {characterName}이에게 하고싶은 말이 있으신가요?
          </div>
          <div className="button" onClick={handleNavigate}>
            {characterName}이에게 의견보내기
          </div>
        </S.MoreButton>
      </S.Content>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.color.background};
    font-family: ${({ theme }) => theme.font.family.body2};
  `,
  Content: styled.div`
    padding: 0 20px 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  `,
  MainTitle: styled.div`
    align-self: flex-start;
    font-size: ${({ theme }) => theme.font.size.display3};
    font-family: ${({ theme }) => theme.font.family.title};
  `,
  TextContent: styled.div`
    position: relative;
    margin: 10px 0 0;
    background-color: ${({ theme }) => theme.color.white};
    padding: 15px 20px;
    border-radius: 6px;
    line-height: 1.5;
    font-size: ${({ theme }) => theme.font.size.focus2};
    font-family: ${({ theme }) => theme.font.family.focus2};
    font-weight: ${({ theme }) => theme.font.family.focus2};

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 70%;
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
  Image: styled.img`
    width: 90%;
  `,

  Section: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 50px 0 30px;
  `,

  SubSection: styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    font-size: ${({ theme }) => theme.font.size.body3};
    font-family: ${({ theme }) => theme.font.family.body2};

    & .title {
      font-family: ${({ theme }) => theme.font.family.focus2};
      font-size: ${({ theme }) => theme.font.size.body2};
    }

    & .content {
      margin-top: 10px;
      padding: 20px;
      background-color: ${({ theme }) => theme.color.white};
      font-family: ${({ theme }) => theme.font.family.body2};
      line-height: 1.5;
    }
  `,

  IconSection: styled.img`
    width: 40%;
  `,

  MoreButton: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    & .button {
      cursor: pointer;
      margin-top: 10px;
      padding: 10px 30px;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.color.main};
      color: ${({ theme }) => theme.color.white};
    }
  `,
};
export default CharacterInfo;
