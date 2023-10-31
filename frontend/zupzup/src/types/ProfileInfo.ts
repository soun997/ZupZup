export interface ProfileInfo {
  name: string;
  coin: number;
  createdAt: string;
}

export interface CharacterInfo {
  exp: number;
  level: number;
}

export interface TotalPloggingInfo {
  totalCount: number;
  totalDistance: number;
  totalTime: number;
  totalCalorie: number;
  totalGatheredTrash: number;
}

export interface RegistInfo {
  height: number;
  weight: number;
  gender: string;
  birthYear: number;
  memberId: string;
}
