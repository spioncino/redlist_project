import css from './SkeletonsHistoryKadastr.module.css';

export const SkeletonsHistoryKadastr = () => {
  return (
    <div className={css.mainContainer}>
      <span className={css.mainContent}>
        <span className={css.request} />
        <span className={css.numberOfRequest} />
        <span className={css.dateText} />
        <span className={css.date} />
        <span className={css.kadastrText} />
        <span className={css.kadastr} />
      </span>
    </div>
  );
};
