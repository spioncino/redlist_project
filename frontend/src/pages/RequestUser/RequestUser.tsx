import { useState } from 'react';
import { HelperRequestUser, Paginate } from '../../components';
import css from './RequestUser.module.css';
import { ArrowDown, PaperClipIcon } from '../../assets';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { motion } from 'framer-motion';
import { RequestInfo } from '../../components/ui/RequestInfo/RequestInfo';

const RequestUser = () => {
  const [active, setActive] = useState<boolean>(false);

  const [value, setValue] = useState<string>('');

  const [showHistory, setShowHistory] = useState<boolean>(false);

  const [coordinates, setCoordinates] = useState(null);

  const [pageTypes, setPageTypes] = useState<number>(0);
  const [pageHistory, setPageHistory] = useState<number>(0);

  // Обработчик клика по карте
  const handleMapClick = (e) => {
    const coords = e.get('coords'); // Получаем координаты клика
    setCoordinates(coords); // Обновляем состояние
  };

  return (
    <div className={css.mainContainer}>
      <HelperRequestUser />
      <button
        type="button"
        onClick={() => {
          setActive(!active);
        }}
        className={css.newRequestButton}
      >
        Новая заявка
      </button>
      <div className={active ? css.requestContainer : 'none'}>
        <div className={css.requestContent}>
          <h5 className={css.titleH4}>Укажите предполагаемое название растения или животного</h5>
          <form className={css.formAnimals}>
            <input
              placeholder="Начните вводить"
              className={css.inputAnimals}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </form>
          <h5 className={css.titleH4}>Прикрепите фотографию</h5>
          <form className={css.fileUploadForm}>
            <input type="file" hidden id="file-upload" />
            <label htmlFor="file-upload" className={css.fileUploadLabel}>
              <span className={css.paperClipIconFile}>
                <PaperClipIcon />
              </span>
              <span className={css.textFileUpload}>Загрузить фото</span>
            </label>
          </form>
          <form className={css.personalDataProcessing}>
            <input type="checkbox" />
            <label>
              Согласен на обработку персональных данных и передачу авторских прав на изображения
            </label>
          </form>
          <button
            type="submit"
            className={css.saveButton}
            onClick={() => {
              window.location.reload();
            }}
          >
            Сохранить и отправить
          </button>
        </div>
        <div className={css.mapsContainer}>
          <h5 className={css.titleH4}>Поставьте геометку, где вы увидели краснокнижный вид</h5>
          <div className={css.mapsContent}>
            <YMaps>
              <Map
                width="445px"
                height="202px"
                defaultState={{ center: [55.758188, 37.451226], zoom: 12 }}
                onClick={handleMapClick}
              >
                {coordinates && (
                  <Placemark
                    geometry={coordinates}
                    properties={{
                      hintContent: 'Моя метка',
                      balloonContent: 'Это метка, добавленная пользователем',
                    }}
                  />
                )}
              </Map>
            </YMaps>
          </div>
        </div>
      </div>
      <div className={css.mainContent}>
        <div className={css.activeRequestContainer}>
          <h5 className={css.titleH5}>Новые заявки</h5>
          <div className={css.activeRequestContent}>
            <ul className={css.activeRequestNav}>
              <li className={css.numRequest}>Номер заявки</li>
              <li className={css.dateRequest}>Дата</li>
              <li className={css.animRequest}>Животное</li>
              <li>Автор</li>
            </ul>
          </div>
          <RequestInfo active={true} users={false} />
        </div>
        <button className={css.titleH5} onClick={() => setShowHistory(!showHistory)} type="button">
          Рассмотренные заявки{' '}
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
          <RequestInfo active={false} />
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

export default RequestUser;
