import s from '../../../stylesheets/Welcome.module.scss';
import {FunctionalComponent} from 'vue';

export const Third:FunctionalComponent = () => {
  return (
    <div class={s.mainWrapper}>
      <div class={s.card}>
        <svg class={s.iconStyle}>
          <use xlinkHref="#third"></use>
        </svg>
        <div class={s.fontStyle}>
          <div>数据可视化<br/>收支变化一目了然</div>
        </div>
      </div>
    </div>
  );
};
Third.displayName = 'Third';