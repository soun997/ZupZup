import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { URL } from 'utils';
import { Navigation, ProgressBar, MyPageNav, KeyFrameList } from 'components';
import { CharacterInfo, ProfileInfo } from 'types/ProfileInfo';
import BoardSvg from 'assets/icons/clipboard.svg?react';
import { useAppSelector } from 'hooks';
import { MemberApi } from 'api';
import { Loading } from 'pages';

const calculateDaysPassed = (inputDate: string): number => {
  const inputDateObj = new Date(inputDate);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - inputDateObj.getTime();

  const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysPassed;
};

const MyPage = () => {
  const navigate = useNavigate();
  const curTheme = useAppSelector(state => state.themeChanger.value);
  const [isDaytime, setIsDaytime] = useState<boolean>(true);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>();
  const [characterInfo, setCharacterInfo] = useState<CharacterInfo>();

  const fetchMyPageInfo = async () => {
    try {
      const profileResponse = await MemberApi.getProfileInfo();
      const characterResponse = await MemberApi.getCharacterInfo();
      const profile: ProfileInfo = profileResponse.data.results;
      const character: CharacterInfo = characterResponse.data.results;

      setProfileInfo(profile);
      setCharacterInfo(character);
    } catch (error) {
      console.error('Error fetching profile info:', error);
    }
  };

  useEffect(() => {
    fetchMyPageInfo();
  }, []);

  useEffect(() => {
    if (curTheme === 'light') {
      setIsDaytime(true);
    } else {
      setIsDaytime(false);
    }
  }, [curTheme]);

  if (!profileInfo || !characterInfo) {
    return <Loading />;
  }
  return (
    <S.Wrap $daytime={isDaytime}>
      <S.Content>
        <MyPageNav coin={profileInfo.coin} />
        <S.Title $daytime={isDaytime}>
          {profileInfo.name}님과 함께한지 <br />
          {calculateDaysPassed(profileInfo.createdAt)} 일째
        </S.Title>
        <S.Level>
          <S.SubInfo $daytime={isDaytime}>
            레벨 {characterInfo.level + 1} 까지
          </S.SubInfo>
          <ProgressBar score={characterInfo.exp} total={100} />
        </S.Level>
        <S.Report $daytime={isDaytime}>
          <BoardSvg onClick={() => navigate(URL.MYPAGE.REPORT)} />
        </S.Report>
      </S.Content>

      <S.Image
        src={`${import.meta.env.VITE_S3_URL}/character/penguin-lv${
          characterInfo.level
        }.png`}
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
        ? `url("${import.meta.env.VITE_S3_URL}/character/egloo-crop.jpg")`
        : `url("${
            import.meta.env.VITE_S3_URL
          }/character/egloo-crop-night.jpg")`};
    background-size: cover;
    color: ${({ theme }) => theme.color.dark};
  `,
  Title: styled.div<StyleProps>`
    color: ${({ $daytime }) => ($daytime ? '#01302D' : '#fff')};
    font-size: ${({ theme }) => theme.font.size.display1};
    font-family: ${({ theme }) => theme.font.family.title};
    line-height: 30px;
    text-align: right;
    margin-top: 30px;
  `,

  Content: styled.div`
    padding: 0 20px;
    display: flex;
    flex-direction: column;
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
    color: ${({ $daytime }) => ($daytime ? '#01302D' : '#fff')};
    font-size: ${({ theme }) => theme.font.size.body3};
    font-family: ${({ theme }) => theme.font.family.focus2};
  `,

  Report: styled.div<StyleProps>`
    cursor: pointer;
    font-family: ${({ theme }) => theme.font.family.focus2};
    display: flex;
    align-items: center;
    margin-top: 20px;
    justify-content: center;
    border-radius: 50%;
    border: 3px solid white;
    padding: 4px;
    width: fit-content;
    align-self: flex-end;
    filter: drop-shadow(
      0px 0px 20px
        ${({ $daytime }) =>
          $daytime ? 'rgba(26, 90, 228, 0.329)' : 'rgba(255, 255, 255, 0.77)'}
    );
  `,
};

export default MyPage;
