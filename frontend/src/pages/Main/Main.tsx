import { useLocation, useNavigate } from 'react-router-dom';
import css from './Main.module.css';

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className={css.mainContainer}>
      <div className={css.ryabchikTipsContainer}>
        <div className={css.ryabchikContainer}>
          <div className={css.ryabchikImage} />
        </div>
        <div className={css.descriptionContainer}>
          <h2>
            Приветствую! Я Рябчик — помогу разобраться на сайте и в тонкостях жизни краснокнижных
            видов Москвы!
          </h2>
          <p>
            Я уже не строю гнезда в Москве, потому что боюсь скоплений людей, машин и люблю тенистые
            старые леса. Но <span>хочу вернуться и помочь сохранить</span> и другие виды животных и
            птиц
            <span> и восстановить наш родной дом</span>!
          </p>
          <button
            type="button"
            onClick={() => {
              navigate('/requestuser');
            }}
          >
            Я тебе помогу!
          </button>
          <span className={css.ryabchikPointerArrow} />
        </div>
      </div>
    </div>
  );
};

export default Main;
