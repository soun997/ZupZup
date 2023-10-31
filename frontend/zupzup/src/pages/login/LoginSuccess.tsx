import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MemberApi } from 'api';
import * as useAuth from 'hooks';
import * as utils from 'utils';
import { LoadingAnimation } from 'components';
import styled from 'styled-components';

const LoginSuccess = () => {
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    const auth = async () => {
      const token = {
        authToken: params.get('token'),
        provider: params.get('provider'),
      };

      try {
        const res = await MemberApi.login(token.authToken!, token.provider!);

        const data = res.data.results;
        console.log('login data >: ', data);

        if (data.isNew) {
          const accessToken = data.accessToken;
          const refreshToken = data.refreshToken;
          useAuth.setAccessToken(accessToken);
          useAuth.setRefreshToken(refreshToken);
          navigate(utils.URL.LOGIN.REGIST_INFO.PHYSICAL, {
            state: data.tempToken,
          });
        } else {
          navigate(utils.URL.PLOGGING.LOBBY);
        }
      } catch (err) {
        alert('로그인에 실패했습니다. 잠시 후 다시 시도해주세요');
      }
    };

    auth();
  }, []);

  return (
    <S.Wrap>
      <LoadingAnimation />
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

export default LoginSuccess;
