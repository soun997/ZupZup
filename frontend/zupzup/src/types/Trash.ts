export interface TrashAnalyzeReport {
  image: File;
  gatheredTrash: number;
  totalCoin: number;
  trashDetail: TrashDetail;
}

export interface TrashDetail {
  [type: string] : number;
  "plastic": number;
  "cigarette": number;
  "can": number;
  "glass": number;
  "paper": number;
  "normal": number;
  "styrofoam": number;
  "metal": number;
  "clothes": number;
  "battery": number;
  "vinyl": number;
  "mixed": number;
  "food": number;
  "etc": number;
}

export interface CoinInfo {
  name: string;
  value: number;
}
