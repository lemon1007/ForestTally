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
          <div>每天记一笔<br/>养成生活好习惯</div>
        </div>
      </div>
    </div>
  );
};

Second.displayName = 'Second';