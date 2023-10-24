import { Navigation } from 'components';
import MyPageNav from 'components/mypage/MyPageNav';
import styled from 'styled-components';

const profileInfo = {
  nickname: '줍줍',
  characterImage: 'assets/images/character.png',
  day: 12,
  level: 1,
  exp: 160,
  lastFlogging: {
    count: 2,
    hour: 2,
    calorie: 200,
  },
};
const MyPage = () => {
  return (
    <S.Wrap>
      <S.Content>
        <MyPageNav coin={320} />
        <S.Title>
          {profileInfo.nickname}님과 함께한지 <br /> {profileInfo.day} 일째
        </S.Title>
      </S.Content>
      <S.Image src={profileInfo.characterImage}></S.Image>
      <Navigation />
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100vh;
    background: url('assets/images/mypage-wall.png');
  `,
  Title: styled.div`
    font-size: ${({ theme }) => theme.font.size.display1};
    font-family: ${({ theme }) => theme.font.family.title};
    line-height: 29px;
    text-align: right;
    margin-top: 30px;
  `,

  Content: styled.div`
    padding: 0 20px;
  `,

  Image: styled.img`
    position: absolute;
    bottom: 110px;
    margin-left: 30px;
    width: 200px;
  `,
};

export default MyPage;
