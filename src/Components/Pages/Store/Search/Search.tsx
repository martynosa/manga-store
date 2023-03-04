import classes from './Search.module.css';

const Search: React.FC = () => {
  return (
    <div className={classes.search}>
      <label htmlFor="search">&#128269;</label>
      <input id="search" type="text" />
    </div>
  );
};

export default Search;
