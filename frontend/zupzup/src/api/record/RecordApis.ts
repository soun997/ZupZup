import { instance } from 'api';

const RECORD_URL = `/plogging-logs`;

const RecordApis = {
  //*플로깅 기간 중 조회
  getPloggingLogByMonth: (date: string) =>
    instance.get(`${RECORD_URL}/months?date=${date}`),
  getPloggingLogInPeriod: (startDate: string, endDate: string) =>
    instance.get(
      `${RECORD_URL}/period?startDate=${startDate}&endDate=${endDate}`,
    ),
  getPloggingLogByDay: (date: string) =>
    instance.get(`${RECORD_URL}/days?date=${date}`),
  getPloggingLogByRecent: () => instance.get(`${RECORD_URL}/recent`),

  //*프로필 플로깅 집계
  getMyPloggingInfo: () => instance.get(`${RECORD_URL}/total`),
};

export default RecordApis;
