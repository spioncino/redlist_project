import { useState } from 'react';
import {
  BigAcceptIcon,
  BigEditIcon,
  BigRedCloseIcon,
  CrossCloseIcon,
  EditIcon,
  GreenAcceptIcon,
  MapIcon,
  PaperClipIcon,
  RedCloseIcon,
} from '../../../assets';
import css from './RequestInfo.module.css';

type RequestInfoProps = {
  active: boolean;
  users: boolean;
};

export const RequestInfo = ({ active }: RequestInfoProps) => {
  const TEMP_CHECK: boolean = true;
  const TEMP_USER_CHECK: boolean = true;

  const [activeEdit, setActiveEdit] = useState<boolean>(false);

  return (
    <>
      <span className={activeEdit ? css.editMenuBorder : 'none'} />
      <ul className={active ? css.mainContainerActive : css.mainContainerNoActive}>
        <li className={css.numberRequest}>1</li>
        <li className={css.dateRequest}>18.10.2024</li>
        <li className={css.animalRequest}>Куница</li>
        <li className={css.authorRequest}>Надеждова А.А</li>
        <span className={css.buttonsRequets}>
          <li className={css.buttonMapRequest}>
            <span>
              <MapIcon />
            </span>
            На карте
          </li>
          <li className={css.buttonPaperClipRequest}>
            <span>
              <PaperClipIcon />
            </span>
            Смотреть фотографию
          </li>
          {active ? (
            TEMP_USER_CHECK && (
              <span className={css.processingRequest}>
                <span className={css.iconsRequest}>
                  <BigRedCloseIcon />
                </span>
                <span className={css.iconsRequest}>
                  <BigAcceptIcon />
                </span>
                <span
                  className={css.iconsRequest}
                  onClick={() => {
                    setActiveEdit(!activeEdit);
                  }}
                >
                  <BigEditIcon />
                </span>
              </span>
            )
          ) : (
            <span>
              {TEMP_CHECK ? (
                <li className={css.acceptRequestStatus}>
                  <span className={css.iconsRequest}>
                    <GreenAcceptIcon />
                  </span>
                  Одобрено
                </li>
              ) : (
                <li className={css.cancelRequestStatus}>
                  <span>
                    <RedCloseIcon />
                  </span>
                  Отклонено
                </li>
              )}
            </span>
          )}
        </span>
      </ul>
      <div className={activeEdit ? css.editMenu : 'none'}>
        <h6 className={css.titleH6}>Редактирование данных</h6>
        <form className={css.formEditRequest}>
          <input placeholder="Начните вводить верное название животного" />
        </form>
        <button className={css.buttonEditRequest}>Сохранить и принять заявку</button>
      </div>
    </>
  );
};
