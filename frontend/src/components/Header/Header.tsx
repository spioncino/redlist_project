import { Link, NavLink, useLocation } from 'react-router-dom';
import { LogoIcon, MenuIcon, UnLoginIcon } from '../../assets';
import { act, useState } from 'react';
import { PopupMenu } from '../ui';
import css from './Header.module.css';

export const Header = () => {
  const [activeMenu, setActiveMenu] = useState<boolean>(false);

  const handleActive = ({ isActive }: { isActive: boolean }): string =>
    isActive ? css.activeLink : css.noActiveLink;

  const locate = useLocation();

  return (
    <div className={css.mainContainer}>
      <div className={css.areaContainer}>
        <span className={css.navContainer}>
          <Link to={'/'} className={css.mainLogo} />
          {locate.pathname != '/auth' && (
            <span className={css.navContent}>
              <p>
                <NavLink to={'guide'} className={handleActive}>
                  Путеводитель
                </NavLink>
              </p>
              <p>
                <NavLink to={'news'} className={handleActive}>
                  Новости
                </NavLink>
              </p>
              <p>
                <NavLink to={'monitoring'} className={handleActive}>
                  Мониторинг
                </NavLink>
              </p>
            </span>
          )}
        </span>
        {locate.pathname != '/auth' && (
          <span className={css.authTemp}>
            <p>
              <Link to="/auth" className={css.onMainText}>
                Войти
              </Link>
            </p>
            <LogoIcon />
          </span>
        )}
        {locate.pathname == '/auth' && (
          <Link to="/" className={css.onMainText}>
            На главную
          </Link>
        )}
        {locate.pathname != '/auth' && (
          <button
            className={css.menuButton}
            onClick={() => {
              setActiveMenu(!activeMenu);
            }}
          >
            ;
            <MenuIcon />
          </button>
        )}
      </div>
      <PopupMenu active={activeMenu} setActive={setActiveMenu} />
    </div>
  );
};
