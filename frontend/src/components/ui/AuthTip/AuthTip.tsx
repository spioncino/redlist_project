import { CrossCloseIcon } from '../../../assets';
import { useEffect, useState } from 'react';
import css from './AuthTip.module.css';

export const AuthTip = () => {
  const [showHelper, setShowHelper] = useState<boolean>(false);

  const handleRemove = () => {
    setShowHelper(true);
    localStorage.setItem('authHelp', 'true');
  };

  useEffect(() => {
    setShowHelper(localStorage.getItem('authHelp') ? true : false);
  }, []);

  if (showHelper) {
    return null;
  }

  return (
    <div className={css.helperContainer}>
      <div className={css.ryabchikContainer}>
        <div className={css.ryabchikImage} />
      </div>{' '}
      <div className={css.helperDescription}>
        <h3>Здесь сотрудник департамента может войти в свою учетную запись!</h3>
        <p>
          Подсказываю: в данном разделе нужно в поле <span>код</span> ввести уникальное значение,
          которое вам выдал <span>системный администратор</span>. Чтобы каждый раз не вводить
          значение заново, намжите "<span>Сохранить пароль</span>" в всплывающем окне.
        </p>
        <button
          className={css.buttonThanks}
          type="button"
          onClick={() => {
            handleRemove();
          }}
        >
          Спасибо!
        </button>
        <span
          className={css.crossCloseIcon}
          onClick={() => {
            handleRemove();
          }}
        >
          <CrossCloseIcon />
        </span>
      </div>
    </div>
  );
};
