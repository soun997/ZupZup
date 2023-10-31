import { instance } from 'api';
import { BASE_URL } from 'api/apiController';
import axios from 'axios';

const MemberApis = {
  login: (token: string, provider: string) =>
    axios.post(BASE_URL + '/auth', { authToken: token, provider }),
  logout: () => instance.post(BASE_URL + '/members/logout'),
};

export default MemberApis;
