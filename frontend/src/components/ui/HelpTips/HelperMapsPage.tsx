import { useEffect, useState } from 'react';
import { CrossCloseIcon } from '../../../assets';
import { BigTextForHelper } from '../BigTextForHelper/BigTextForHelper';
import { ButtonThanks } from '../ButtonThanks/ButtonThanks';
import css from './HelperMapsPage.module.css';

export const HelperMapsPage = () => {
  const [showHelper, setShowHelper] = useState<boolean>(false);

  const handleRemove = () => {
    setShowHelper(true);
    localStorage.setItem('mapsHelp', 'true');
  };

  useEffect(() => {
    setShowHelper(localStorage.getItem('mapsHelp') ? true : false);
  }, []);

  if (showHelper) {
    return null;
  }

  return (
    <div className={css.mainContainer}>
      <div className={css.imageContainer}>
        <div className={css.imageRyabchik} />
      </div>
      <div className={css.descContainer}>
        <BigTextForHelper>Добро пожаловать в карту системы мониторинга!</BigTextForHelper>
        <p className={css.mainText}>
          Подсказываю: в данном разделе нужно{' '}
          <span>ввести кадастровый номер интересующего участка</span>, после чего{' '}
          <span>вы получите список краснокнижных видов</span>, обитающих или замеченных в пределах
          этих участков
        </p>
        <span
          onClick={() => {
            handleRemove();
          }}
        >
          <ButtonThanks text="Спасибо!" />
        </span>
      </div>
      <span className={css.pointerArrow} />
      <span
        className={css.closeIcon}
        onClick={() => {
          handleRemove();
        }}
      >
        <CrossCloseIcon />
      </span>
    </div>
  );
};
