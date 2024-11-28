import css from './HistoryKadastr.module.css';

type HistoryKadastrProps = {
  nRequest: number;
  nDate: string;
  nKadastr: string;
};

export const HistoryKadastr = ({ nRequest, nDate, nKadastr }: HistoryKadastrProps) => {
  return (
    <div className={css.mainContainer}>
      <span className={css.textRequest}>Запрос</span>
      <span className={css.numberRequest}>{nRequest}</span>
      <span className={css.textDate}>Дата</span>
      <span className={css.numberDate}>{nDate}</span>
      <span className={css.textKadastr}>Кадастровый номер</span>
      <span className={css.numberKadastr}>{nKadastr}</span>
    </div>
  );
};
