import classes from './Chapter.module.css';
// typescript
import { IChapter } from '../../../../typescript/interfaces';

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
