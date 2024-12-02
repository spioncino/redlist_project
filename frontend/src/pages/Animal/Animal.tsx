import { Link } from 'react-router-dom';
import css from './Animal.module.css';
import { YMaps, Map, ZoomControl, Polygon, Placemark } from '@pbe/react-yandex-maps';

const Animal = () => {
  return (
    <div className={css.mainContainer}>
      <Link to={'/guide'} className={css.backToGuide}>
        <span>←</span> Назад
      </Link>
      <main className={css.mainContent}>
        <div className={css.imageContainer}>
          <span className={css.divisionOnImage}>Млекопитающие</span>
          <div className={css.image} />
        </div>
        <div className={css.descContainer}>
          <p className={css.titleOfAnimal}>
            <b className={css.mainTitleOfAnimal}>Лесная куница</b>
            <i className={css.otherTitleOfAnimal}>Martes martes (Linnaeus, 1758)</i>
          </p>
          <p className={css.classOfAnimal}>
            <span>Порядок:</span> гипновые
          </p>
          <p className={css.classOfAnimal}>
            <span>Семейство:</span> аномодоновые
          </p>
          <p className={css.descText}>
            <span>Распространение:</span> В 1920-х гг. лесная куница встречалась в Лосином Острове.
            Отмечались заходы в Измайловский лес. В годы Великой Отечественной войны лесные куницы
            стали обычными в Измайловском лесу. Однако в период с 1980 по 2000 гг. куницы обитали
            только на территории 4 лесных массивов города: в Лосином Острове, Измайловском лесу,
            Битцевском и Тропарёвском л-ках. Известны заходы куницы в Ясеневский и Юго-Западный л-ки
            [10]. В середине 1980-х г. В.В. Кучерук наблюдал куницу в застроенной части города на
            улице Бутлерова. Она продолжительное время жила в глухих дворах с крупными деревьями и
            хорошо развитым кустарников, которые находились между многоэтажными домами [10]. В 2006
            г. куница отмечена на ул. Гамалеи [26]. За 2011–2021 гг. вид отмечен в Зеленограде в
            2017 г. [27] и в 2020  г. [2, 6, 21], в долине Сходни в Куркине в 2020 г. [24], в ГБС в
            2020 г. [19] и в 2021 г. [28, 29], в Лосином Острове близ Гольянова в 2018 г. [26] и в
            Яузском л-ке в 2020 г. [18], в Кусковском л-ке в 2020 г. [23], в Терлецком л-ке в 2021
            г. [30], в Битцевском лесу в 2017 г. [20] и в 2020 г. [3, 9, 22], в ФЗ «Долгие пруды» в
            2018 г. [5], в 2018-2020 гг. в ЛЗ «Тёплый Стан» [4, 7, 8], в Северном Бутове в 2020 г.
            [3], и в 2021 г. [11], в Бутовском л-ке к востоку от д. Бачурино [17], в долине Ликовы
            между Московским и Мешковом в 2020 г. [31].
          </p>
        </div>
      </main>
      <div className={css.mapContainer}>
        <YMaps
          query={{
            ns: 'use-load-option',
            load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
          }}
        >
          <Map
            defaultState={{ center: [55.78177, 37.425662], zoom: 13, controls: [] }}
            width="544px"
            height="300px"
          >
            <Placemark />
          </Map>
        </YMaps>
      </div>
    </div>
  );
};

export default Animal;
