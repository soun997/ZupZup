import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils';
import NextArrowSvg from 'assets/icons/angle-right.svg?react';
import { Navigation, TopNavigation } from 'components';

const profileInfo = {
  nickname: '줍줍',
};
const Setting = () => {
  const navigate = useNavigate();

  return (
    <S.Wrap>
      <TopNavigation title="설정" rightComponent={<></>} />
      <S.SettingSection>
        <S.SubTitle>
          <S.MyInfo onClick={() => navigate(utils.URL.SETTING.PROFILE)}>
            <div className="textInfo">
              <div className="nickname">{profileInfo.nickname} 님</div>
              <div className="modify">내 정보 수정하기</div>
            </div>
            <S.SvgWrapper>
              <NextArrowSvg />
            </S.SvgWrapper>
          </S.MyInfo>
        </S.SubTitle>
      </S.SettingSection>

      <S.SettingSection>
        <S.SubTitle>계정</S.SubTitle>
        <S.SectionBody>로그아웃</S.SectionBody>
      </S.SettingSection>

      <S.SettingSection>
        <S.SubTitle>약관</S.SubTitle>

        <S.SectionBody>
          <div className="title">서비스 이용약관</div>
          <S.SvgWrapper>
            <NextArrowSvg />
          </S.SvgWrapper>
        </S.SectionBody>

        <S.SectionBody>
          <div className="title">개인정보 처리방침</div>
          <S.SvgWrapper>
            <NextArrowSvg />
          </S.SvgWrapper>
        </S.SectionBody>

        <S.SectionBody>
          <div className="title">앱 버전</div>
          <S.SvgWrapper className="sub-text">1.0.0</S.SvgWrapper>
        </S.SectionBody>

        <S.SectionBody>
          <div className="title">줍줍 새소식</div>
          <S.SvgWrapper>
            <NextArrowSvg />
          </S.SvgWrapper>
        </S.SectionBody>

        <S.SectionBody>
          <div className="title">오픈소스 라이선스 보기</div>
          <S.SvgWrapper>
            <NextArrowSvg />
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

export default Setting;
