import { useEffect, useState } from 'react';
import css from './Maps.module.css';
import { ArrowDown, ArrowUp, SearchIcon } from '../../assets';
import { YMaps, Map, ZoomControl, Polygon, Placemark } from '@pbe/react-yandex-maps';
import { motion } from 'framer-motion';
import { HelperMapsPage, Paginate, SkeletonsCard, SkeletonsHistoryKadastr } from '../../components';
import { HistoryKadastr } from '../../components/ui/HistoryKadastr/HistoryKadastr';

const Maps = () => {
  const [value, setValue] = useState<String>('');

  const [showTypes, setShowTypes] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const [pageTypes, setPageTypes] = useState<number>(0);
  const [pageHistory, setPageHistory] = useState<number>(0);

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
        <div className={css.mapsFilters}></div>
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
            totalPages={3}
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
            totalPages={3}
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
