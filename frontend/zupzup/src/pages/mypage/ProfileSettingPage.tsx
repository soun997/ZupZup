import { styled } from 'styled-components';
import { Navigation, SettingComponent, TopNavigation } from 'components';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';
import ModifSvg from 'assets/icons/pencil-modif.svg?react';
import { store } from 'hooks';
import { HealthInfo } from 'types/ProfileInfo';
import { MemberApi } from 'api';
import { useEffect, useState } from 'react';
import { Loading } from 'pages';

const ProfileSettingPage = () => {
  const navigate = useNavigate();
  const name = store.getState().auth.name;
  const [healthInfo, setHealthInfo] = useState<HealthInfo>();

  const fetchHealthInfo = async () => {
    try {
      const response = await MemberApi.getHealthInfo();
      const data = response.data.results;
      setHealthInfo(data);
    } catch (error) {
      console.error('Error fetching report info:', error);
    }
  };
  const handleNavigate = () => {
    navigate(utils.URL.ONBORDING.WORKING);
  };

  useEffect(() => {
    fetchHealthInfo();
  }, []);

  if (!healthInfo) {
    return <Loading />;
  }
  return (
    <S.Wrap>
      <TopNavigation title="내 정보" rightComponent={<></>} />

      <S.SettingSection>
        <S.SubTitle>내 정보</S.SubTitle>
        <SettingComponent
          text={`${name} 님`}
          svg={<ModifSvg />}
          onClick={handleNavigate}
        />
        <SettingComponent
          text={healthInfo.birthYear.toString()}
          svg={<ModifSvg />}
          onClick={handleNavigate}
        />
      </S.SettingSection>

      <S.SettingSection>
        <S.SubTitle>신체 정보</S.SubTitle>
        <SettingComponent
          text={healthInfo.height.toString() + 'cm'}
          svg={<ModifSvg />}
          onClick={handleNavigate}
        />
        <SettingComponent
          text={healthInfo.weight.toString() + 'kg'}
          svg={<ModifSvg />}
          onClick={handleNavigate}
        />
      </S.SettingSection>
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
    background-color: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.dark};
  `,
  SettingSection: styled.div`
    margin-top: 10px;
    margin-left: 24px;
  `,

  SubTitle: styled.div`
    display: flex;
    width: 100%;
    height: 52px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    font-size: ${({ theme }) => theme.font.size.focus2};
    font-family: ${({ theme }) => theme.font.family.focus1};
  `,
};

export default ProfileSettingPage;
