import { ArrowDown } from '../../../assets';
import css from './ButtonFilter.module.css';

type ButtonFilterProps = {
  data: string | number;
  active: boolean;
  setActive: (value: boolean) => void;
};

export const ButtonFilter = ({ data, active, setActive }: ButtonFilterProps) => {
  return (
    <button
      type="button"
      className={css.mainContainer}
      onClick={() => {
        setActive(!active);
      }}
    >
      <p>
        <span className={css.text}>{data}</span>
        <span className={css.arrow}>
          <ArrowDown />
        </span>
      </p>
    </button>
  );
};
