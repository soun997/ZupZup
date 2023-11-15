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
  totalPlastic: number;
  totalCigarette: number;
  totalCan: number;
  totalGlass: number;
  totalNormal: number;
  totalStyrofoam: number;
  totalMetal: number;
  totalClothes: number;
  totalBattery: number;
  totalPaper: number;
  totalVinyl: number;
  totalMixed: number;
  totalFood: number;
  totalEtc: number;
}

export interface RegistInfo {
  height: number | null;
  weight: number | null;
  gender: string | null;
  birthYear: number | null;
  memberId: number;
}

export type HealthInfo = Omit<RegistInfo, 'memberId'>;
