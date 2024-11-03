import { Link, NavLink } from 'react-router-dom';
import { LogoIcon, MenuIcon, UnLoginIcon } from '../../assets';
import { act, useState } from 'react';
import { PopupMenu } from '../ui';
import css from './Header.module.css';

export const Header = () => {
  const [activeMenu, setActiveMenu] = useState<boolean>(false);

  const handleActive = ({ isActive }: { isActive: boolean }): string =>
    isActive ? css.activeLink : css.noActiveLink;

  return (
    <div className={css.mainContainer}>
      <div className={css.areaContainer}>
        <span className={css.navContainer}>
          <Link to={'/'} className={css.mainLogo} />
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
        </span>
        <span className={css.authTemp}>
          <p>Войти</p>
          <LogoIcon />
        </span>
        <button
          className={css.menuButton}
          onClick={() => {
            setActiveMenu(!activeMenu);
          }}
        >
          <MenuIcon />
        </button>
      </div>
      <PopupMenu active={activeMenu} setActive={setActiveMenu} />
    </div>
  );
};
