import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { SocialLoginButton } from 'components';
import { SOCIAL_KEY } from 'utils';

import KakaoIcon from 'assets/icons/Kakao_logo.svg?react';
// import NaverIcon from 'assets/icons/Naver_logo.svg?react';
import GoogleIcon from 'assets/icons/Google_logo.svg?react';
import { MemberApi } from 'api';
import * as utils from 'utils';

const Login = () => {
  const navigate = useNavigate();
  const handleSocialLogin = async (domain: string) => {
    window.location.href = `${
      import.meta.env.VITE_APP_SERVER
    }/oauth2/authorization/${domain}`;
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await MemberApi.getProfileInfo();
        if (response.data.results.memberId === utils.AUTH.MEMBER_ID) {
          navigate(utils.URL.PLOGGING.LOBBY);
          return;
        }
        navigate(utils.URL.LOGIN.HOME);
      } catch (error) {
        navigate(utils.URL.LOGIN.HOME);
      }
    };

    if (localStorage.getItem(utils.AUTH.REFRESH_KEY)) {
      checkLogin();
    }
  }, []);

  return (
    <S.Wrap>
      <S.LogoContainer>
        <S.Title>줍줍</S.Title>
        {/* <S.Image src="assets/images/park_main.png"></S.Image> */}
      </S.LogoContainer>
      <S.LoginButton>
        <SocialLoginButton
          $backgroundColor="#FAE100"
          color="#371D1E"
          onClick={() => handleSocialLogin(SOCIAL_KEY.KAKAO)}
        >
          <KakaoIcon />
          카카오톡으로 시작하기
        </SocialLoginButton>
        {/* <SocialLoginButton
          $backgroundColor="#06BE34"
          color="#FFFFFF"
          onClick={() => handleSocialLogin(SOCIAL_KEY.NAVER)}
        >
          <NaverIcon />
          네이버로 시작하기
        </SocialLoginButton> */}
        <SocialLoginButton
          $backgroundColor="#FFFFFF"
          color="#4E5968"
          onClick={() => handleSocialLogin(SOCIAL_KEY.GOOGLE)}
        >
          <GoogleIcon />
          구글로 시작하기
        </SocialLoginButton>
      </S.LoginButton>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100dvh;

    background-image: url(${import.meta.env.VITE_S3_URL}/background-image.webp);
    background-size: cover;
  `,

  LogoContainer: styled.div`
    display: flex;
    position: relative;
    top: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;
  `,

  Title: styled.div`
    margin-top: -20px;
    /* transform: translateY(150px); */
    text-align: center;
    font-family: ${({ theme }) => theme.font.family.title};
    font-size: 80px;
    color: #fff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
    z-index: 1;
  `,

  Image: styled.img`
    opacity: 0.8;
  `,

  LoginButton: styled.div`
    display: flex;
    z-index: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    position: relative;
    margin: auto auto 60px auto;
    width: 100%;
  `,
};

export default Login;
