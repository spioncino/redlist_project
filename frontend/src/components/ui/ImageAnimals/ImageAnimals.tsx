import css from './ImageAnimals.module.css';

export const ImageAnimals = () => {
  return (
    <div className={css.imageContainer}>
      <span className={css.divisionOnImage}>Моховидные</span>
      <span className={css.mainImage} />
    </div>
  );
};
