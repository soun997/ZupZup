// request
export interface PloggingLogRequest {
  distance: number;
  startDateTime: string;
  endDateTime: string;
  durationTime: number;
  calories: number;
  gatheredTrash: number;
  coin: number;
  routeImageUrl: string;
}

export interface TrashRequest {
  plastic: number;
  cigarette: number;
  can: number;
  glass: number;
  paper: number;
  normal: number;
  styrofoam: number;
  metal: number;
  clothes: number;
  battery: number;
  vinyl: number;
  mixed: number;
  food: number;
  etc: number;
}

export interface PloggingLogSaveRequest {
  ploggingLogRequest: PloggingLogRequest;
  trashRequest: TrashRequest;
}

// response
export interface PloggingInfo {
  startDateTime: string;
  endDateTime: string;
  distance: number;
  calories: number;
  routeImageUrl: string;
}

// others
export interface PloggingDayState {
  date: string;
  exists: boolean;
}
