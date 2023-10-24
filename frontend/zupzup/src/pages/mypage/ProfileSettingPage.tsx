import { styled } from 'styled-components';
import { Navigation, TopNavigation } from 'components';
import ModifSvg from 'assets/icons/pencil-modif.svg?react';

const profileInfo = {
  nickname: '줍줍',
  birthYear: 1998,
  height: 180,
  weight: 82,
};

const ProfileSettingPage = () => {
  return (
    <S.Wrap>
      <TopNavigation title="내 정보" rightComponent={<></>} />

      <S.SettingSection>
        <S.SubTitle>내 정보</S.SubTitle>
        <S.SectionBody>
          <div className="title">{profileInfo.nickname}</div>
          <S.SvgWrapper>
            <ModifSvg />
          </S.SvgWrapper>
        </S.SectionBody>
        <S.SectionBody>
          <div className="title">{profileInfo.birthYear}</div>
          <S.SvgWrapper>
            <ModifSvg />
          </S.SvgWrapper>
        </S.SectionBody>
      </S.SettingSection>

      <S.SettingSection>
        <S.SubTitle>신체 정보</S.SubTitle>
        <S.SectionBody>
          <div className="title">{profileInfo.height}cm</div>
          <S.SvgWrapper>
            <ModifSvg />
          </S.SvgWrapper>
        </S.SectionBody>
        <S.SectionBody>
          <div className="title">{profileInfo.weight}kg</div>
          <S.SvgWrapper>
            <ModifSvg />
          </S.SvgWrapper>
        </S.SectionBody>
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
  `,
  SettingSection: styled.div`
    margin-top: 10px;
    margin-left: 24px;
  `,

  SectionBody: styled.div`
    display: flex;
    height: 52px;
    padding: 4px 8px 4px 0px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    font-size: ${({ theme }) => theme.font.size.focus2};
    font-weight: ${({ theme }) => theme.font.weight.body2};
    line-height: 130%;
    letter-spacing: -0.014px;
    .title {
      width: 100%;
    }
    .sub-text {
      font-weight: ${({ theme }) => theme.font.weight.focus2};
      color: ${({ theme }) => theme.color.gray3};
    }
  `,

  SubTitle: styled.div`
    display: flex;
    width: 100%;
    height: 52px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    font-size: ${({ theme }) => theme.font.size.focus2};
    font-weight: ${({ theme }) => theme.font.weight.focus2};
  `,

  SvgWrapper: styled.div`
    display: flex;
    padding: 0px 12px;
    justify-content: flex-end;
    align-items: center;
    gap: 2px;
    align-self: stretch;
  `,

  MyInfo: styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    .textInfo {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .nickname {
        font-size: ${({ theme }) => theme.font.size.focus2};
        font-weight: ${({ theme }) => theme.font.weight.focus2};
      }

      .modify {
        font-size: ${({ theme }) => theme.font.size.caption};
        font-weight: ${({ theme }) => theme.font.weight.caption};
        color: ${({ theme }) => theme.color.gray2};
      }
    }
  `,
};

export default ProfileSettingPage;
