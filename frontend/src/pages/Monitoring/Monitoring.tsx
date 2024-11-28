import { NavLink, Outlet } from 'react-router-dom';
import css from './Monitoring.module.css';

const Monitoring = () => {
  const handleActive = ({ isActive }: { isActive: boolean }): string =>
    isActive ? css.activeLink : css.noActiveLink;

  return (
    <div className={css.mainContainer}>
      <nav className={css.navigate}>
        <NavLink to={'maps'} className={handleActive}>
          Карта
        </NavLink>
        <NavLink to={'request'} className={handleActive}>
          Обработка заявок
        </NavLink>
      </nav>
      <hr />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Monitoring;
