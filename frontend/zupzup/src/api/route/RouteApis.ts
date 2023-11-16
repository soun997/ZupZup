import { instance } from 'api';
import { RouteSaveRequest } from 'types/RouteTypes';

const ROUTE_URL = `/routes`;

const PloggingApis = {
  //*플로깅 시작, 종료
  getRoutes: (ploggingLogId: number) =>
    instance.get(`${ROUTE_URL}/${ploggingLogId}`),
  postRoutes: (ploggingLogId: number, request: RouteSaveRequest) =>
    instance.post(`${ROUTE_URL}/${ploggingLogId}`, request),
};

export default PloggingApis;
