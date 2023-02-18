import { IChapter } from '../../../types/manga';
import classes from './Chapter.module.css';

const Chapter: React.FC<{
  chapter: IChapter;
}> = ({ chapter }) => {
  return (
    <div className={classes.chapter}>
      <p>{chapter.chapter}</p>
      <p>{chapter.engName}</p>
      <p>{chapter.japName}</p>
    </div>
  );
};
export default Chapter;
