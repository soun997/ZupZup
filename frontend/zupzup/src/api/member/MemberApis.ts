import { instance } from 'api';
import axios from 'axios';
import { BASE_URL } from 'api/apiController';
import { HealthInfo, RegistInfo } from 'types/ProfileInfo';

const MEMBER_URL = `/members`;

const MemberApis = {
  //*로그인,로그아웃
  login: (token: string, provider: string) =>
    axios.post(BASE_URL + '/auth', {
      authToken: token,
      oauthProvider: provider,
    }),
  logout: () => instance.post(`${MEMBER_URL}/logout`),

  //*회원등록시
  registInfo: (registData: RegistInfo) =>
    instance.put(`${MEMBER_URL}/register`, registData),

  //*프로필 정보 조회
  getProfileInfo: () => instance.get(`${MEMBER_URL}/profile`),
  getCharacterInfo: () => instance.get(`/pets`),

  //*내 헬스정보 조회
  getHealthInfo: () => instance.get(`${MEMBER_URL}/health`),
  putHealthInfo: (healthData: HealthInfo) =>
    instance.put(`${MEMBER_URL}/health`, healthData),
};

export default MemberApis;
