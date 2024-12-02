import { CheckFalse, CheckTrue } from '../../../assets';
import css from './CheckBox.module.css';

type CheckBoxProps = {
  active: boolean;
  text: string;
  onClick: () => void;
};

export const CheckBox = ({ active, text, onClick }: CheckBoxProps) => {
  return (
    <div className={css.mainContainer} onClick={onClick}>
      <span>{active ? <CheckTrue /> : <CheckFalse />}</span>
      <p>{text}</p>
    </div>
  );
};
