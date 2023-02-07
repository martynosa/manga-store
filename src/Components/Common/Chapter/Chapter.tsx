import classes from './Chapter.module.css';

const Chapter: React.FC = () => {
  return (
    <div className={classes.chapter}>
      <div className={classes['chapter-info']}>
        <p>Uzumaki Naruto</p>
        <p>うずまきナルト!!</p>
      </div>

      <div className={classes['cart-buttons']}>
        <div>5</div>
        <div>-</div>
        <div>+</div>
      </div>
    </div>
  );
};
export default Chapter;
