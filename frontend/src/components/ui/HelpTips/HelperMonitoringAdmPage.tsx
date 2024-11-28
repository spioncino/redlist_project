import { useEffect, useState } from 'react';
import { CrossCloseIcon, EditIcon, GreenAcceptIcon, RedCloseIcon } from '../../../assets';
import { BigTextForHelper } from '../BigTextForHelper/BigTextForHelper';
import { ButtonThanks } from '../ButtonThanks/ButtonThanks';
import css from './HelperMonitoringAdmPage.module.css';

export const HelperMonitoringAdmPage = () => {
  const [showHelper, setShowHelper] = useState<boolean>(false);

  const handleRemove = () => {
    setShowHelper(true);
    localStorage.setItem('monitroingHelpAdm', 'true');
  };

  useEffect(() => {
    setShowHelper(localStorage.getItem('monitroingHelpAdm') ? true : false);
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
        <BigTextForHelper>Это раздел обработки заявок от горожан!</BigTextForHelper>
        <p className={css.mainText}>
          Пользователи сообщают, если заметили какое-либо животное или растение. Здесь можно
          управлять входящими заявками.
        </p>
        <p className={css.keyDesc}>
          <span className={css.closeIcon}>
            <RedCloseIcon />
          </span>
          Отклонить
          <span className={css.acceptIcon}>
            <GreenAcceptIcon />
          </span>
          Принять (геометка будет добавлена на карту)
          <span className={css.editIcon}>
            <EditIcon />
          </span>
          Изменить данные перед принятием
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
        className={css.crossCloseIcon}
        onClick={() => {
          handleRemove();
        }}
      >
        <CrossCloseIcon />
      </span>
    </div>
  );
};
