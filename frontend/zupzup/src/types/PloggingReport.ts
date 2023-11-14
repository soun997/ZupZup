export interface PloggingReport {
  image: string;
  record: RecordInfo;
}

export interface RecordInfo {
  time: number;
  coin: number;
  distance: number;
  calories: number;
}

export interface TrashTable {
  [type: string]: TrashTableDetail;
  plastic: TrashTableDetail;
  cigarette: TrashTableDetail;
  can: TrashTableDetail;
  glass: TrashTableDetail;
  paper: TrashTableDetail;
  styrofoam: TrashTableDetail;
  metal: TrashTableDetail;
  clothes: TrashTableDetail;
  battery: TrashTableDetail;
  vinyl: TrashTableDetail;
  normal: TrashTableDetail;
  food: TrashTableDetail;
  mixed: TrashTableDetail;
  etc: TrashTableDetail;
}

export interface TrashTableDetail {
  type: number[];
  desc: string;
  coin: number;
  kor: string;
}
