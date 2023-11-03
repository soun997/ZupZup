import { instance } from 'api';
import axios from 'axios';
import { BASE_URL } from 'api/apiController';
import { RegistInfo } from 'types/ProfileInfo';

const MEMBER_URL = `/members`;

const MemberApis = {
  login: (token: string, provider: string) =>
    axios.post(BASE_URL + '/auth', {
      authToken: token,
      oauthProvider: provider,
    }),
  logout: () => instance.post(`${MEMBER_URL}/logout`),
  registInfo: (healthData: RegistInfo) =>
    instance.put(`${MEMBER_URL}/health`, healthData),
  getProfileInfo: () => instance.get(`${MEMBER_URL}/profiles`),
  getCharacterInfo: () => instance.get(`${MEMBER_URL}/profiles/characters`),
  getPloggingInfo: () => instance.get(`${MEMBER_URL}/profiles/total-ploggings`),
};

export default MemberApis;
