import { IChapter } from '../../../types';
import classes from './Chapter.module.css';

const Chapter: React.FC<{ chapter: IChapter }> = ({ chapter }) => {
  return (
    <div className={classes.chapter}>
      <div className={classes['chapter-info']}>
        <p>{chapter.engName}</p>
        <p>{chapter.japName}</p>
      </div>

      <div className={classes['cart-buttons']}>
        <button>5</button>
        <button>-</button>
        <button>+</button>
      </div>
    </div>
  );
};
export default Chapter;
