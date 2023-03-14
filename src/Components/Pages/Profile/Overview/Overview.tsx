import classes from './Overview.module.css';

const Overview: React.FC = () => {
  return (
    <>
      <h2 className={classes['page-title']}>Under construction</h2>
      <p>display name</p>
      <p>email</p>
      <p>shipping address</p>
      <p>purchase history count (not sure about this one)</p>
      <p>overall money spen on manga (not sure about this one)</p>
    </>
  );
};
export default Overview;
