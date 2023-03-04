export interface IChapter {
  chapter: number;
  engName: string;
  japName: string;
}

export interface IVolume {
  id: string;
  manga: string;
  volume: number;
  engVolumeName: string;
  japVolumeName: string;
  engRelease: string;
  japRelease: string;
  coverLink: string;
  chapters: IChapter[];
  price: number;
}
