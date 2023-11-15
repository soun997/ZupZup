import { TopNavigation } from 'components';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';
import styled from 'styled-components';
import ShareSvg from 'assets/icons/share.svg?react';

const characterName = '펭깅';
const CharacterInfo = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(utils.URL.LOGIN.HOME);
  };
  return (
    <S.Wrap>
      <TopNavigation />
      <S.Content>
        <S.Image
          src={`${import.meta.env.VITE_S3_URL}/character/penguin-message.png`}
        ></S.Image>
        <S.TextContent>
          만나서 반가워요, 저는 {characterName}이에요
          <br />
          저희 서비스는 홈화면에 추가해주시면 더 쉽고!
          <br /> 정확하게! 서비스를 이용해주실수 있답니다 🙏
        </S.TextContent>

        <S.Section>
          <S.SubSection>
            <div className="title">🌝 Android</div>
            <div className="content">
              1. Chrome 에서 접속해주세요 <br />
              2. 상단에 앱 설치 알림이 뜨면 "설치" 를 눌러주세요
            </div>
          </S.SubSection>
          <S.SubSection>
            <div className="title">🌝 IOS</div>
            <div className="content">
              1. Safari 나 Chrome 으로 접속해주세요 <br />
              <div className="icon">
                2. 상단이나 하단 Nav 바의 &nbsp;
                <ShareSvg /> &nbsp;버튼을 누르고
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;홈 화면에 추가를 클릭해주세요
            </div>
          </S.SubSection>
        </S.Section>

        <S.MoreButton>
          <div className="info">
            서비스를 웹 브라우저에서 이용하고싶으신가요?
          </div>
          <div className="button" onClick={handleNavigate}>
            서비스 화면으로 이동
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
    height: 100dvh;
    background-color: ${({ theme }) => theme.color.background};
    font-family: ${({ theme }) => theme.font.family.body2};
    color: ${({ theme }) => theme.color.dark};
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
    font-family: ${({ theme }) => theme.font.family.focus2};

    & .title {
      font-family: ${({ theme }) => theme.font.family.focus2};
      font-size: ${({ theme }) => theme.font.size.focus2};
    }

    & .content {
      margin-top: 10px;
      padding: 20px;
      background-color: ${({ theme }) => theme.color.white};
      font-family: ${({ theme }) => theme.font.family.focus2};
      line-height: 2;

      & .icon {
        display: flex;
        align-items: center;
        font-family: ${({ theme }) => theme.font.family.focus2};
        & svg {
          width: 20px;
        }
      }
    }
  `,

  IconSection: styled.img`
    width: 40%;
  `,

  MoreButton: styled.div`
    margin-top: -20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    line-height: 1.2;
    margin-bottom: 30px;
    & .button {
      width: 100%;
      cursor: pointer;
      margin-top: 10px;
      padding: 10px 30px;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.color.main};
      color: #fff;
      font-family: ${({ theme }) => theme.font.family.focus2};
      font-size: ${({ theme }) => theme.font.size.body2};
    }
  `,
};
export default CharacterInfo;
