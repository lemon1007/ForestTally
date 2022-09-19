import s from '../../../stylesheets/Welcome.module.scss';
import {FunctionalComponent} from 'vue';

export const First: FunctionalComponent = () => {
  return (
    <div class={s.mainWrapper}>
      <div class={s.card}>
        <svg class={s.iconStyle}>
          <use xlinkHref="#first"></use>
        </svg>
        <div class={s.fontStyle}>
          <div>这是一段话<br/>这里还有一段话</div>
        </div>
      </div>
    </div>
  );
};

First.displayName = 'First';