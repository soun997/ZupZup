import axios from 'axios';
import {
  setAccessToken,
  setRefreshToken,
  deleteAllAuth,
  useAppDispatch,
  store,
} from 'hooks';
import * as utils from 'utils';

export const BASE_URL = `${import.meta.env.VITE_APP_SERVER}/api/v1`;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request 🧑
instance.interceptors.request.use(
  config => {
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) {
      config.headers[utils.AUTH.ACCESS_KEY] = `Bearer ${accessToken}`;
    }
    return config;
  },
  async function (error) {
    const accessToken = store.getState().auth.accessToken;
    const refreshToken = store.getState().auth.refreshToken;

    const originalRequest = error.config;
    const dispatch = useAppDispatch();

    console.error('나 error 발생!!!! ', error);
    // 401 에러면 refresh token 보내기
    if (
      (error?.response?.data?.status === 401 &&
        error?.response?.data?.error_code === 'ERR_AUTH_005') ||
      error?.response?.data?.status === 403
    ) {
      // console.log('access-token 만료됐어');
      try {
        const response = await reissueTokens(
          String(refreshToken),
          String(accessToken),
        );

        // console.log('이전 access : ', getAccessToken());
        // console.log('이전 refresh : ', getRefreshToken());

        // **응답 헤더에서 Access Token과 Refresh Token 추출
        const newAccessToken = response.data.results.accessToken;
        const newRefreshToken = response.data.results.refreshToken;
        // console.log('이후 access : ', accessToken);
        // console.log('이후 refresh : ', refreshToken);

        // **access token 을 다시 setting 하고 origin request 를 재요청
        dispatch(setAccessToken(newAccessToken));
        dispatch(setRefreshToken(newRefreshToken));

        originalRequest.headers[
          utils.AUTH.ACCESS_KEY
        ] = `Bearer ${newAccessToken}`;

        // **새로운 토큰 발급 확인
        // console.log(newAccessToken, newRefreshToken);

        return axios(originalRequest);
      } catch (error) {
        // **만약 refreshToken 보내도 error 가 뜨면 login 화면으로 보내기 -> redirect
        //!login 이동
        window.location.href = utils.URL.LOGIN.HOME; // 로그인화면으로 보내기
        dispatch(deleteAllAuth());
      }

      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

// Response 🧑
instance.interceptors.response.use(
  async response => {
    return response;
  },
  async error => {
    return Promise.reject(error);
  },
);

async function reissueTokens(oldRefreshToken: string, oldAccessToken: string) {
  return await axios.post(
    `${BASE_URL}/members/re-issue`,
    { refreshToken: oldRefreshToken },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${oldAccessToken}`,
      },
    },
  );
}

export default instance;
