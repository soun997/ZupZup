export interface ProfileInfo {
  nickname: string;
  characterImage: string;
  day: number;
  level: number;
  exp: number;
  lastFlogging: LastFloggingInfo;
}

export interface LastFloggingInfo {
  count: number;
  hour: number;
  calories: number;
}
