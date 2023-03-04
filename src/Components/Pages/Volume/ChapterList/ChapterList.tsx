import classes from './ChapterList.module.css';
import Chapter from '../Chapter/Chapter';
// typescript
import { IChapter } from '../../../../typescript/interfaces';

const ChapterList: React.FC<{ chapters: IChapter[] }> = ({ chapters }) => {
  return (
    <div className={classes['chapter-list']}>
      {chapters.map((c) => (
        <Chapter chapter={c} key={c.chapter} />
      ))}
    </div>
  );
};
export default ChapterList;
