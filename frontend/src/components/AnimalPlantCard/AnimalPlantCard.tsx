import { ImageAnimals, Tag } from '../ui';
import css from './AnimalPlantCard.module.css';

export const AnimalPlantCard = () => {
  return (
    <div className={css.mainContainer}>
      <ImageAnimals />
      <div className={css.descContainer}>
        <p className={css.titleOfAnimal}>
          <b className={css.mainTitleOfAnimal}>Аномодон утонченный</b>
          <i className={css.otherTitleOfAnimal}>Anomodon attenuatus (Hedw.) Hueb.</i>
        </p>
        <p className={css.classOfAnimal}>
          <span>Порядок:</span> гипновые
        </p>
        <p className={css.classOfAnimal}>
          <span>Семейство:</span> аномодоновые
        </p>
        <p className={css.descriptionOfAnimal}>
          Эпифит старых широколиственных лесов. В целом более южный вид, встречающийся в нашей зоне
          в основаниях стволов старых широколиственных деревьев и на свежем валеже, а также на
          выходах известняка.
        </p>
        <div className={css.listOfTags}>
          <Tag />
          <Tag />
          <Tag />
        </div>
      </div>
    </div>
  );
};
