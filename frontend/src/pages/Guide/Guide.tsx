import { useState } from 'react';
import { BigTextForHelper, ButtonThanks, FiltersGuide } from '../../components';
import css from './Guide.module.css';

const Guide = () => {
  return (
    <div className={css.mainContainer}>
      <div className={css.filters}>
        <FiltersGuide />
      </div>
      {/* #FIXME */}
      <div className={css.helper}>
        <div className={css.imageRyabchik} />
        <div className={css.descriptionContainer}>
          <BigTextForHelper>
            {'Это путеводитель по миру краснокнижной флоры и фауны города Москвы!'}
          </BigTextForHelper>
          <p>Воспользуйся сортировкой и поиском, чтобы найти информацию об интересующих видах</p>
          <ButtonThanks text={'Спасибо'} />
        </div>
      </div>
      <div className={css.mainContent}></div>
    </div>
  );
};

export default Guide;
