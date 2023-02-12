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
  manga: string;
  volumeId: number;
  chapterId: number;
  quantity: number;
}
