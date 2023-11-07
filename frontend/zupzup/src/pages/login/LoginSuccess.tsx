import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MemberApi } from 'api';
import * as utils from 'utils';
import { LoadingAnimation } from 'components';
import styled from 'styled-components';
import {
  setAccessToken,
  setMemberId,
  setMemberName,
  setRefreshToken,
  useAppDispatch,
} from 'hooks';

const LoginSuccess = () => {
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const auth = async () => {
      const token = {
        authToken: params.get('token'),
        provider: params.get('provider'),
      };

      try {
        console.log('token >: ', token);

        const res = await MemberApi.login(token.authToken!, token.provider!);
        const data = res.data.results;
        console.log('login data >: ', data);

        dispatch(setMemberId(data.memberId));
        dispatch(setMemberName(data.name));

        if (data.isNewMember) {
          navigate(utils.URL.LOGIN.REGIST_INFO.PHYSICAL);
        } else {
          const accessToken = data.accessToken;
          const refreshToken = data.refreshToken;
          dispatch(setAccessToken(accessToken));
          dispatch(setRefreshToken(refreshToken));
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
