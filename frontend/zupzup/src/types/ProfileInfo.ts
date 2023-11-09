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
  totalDurationTime: number;
  totalCalories: number;
  totalGatheredTrash: number;
}

export interface RegistInfo {
  height: number;
  weight: number;
  gender: string;
  birthYear: number;
  memberId: number;
}

export type HealthInfo = Omit<RegistInfo, 'memberId'>;
