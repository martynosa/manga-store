export interface Chapter {
  chapter: number;
  engName: string;
  japName: string;
}

export interface Volume {
  volume: number;
  engVolumeName: string;
  japVolumeName: string;
  engRelease: string;
  japRelease: string;
  coverLink: string;
  chapters: Chapter[];
}
