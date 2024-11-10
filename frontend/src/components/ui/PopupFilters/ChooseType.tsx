import { ArrowUp } from '../../../assets';
import css from './ChooseType.module.css';

type ChooseTypeProps = {
  active: boolean;
  setActive: (value: boolean) => void;
  data: string[];
  setType: (value: string) => void;
};

export const ChooseType = ({ active, setActive, data, setType }: ChooseTypeProps) => {
  return (
    <div className={active ? css.active : css.noActive}>
      {data.map((dt: string, index: number) => {
        return (
          <li
            key={dt}
            onClick={() => {
              setActive(false);
              setType(dt);
            }}
          >
            <span>{dt} </span> <span> {index == 0 && <ArrowUp />}</span>
          </li>
        );
      })}
    </div>
  );
};
