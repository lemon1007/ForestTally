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
          <div>聚木才能成林<br/>汇流方可成海</div>
        </div>
      </div>
    </div>
  );
};

First.displayName = 'First';