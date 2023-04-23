import { PropsWithChildren } from 'react';
import classes from './List.module.css';

const List: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={classes.list}>{children}</div>;
};

export default List;
