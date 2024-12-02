import { useEffect, useState } from 'react';
import css from './Maps.module.css';
import { ArrowDown, ArrowUp, SearchIcon } from '../../assets';
import { YMaps, Map, ZoomControl, Polygon, Placemark } from '@pbe/react-yandex-maps';
import { motion } from 'framer-motion';
import {
  CheckBox,
  HelperMapsPage,
  Paginate,
  SkeletonsCard,
  SkeletonsHistoryKadastr,
} from '../../components';
import { HistoryKadastr } from '../../components/ui/HistoryKadastr/HistoryKadastr';

const Maps = () => {
  const [value, setValue] = useState<String>('');

  const [showTypes, setShowTypes] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const [pageTypes, setPageTypes] = useState<number>(0);
  const [pageHistory, setPageHistory] = useState<number>(0);

  // фильтры

  const [allObjectFilter, setAllObjectFilter] = useState<boolean>(true);

  const [mammalsFilter, setMammalsFilter] = useState<boolean>(true);
  const [birdsFilter, setBirdsFilter] = useState<boolean>(true);
  const [reptilesFilter, setReptilesFilter] = useState<boolean>(true);
  const [fishFilter, setFishFilter] = useState<boolean>(true);
  const [invertebratesFilter, setInvertebratesFilter] = useState<boolean>(true);
  const [vascularFilter, setVascularFilter] = useState<boolean>(true);
  const [mossesFilter, setMossesFilter] = useState<boolean>(true);
  const [seaweedFilter, setSeaweedFilter] = useState<boolean>(true);
  const [lichensFilter, setLichensFilter] = useState<boolean>(true);
  const [mushroomsFilter, setMushroomsFilter] = useState<boolean>(true);

  const [statusZeroFilter, setStatusZeroFilter] = useState<boolean>(true);
  const [statusOneFilter, setStatusOneFilter] = useState<boolean>(true);
  const [statusTwoFilter, setStatusTwoFilter] = useState<boolean>(true);
  const [statusThreeFilter, setStatusThreeFilter] = useState<boolean>(true);
  const [statusFourFilter, setStatusFourFilter] = useState<boolean>(true);

  const [acceptExpertFilter, setAcceptExpertFilter] = useState<boolean>(true);
  const [processExpertFilter, setProcessExpertFilter] = useState<boolean>(true);
  // useEffect(() => {

  // }, [value])

  return (
    <div className={css.mainContainer}>
      <HelperMapsPage />
      <div className={css.searchKadastr}>
        <form className={css.formKadastr}>
          <input
            className={css.inputKadastr}
            placeholder="Кадастровый номер участка"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <label>
            <SearchIcon />
          </label>
        </form>
      </div>
      <div className={css.mapsContainer}>
        <div className={css.mapsFilters}>
          <p className={css.titleAllObjects}>Все объекты</p>
          <CheckBox
            text={'Все объекты'}
            active={allObjectFilter}
            onClick={() => setAllObjectFilter(!allObjectFilter)}
          />
          <hr className={css.hrAfterAllObjects} />
          <p className={css.titleTypes}>Вид</p>
          <span className={css.checkOfTypes}>
            <CheckBox
              text={'Млекопитающие'}
              active={mammalsFilter}
              onClick={() => setMammalsFilter(!mammalsFilter)}
            />
            <CheckBox
              text={'Птицы'}
              active={birdsFilter}
              onClick={() => setBirdsFilter(!birdsFilter)}
            />
            <CheckBox
              text={'Пресмыкающиеся и земноводные'}
              active={reptilesFilter}
              onClick={() => setReptilesFilter(!reptilesFilter)}
            />
            <CheckBox
              text={'Рыбы'}
              active={fishFilter}
              onClick={() => setFishFilter(!fishFilter)}
            />
            <CheckBox
              text={'Беспозвоночные'}
              active={invertebratesFilter}
              onClick={() => setInvertebratesFilter(!invertebratesFilter)}
            />
            <CheckBox
              text={'Сосудистые растения'}
              active={vascularFilter}
              onClick={() => setVascularFilter(!vascularFilter)}
            />
            <CheckBox
              text={'Моховидные'}
              active={mossesFilter}
              onClick={() => setMossesFilter(!mossesFilter)}
            />
            <CheckBox
              text={'Водоросли'}
              active={seaweedFilter}
              onClick={() => setSeaweedFilter(!seaweedFilter)}
            />
            <CheckBox
              text={'Лишайники'}
              active={lichensFilter}
              onClick={() => setLichensFilter(!lichensFilter)}
            />
            <CheckBox
              text={'Грибы'}
              active={mushroomsFilter}
              onClick={() => setMushroomsFilter(!mushroomsFilter)}
            />
          </span>
          <hr className={css.hrAfterTypes} />
          <p className={css.titleOfStatus}>Природоохранный статус</p>
          <span className={css.checkOfStatus}>
            <CheckBox
              text={'0'}
              active={statusZeroFilter}
              onClick={() => setStatusZeroFilter(!statusZeroFilter)}
            />
            <CheckBox
              text={'1'}
              active={statusOneFilter}
              onClick={() => setStatusOneFilter(!statusOneFilter)}
            />
            <CheckBox
              text={'2'}
              active={statusTwoFilter}
              onClick={() => setStatusTwoFilter(!statusTwoFilter)}
            />
            <CheckBox
              text={'3'}
              active={statusThreeFilter}
              onClick={() => setStatusThreeFilter(!statusThreeFilter)}
            />
            <CheckBox
              text={'4'}
              active={statusFourFilter}
              onClick={() => setStatusFourFilter(!statusFourFilter)}
            />
          </span>
          <hr className={css.hrAfterStatus} />
          <p className={css.titleOfPoints}>Тип меток</p>
          <span className={css.checkOfPoints}>
            <CheckBox
              text={'Подтверждены экспертами'}
              active={acceptExpertFilter}
              onClick={() => setAcceptExpertFilter(!acceptExpertFilter)}
            />
            <CheckBox
              text={'Не подтверждены экспертами(сообщения от горожан)'}
              active={processExpertFilter}
              onClick={() => setProcessExpertFilter(!processExpertFilter)}
            />
          </span>
        </div>
        <p className={css.mapsHelp}>Если карта не появилась, перезагрузите страницу</p>
        <div className={css.mapsContent}>
          <YMaps
            query={{
              ns: 'use-load-option',
              load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
            }}
          >
            <Map
              defaultState={{ center: [55.78177, 37.425662], zoom: 13, controls: [] }}
              width="804px"
              height="592px"
            >
              <ZoomControl options={{ float: 'right' }} />
              <Placemark />
            </Map>
          </YMaps>
        </div>
      </div>
      <div className={css.typesContainer}>
        <button className={css.titleH5} onClick={() => setShowTypes(!showTypes)} type="button">
          Виды, обитающие на этом участке{' '}
          <motion.span
            className={css.pointerArrow}
            animate={{
              rotate: showTypes ? 180 : 0,
            }}
            initial={false}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ArrowDown />
          </motion.span>
        </button>
        <div className={showTypes ? css.typesContainer : 'none'}>
          {Array.from({ length: 5 }, (_, i) => (
            <SkeletonsCard key={i} />
          ))}
          <Paginate
            totalPages={1}
            nowPage={(page) => {
              setPageTypes(page);
            }}
          />
        </div>
      </div>
      <div className={css.historyContainer}>
        <button className={css.titleH5} onClick={() => setShowHistory(!showHistory)} type="button">
          История просмотренных участков{' '}
          <motion.span
            className={css.pointerArrow}
            animate={{
              rotate: showHistory ? 180 : 0,
            }}
            initial={false}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ArrowDown />
          </motion.span>
        </button>
        <div className={showHistory ? css.historyContent : 'none'}>
          {/* <HistoryKadastr nRequest={1} nDate="08.08.2008" nKadastr="77:03:0001001:57" />
          <HistoryKadastr nRequest={1} nDate="08.08.2008" nKadastr="77:03:0001001:57" /> */}
          {Array.from({ length: 5 }, (_, i) => (
            <SkeletonsHistoryKadastr key={i} />
          ))}
          <Paginate
            totalPages={1}
            nowPage={(page) => {
              setPageHistory(page);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Maps;
