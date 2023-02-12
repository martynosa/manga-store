import { IChapter } from '../../../types';
import classes from './Chapter.module.css';

const Chapter: React.FC<{
  chapter: IChapter;
  addToCartHandler: () => void;
  removeFromCartHandler: () => void;
}> = ({ chapter, addToCartHandler, removeFromCartHandler }) => {
  return (
    <div className={classes.chapter}>
      <div className={classes['chapter-info']}>
        <p>{chapter.engName}</p>
        <p>{chapter.japName}</p>
      </div>

      <div className={classes['cart-buttons']}>
        <button onClick={addToCartHandler}>Add to cart</button>
        <button onClick={removeFromCartHandler}>remove from cart</button>
      </div>
    </div>
  );
};
export default Chapter;
