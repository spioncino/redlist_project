import css from './SkeletonsCard.module.css';

export const SkeletonsCard = () => {
  return (
    <div className={css.mainContainer}>
      <div className={css.imageWithTypes} />
      <div className={css.descriptionsAboutTypes}>
        <div className={css.nameContainer}>
          <span className={css.nameOfTypes} />
          <span className={css.nameOfTypesOnEN} />
        </div>
        <span className={css.orderTypes} />
        <span className={css.familyTypes} />
        <span className={css.descriptionTypes} />
        <div className={css.tagsTypes}>
          <span className={css.tagsOne} />
          <span className={css.tagsTwo} />
          <span className={css.tagsThree} />
          <span className={css.tagsThree} />
          <span className={css.tagsFour} />
        </div>
      </div>
    </div>
  );
};
