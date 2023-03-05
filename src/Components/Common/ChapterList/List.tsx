import classes from './List.module.css';
// typescript
import { PropsWithChildren } from 'react';

const List: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={classes['chapter-list']}>{children}</div>;
};
export default List;
