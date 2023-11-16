import { instance } from 'api';
import { PloggingLogSaveRequest } from 'types';

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
  getPloggingTrash: (ploggingLogId: number) =>
    instance.get(`${RECORD_URL}/${ploggingLogId}/trash`),

  //*프로필 플로깅 집계
  getMyPloggingInfo: () => instance.get(`${RECORD_URL}/total`),

  //*플로깅 기록 저장
  postPloggingLog: (data: PloggingLogSaveRequest) =>
    instance.post(`${RECORD_URL}`, data),
};

export default RecordApis;
