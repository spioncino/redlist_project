import css from './ButtonThanks.module.css';

export const ButtonThanks = ({ text }: { text: string }) => {
  return (
    <button type="button" className={css.mainContent}>
      {text}
    </button>
  );
};
