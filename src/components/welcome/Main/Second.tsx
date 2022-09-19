import s from '../../../stylesheets/Welcome.module.scss';
import {FunctionalComponent} from 'vue';

export const Second:FunctionalComponent = () => {
  return (
    <div class={s.mainWrapper}>
      <div class={s.card}>
        <svg class={s.iconStyle}>
          <use xlinkHref="#second"></use>
        </svg>
        <div class={s.fontStyle}>
          <div>这是二段话<br/>还会有第三段哦</div>
        </div>
      </div>
    </div>
  );
};

Second.displayName = 'Second';