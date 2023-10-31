import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Navigation, ProgressBar, MyPageNav, KeyFrameList } from 'components';
import { CharacterInfo, ProfileInfo } from 'types/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';

const profileInfo: ProfileInfo = {
  name: '줍줍',
  coin: 320,
  createdAt: '2023-10-12',
};

const characterInfo: CharacterInfo = {
  level: 1,
  exp: 160,
};

const calculateDaysPassed = (inputDate: string): number => {
  const inputDateObj = new Date(inputDate);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - inputDateObj.getTime();

  const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysPassed;
};

const MyPage = () => {
  const navigate = useNavigate();
  const [isDaytime, setIsDaytime] = useState<boolean>(true);

  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    const isDay = currentHour >= 6 && currentHour < 18;

    setIsDaytime(isDay);
  }, []);

  return (
    <S.Wrap $daytime={isDaytime}>
      <S.Content>
        <MyPageNav coin={320} />
        <S.Title $daytime={isDaytime}>
          {profileInfo.name}님과 함께한지 <br />{' '}
          {calculateDaysPassed(profileInfo.createdAt)} 일째
        </S.Title>
        <S.Level>
          <S.SubInfo $daytime={isDaytime}>
            레벨 {characterInfo.level + 1} 까지{' '}
          </S.SubInfo>
          <ProgressBar score={characterInfo.exp} total={200} />
        </S.Level>
        <S.Report $daytime={isDaytime}>
          <img
            src="/assets/images/mail.png"
            onClick={() => navigate(utils.URL.MYPAGE.REPORT)}
          />
        </S.Report>
      </S.Content>

      <S.Image
        src={`/assets/character/penguin-lv${characterInfo.level}.png`}
        $daytime={isDaytime}
        level={characterInfo.level}
      ></S.Image>
      <Navigation />
    </S.Wrap>
  );
};

interface StyleProps {
  $daytime: boolean;
  level?: number;
}
const S = {
  Wrap: styled.div<StyleProps>`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100vh;
    background: ${({ $daytime }) =>
      $daytime
        ? 'url("/assets/character/egloo-crop.jpg")'
        : 'url("/assets/character/egloo-crop-night.jpg")'};
    background-size: cover;
  `,
  Title: styled.div<StyleProps>`
    color: ${({ theme, $daytime }) =>
      $daytime ? '#01302D' : theme.color.white};
    font-size: ${({ theme }) => theme.font.size.display1};
    font-family: ${({ theme }) => theme.font.family.title};
    line-height: 30px;
    text-align: right;
    margin-top: 30px;
  `,

  Content: styled.div`
    padding: 0 20px;
  `,

  Image: styled.img<StyleProps>`
    margin: auto 0 -24vh 8vw;
    width: ${props => `calc(45% + ${props.level ? props.level * 5 : 0}%)`};
    animation: ${props => KeyFrameList[(props.level && props.level - 1) || 0]}
      2s ease-in-out infinite;
  `,

  Level: styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 10px;
  `,
  SubInfo: styled.div<StyleProps>`
    color: ${({ theme, $daytime }) =>
      $daytime ? '#01302D' : theme.color.white};
    font-size: ${({ theme }) => theme.font.size.body3};
    font-family: ${({ theme }) => theme.font.family.focus2};
  `,

  Report: styled.div<StyleProps>`
    font-family: ${({ theme }) => theme.font.family.focus2};
    display: flex;
    align-items: center;
    margin-top: 20px;
    justify-content: flex-end;

    img {
      cursor: pointer;
      filter: drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.77));
      background-color: ${({ theme, $daytime }) =>
        $daytime ? theme.color.main : theme.color.main};
      border-radius: 50%;
      width: 45px;
    }
  `,
};

export default MyPage;
