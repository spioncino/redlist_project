import { Link } from 'react-router-dom';
import css from './Footer.module.css';

export const Footer = () => {
  return (
    <div className={css.mainContainer}>
      <span className={css.mainContent}>
        <p
          className={css.text}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        >
          Наверх ↑
        </p>
        <Link to={'/'} className={css.text}>
          Красная книга Москвы, 2024
        </Link>
      </span>
    </div>
  );
};
