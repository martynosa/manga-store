export interface IChapter {
  chapter: number;
  engName: string;
  japName: string;
}

export interface IVolume {
  manga: string;
  volume: number;
  engVolumeName: string;
  japVolumeName: string;
  engRelease: string;
  japRelease: string;
  coverLink: string;
  chapters: IChapter[];
}

export interface ICartItem {
  item: IVolume;
  quantity: number;
}
