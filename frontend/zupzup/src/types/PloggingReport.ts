export interface FloggingReport {
  image: string;
  record: RecordInfo;
}

export interface RecordInfo {
  time: number;
  coin: number;
  distance: number;
  calories: number;
}
