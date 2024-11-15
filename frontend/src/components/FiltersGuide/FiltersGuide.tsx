import css from './FiltersGuide.module.css';
import { useChooseParks, useChooseStatus, useChooseTypes, useShowCount } from '../../store';
import { ShowCount, ChooseType, ButtonFilter, InputFilter } from '../ui';
import { useEffect, useState } from 'react';
import { ArrowDown } from '../../assets';

export const FiltersGuide = () => {
  const [activeShowCount, setActiveShowCount] = useState<boolean>(false);
  const [activeChooseParks, setActiveChooseParks] = useState<boolean>(false);
  const [activeChooseTypes, setActiveChooseTypes] = useState<boolean>(false);
  const [activeChooseStatus, setActiveChooseStatus] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<string>('');

  const { count, setCount } = useShowCount();
  const { parks, setParks } = useChooseParks();
  const { types, setTypes } = useChooseTypes();
  const { status, setStatus } = useChooseStatus();

  // useEffect(() => {}, [count, parks, types, status, inputValue]);

  const allParks: string[] = ['Все парки', 'Битцевский лес', 'Лосиный остров'];
  const allTypes: string[] = [
    'Все виды',
    'Млекопитающие',
    'Птицы',
    'Пресмыкающиеся и земноводные',
    'Рыбы',
    'Беспозвоночные',
    'Сосудистые растения',
    'Моховидные',
    'Водоросли',
    'Лишайники',
    'Грибы',
  ];
  const allStatus: string[] = [
    'Все стадии',
    '0 / Практически исчезли',
    '1 / Под угрозой исчезновения',
    '2 / Редкие или малочисленные',
    '3 / Уязвимые, чья численность может сократиться',
    '4 / Недостаточно данных',
  ];

  return (
    <>
      <div className={css.mainContainer}>
        <div className={css.filters}>
          <InputFilter setValue={setInputValue} />
          <ButtonFilter data={parks} active={activeChooseParks} setActive={setActiveChooseParks} />
          <ButtonFilter data={types} active={activeChooseTypes} setActive={setActiveChooseTypes} />
          <ButtonFilter
            data={status}
            active={activeChooseStatus}
            setActive={setActiveChooseStatus}
          />
          <button
            type="button"
            className={css.filtersCountShow}
            onClick={() => {
              setActiveShowCount(!activeShowCount);
            }}
          >
            {count}
            <span>
              <ArrowDown />
            </span>
          </button>
        </div>
      </div>
      <span className={css.popupChooseParks}>
        <ChooseType
          active={activeChooseParks}
          setActive={setActiveChooseParks}
          data={allParks}
          setType={setParks}
        />
      </span>
      <span className={css.popupChooseTypes}>
        <ChooseType
          active={activeChooseTypes}
          setActive={setActiveChooseTypes}
          data={allTypes}
          setType={setTypes}
        />
      </span>
      <span className={css.popupChooseStatus}>
        <ChooseType
          active={activeChooseStatus}
          setActive={setActiveChooseStatus}
          data={allStatus}
          setType={setStatus}
        />
      </span>
      <span className={css.popupChooseCount}>
        <ShowCount active={activeShowCount} setActive={setActiveShowCount} />
      </span>
    </>
  );
};
