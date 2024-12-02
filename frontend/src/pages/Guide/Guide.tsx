import { useState } from 'react';
import {
  AnimalPlantCard,
  BigTextForHelper,
  ButtonThanks,
  FiltersGuide,
  HelperGuidePage,
  Paginate,
  SkeletonsCard,
} from '../../components';
import css from './Guide.module.css';
import { useShowCount } from '../../store';

const Guide = () => {
  const [animals, setAnimals] = useState([]);

  const { count, setCount } = useShowCount();

  const [nowPage, setNowPage] = useState(0);

  return (
    <div className={css.mainContainer}>
      <div className={css.filters}>
        <FiltersGuide />
      </div>
      <HelperGuidePage />
      <div className={css.mainContent}>
        {/* <AnimalPlantCard /> */}
        {animals.length === 0 && Array.from({ length: count }, (_, i) => <SkeletonsCard key={i} />)}
      </div>
      <Paginate
        totalPages={1}
        nowPage={(page) => {
          setNowPage(page);
        }}
      />
    </div>
  );
};

export default Guide;
