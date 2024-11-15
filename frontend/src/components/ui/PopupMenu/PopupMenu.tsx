import { Link } from 'react-router-dom';
import css from './PopupMenu.module.css';

interface PopupMenuProps {
  active: boolean;
  setActive: (active: boolean) => void;
}

export const PopupMenu: React.FC<PopupMenuProps> = ({ active, setActive }) => {
  return (
    <ul className={active ? css.active : css.noActive}>
      <li onClick={() => setActive(false)}>
        <Link to={'/guide'} className={css.textLink}>
          Путеводитель
        </Link>
      </li>
      <li onClick={() => setActive(false)}>
        <Link to={'/news'} className={css.textLink}>
          Новости
        </Link>
      </li>
      <li onClick={() => setActive(false)}>
        <Link to={'/monitoring'} className={css.textLink}>
          Мониторинг
        </Link>
      </li>
      <li onClick={() => setActive(false)}>Войти</li>
    </ul>
  );
};
