import { Heart } from '../../../assets';
import { BigTextForHelper } from '../BigTextForHelper/BigTextForHelper';
import { ButtonThanks } from '../ButtonThanks/ButtonThanks';
import css from './HelperRequestUser.module.css';

export const HelperRequestUser = () => {
  return (
    <div className={css.mainContainer}>
      <div className={css.imageContainer}>
        <div className={css.ryabchikImage} />
      </div>
      <div className={css.descContainer}>
        <BigTextForHelper>
          Помоги узнать популяцию краснокнижных видов и спасти их!
        </BigTextForHelper>
        <p className={css.descText}>
          <span>Сообщи о местоположении</span> увиденного животного{' '}
          <span>и прикрепи фотографию</span>. Это поможет специалистам узнать, где находятся редкие
          животные, и защитить их.
        </p>
        <ButtonThanks text="Уже спешу!" />
      </div>
      <span className={css.heart}>
        <Heart />
      </span>
      <span className={css.pointerArrow} />
    </div>
  );
};
