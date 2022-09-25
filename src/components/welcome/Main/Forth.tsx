import s from '../../../stylesheets/Welcome.module.scss';
import {FunctionalComponent} from 'vue';

export const Forth: FunctionalComponent = () => {
  return (
    <div class={s.mainWrapper}>
      <div class={s.card}>
        <svg class={s.iconStyle}>
          <use xlinkHref="#forth"></use>
        </svg>
        <div class={s.fontStyle}>
          <div>点击开启<br/>踏上记账新旅途</div>
        </div>
      </div>
    </div>
  );
};

Forth.displayName = 'Forth';