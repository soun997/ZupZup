export interface TrashAnalyzeReport {
  image: File;
  gatheredTrash: number;
  totalCoin: number;
  trashDetail: TrashDetail;
  classifyDetail: classifyDetail;
}

export interface classifyDetail {
  boxes: Float32Array | Int32Array | Uint8Array;
  scores: Float32Array | Int32Array | Uint8Array;
  classes: Float32Array | Int32Array | Uint8Array;
  validDetection: number;
}

export interface TrashDetail {
  [type: string]: number;
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

export interface CoinInfo {
  name: string;
  value: number;
}

export interface TrashInfo {
  latitude: number;
  longitude: number;
  trashcanType: string;
}

export interface TrashTypeTable {
  [key: number]: Trash;
}

export interface Trash {
  name: string;
  'class-eng': string;
  'class-kor': string;
  desc: string;
  coin: number;
}

export interface LocationInfo {
  latitude: number;
  longitude: number;
}
