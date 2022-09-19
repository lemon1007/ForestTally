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
          <div>这是三段话<br/>还会有第四段哦</div>
        </div>
      </div>
    </div>
  );
};
Third.displayName = 'Third';