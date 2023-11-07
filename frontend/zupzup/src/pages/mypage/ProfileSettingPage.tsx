import { styled } from 'styled-components';
import { Navigation, SettingComponent, TopNavigation } from 'components';
import ModifSvg from 'assets/icons/pencil-modif.svg?react';
import { store } from 'hooks';
import { HealthInfo } from 'types/ProfileInfo';
import { MemberApi } from 'api';
import { useEffect, useState } from 'react';
import { Loading } from 'pages';
import { ModifProfileInfo } from 'components';

const ProfileSettingPage = () => {
  const name = store.getState().auth.name;
  const [healthInfo, setHealthInfo] = useState<HealthInfo>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInfo, setNewInfo] = useState<number>(0);
  const [nowModifTitle, setNowModifTitle] = useState<string>('');

  const openModal = (title: string, info: number) => {
    setIsModalOpen(true);
    setNowModifTitle(title);
    setNewInfo(info);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInfoSave = async (title: string, info: string | number) => {
    const newHealthInfo = { ...healthInfo } as HealthInfo;

    switch (title) {
      case '출생연도':
        newHealthInfo.birthYear = info as number;
        break;
      case '키':
        newHealthInfo.height = info as number;
        break;
      case '몸무게':
        newHealthInfo.weight = info as number;
        break;
      default:
        break;
    }

    try {
      await MemberApi.putHealthInfo(newHealthInfo);
      setHealthInfo(newHealthInfo);
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  const fetchHealthInfo = async () => {
    try {
      const response = await MemberApi.getHealthInfo();
      const data = response.data.results;
      setHealthInfo(data);
    } catch (error) {
      console.error('Error fetching report info:', error);
    }
  };

  useEffect(() => {
    fetchHealthInfo();
  }, []);

  if (!healthInfo) {
    return <Loading />;
  }

  return (
    <S.Wrap>
      {isModalOpen && (
        <ModifProfileInfo
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleInfoSave}
          title={nowModifTitle}
          nowInfo={newInfo}
        />
      )}

      <TopNavigation title="내 정보" rightComponent={<></>} />

      <S.SettingSection>
        <S.SubTitle>내 정보</S.SubTitle>
        <SettingComponent text={`${name} 님`} svg={<></>} />
        <SettingComponent
          text={healthInfo.birthYear.toString()}
          svg={<ModifSvg />}
          onClick={() => openModal('출생연도', healthInfo.birthYear)}
        />
      </S.SettingSection>

      <S.SettingSection>
        <S.SubTitle>신체 정보</S.SubTitle>
        <SettingComponent
          text={`${healthInfo.height}cm`}
          svg={<ModifSvg />}
          onClick={() => openModal('키', healthInfo.height)}
        />
        <SettingComponent
          text={`${healthInfo.weight}kg`}
          svg={<ModifSvg />}
          onClick={() => openModal('몸무게', healthInfo.weight)}
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
