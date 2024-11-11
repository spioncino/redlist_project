import { useState } from 'react';
import { BigTextForHelper, ButtonThanks, FiltersGuide, SkeletonsCard } from '../../components';
import css from './Guide.module.css';
import { useShowCount } from '../../store';

const Guide = () => {
  const [animals, setAnimals] = useState([]);

  const { count, setCount } = useShowCount();

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
      <div className={css.mainContent}>
        {animals.length === 0 && Array.from({ length: count }, (_, i) => <SkeletonsCard key={i} />)}
      </div>
    </div>
  );
};

export default Guide;
