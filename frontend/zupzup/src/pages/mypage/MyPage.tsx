import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  Navigation,
  ProgressBar,
  MyPloggingReport,
  MyPageNav,
} from 'components';
import { ProfileInfo } from 'types/ProfileInfo';

const profileInfo: ProfileInfo = {
  nickname: '줍줍',
  characterImage: '/assets/character/penguin-baby.png',
  day: 12,
  level: 1,
  exp: 160,
  lastPlogging: {
    count: 2,
    hour: 2,
    calories: 200,
  },
};
const MyPage = () => {
  const [isDaytime, setIsDaytime] = useState(true);
  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    const isDay = currentHour >= 6 && currentHour < 18;

    setIsDaytime(isDay);
  }, []);

  return (
    <S.Wrap daytime={isDaytime}>
      <S.Content>
        <MyPageNav coin={320} />
        <S.Title daytime={isDaytime}>
          {profileInfo.nickname}님과 함께한지 <br /> {profileInfo.day} 일째
        </S.Title>
        <S.Level>
          <S.SubInfo daytime={isDaytime}>
            레벨 {profileInfo.level + 1} 까지{' '}
          </S.SubInfo>
          <ProgressBar score={profileInfo.exp} total={200} />
        </S.Level>
        <S.Report>
          <MyPloggingReport
            lastPlogging={profileInfo.lastPlogging}
            isDayTime={isDaytime}
          />
        </S.Report>
      </S.Content>

      <S.Image src={profileInfo.characterImage}></S.Image>
      <Navigation />
    </S.Wrap>
  );
};

const animation = keyframes`

  0%{
    transform: rotate(0deg);
  }
  50%{
    transform: rotate(10deg);
  }
  100%{
    transform: rotate(0deg);
  }
`;

interface StyleProps {
  daytime: boolean;
}
const S = {
  Wrap: styled.div<StyleProps>`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100vh;
    background: ${({ daytime }) =>
      daytime
        ? 'url("/assets/character/egloo-crop.jpg")'
        : 'url("/assets/character/egloo-crop-night.jpg")'};
    background-size: cover;
  `,
  Title: styled.div<StyleProps>`
    color: ${({ theme, daytime }) => (daytime ? '#01302D' : theme.color.white)};
    font-size: ${({ theme }) => theme.font.size.display1};
    font-family: ${({ theme }) => theme.font.family.title};
    line-height: 30px;
    text-align: right;
    margin-top: 30px;
  `,

  Content: styled.div`
    padding: 0 20px;
  `,

  Image: styled.img`
    margin: auto 0 -15vh 2vw;
    width: 50%;
    animation: ${animation} 2s ease-in-out infinite;
  `,

  Level: styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 10px;
  `,
  SubInfo: styled.div<StyleProps>`
    color: ${({ theme, daytime }) => (daytime ? '#01302D' : theme.color.white)};
    font-size: ${({ theme }) => theme.font.size.body3};
    font-family: ${({ theme }) => theme.font.family.focus2};
  `,

  Report: styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    justify-content: center;
  `,
};

export default MyPage;
