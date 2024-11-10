import { useState } from 'react';
import { SearchIcon } from '../../../assets';
import css from './InputFilter.module.css';

export const InputFilter = ({ setValue }: { setValue: (value: string) => void }) => {
  const [data, setData] = useState<string>('');

  return (
    <form className={css.mainContainer}>
      <input
        placeholder="Животное, парк.."
        value={data}
        onChange={(e) => {
          setData(e.target.value);
          setValue(e.target.value);
        }}
      />
      <label>
        <SearchIcon />
      </label>
    </form>
  );
};
