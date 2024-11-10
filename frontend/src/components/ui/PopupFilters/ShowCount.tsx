import { ArrowUp } from '../../../assets';
import { useShowCount } from '../../../store';
import css from './ShowCount.module.css';

type ShowCountProps = {
  active: boolean;
  setActive: (value: boolean) => void;
};

export const ShowCount = ({ active, setActive }: ShowCountProps) => {
  const counts: number[] = [10, 15, 20, 25, 50];

  const { count, setCount } = useShowCount();

  return (
    <div className={active ? css.active : css.noActive}>
      {counts.map((num: number) => {
        return (
          <li
            key={num}
            onClick={() => {
              setCount(num);
              setActive(false);
            }}
          >
            {num}{' '}
            {num == 10 && (
              <span>
                <ArrowUp />
              </span>
            )}
          </li>
        );
      })}
    </div>
  );
};
