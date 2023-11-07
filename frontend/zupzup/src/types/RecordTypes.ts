export interface PloggingDayState {
  date: string;
  exists: boolean;
}

export interface PloggingInfo {
  startDateTime: string;
  endDateTime: string;
  distance: number;
  calories: number;
  routeImageUrl: string;
}
