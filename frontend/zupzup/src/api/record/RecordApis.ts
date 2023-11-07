import { instance } from 'api';

const RECORD_URL = `/plogging-logs`;

const RecordApis = {
  getPloggingLogByMonth: (date: string) =>
    instance.get(`${RECORD_URL}/months?date=${date}`),
  getPloggingLogInPeriod: (startDate: string, endDate: string) =>
    instance.get(
      `${RECORD_URL}/period?startDate=${startDate}&endDate=${endDate}`,
    ),
  getPloggingLogByDay: (date: string) =>
    instance.get(`${RECORD_URL}/days?date=${date}`),
  getPloggingLogByRecent: () => instance.get(`${RECORD_URL}/recent`),
};

export default RecordApis;
