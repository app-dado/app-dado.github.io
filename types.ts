
export interface DieFace {
  id: number;
  text: string;
}

export interface Die {
  id: string;
  name: string;
  faces: DieFace[];
  themeColor: string;
  icon: string;
}

export enum AppTab {
  DICE = 'dice',
  PROFILE = 'profile',
  CUSTOMIZE = 'customize'
}
