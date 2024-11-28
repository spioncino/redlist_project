import { useEffect, useState } from 'react';
import { CrossCloseIcon } from '../../../assets';
import { BigTextForHelper } from '../BigTextForHelper/BigTextForHelper';
import { ButtonThanks } from '../ButtonThanks/ButtonThanks';
import css from './HelperGuidePage.module.css';

export const HelperGuidePage = () => {
  const [showHelper, setShowHelper] = useState<boolean>(false);

  const handleRemove = () => {
    setShowHelper(true);
    localStorage.setItem('guideHelp', 'true');
  };

  useEffect(() => {
    setShowHelper(localStorage.getItem('guideHelp') ? true : false);
  }, []);

  if (showHelper) {
    return null;
  }

  return (
    <div className={css.mainContainer}>
      <div className={css.ryabchikContainer}>
        <div className={css.imageRyabchik} />
      </div>
      <div className={css.descriptionContainer}>
        <BigTextForHelper>
          {'Это путеводитель по миру краснокнижной флоры и фауны города Москвы!'}
        </BigTextForHelper>
        <p className={css.descText}>
          Воспользуйся сортировкой и поиском, чтобы найти информацию об интересующих видах
        </p>
        <span
          onClick={() => {
            handleRemove();
          }}
        >
          <ButtonThanks text={'Спасибо!'} />
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
