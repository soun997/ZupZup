import { instance } from 'api';

const PLOGGING_URL = `/ploggings`;

const PloggingApis = {
  //*플로깅 시작, 종료
  startPlogging: () => instance.put(`${PLOGGING_URL}/start`),
  stopPlogging: () => instance.put(`${PLOGGING_URL}/finish`),

  //*현재 플로깅 이용자수 조회
  getNowPloggingUsers: () => instance.get(`${PLOGGING_URL}/number-of-users`),
};

export default PloggingApis;
