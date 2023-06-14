import classes from './Home.module.css';

const Home: React.FC = () => {
  return (
    <section className={classes['home-section']}>
      <div>
        <img src="letter_n.webp" alt="n" />
        <img src="letter_a.webp" alt="a" />
        <img src="letter_r.webp" alt="r" />
        <img src="letter_u.webp" alt="u" />
        <img src="letter_t.webp" alt="t" />
        <img src="letter_o.webp" alt="o" />
      </div>
      <footer>it's just a demo, dattebayo (not responsive)</footer>
    </section>
  );
};

export default Home;
