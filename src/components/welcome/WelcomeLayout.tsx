import s from '../../stylesheets/Welcome/WelcomeLayout.module.scss';
import {FunctionalComponent} from 'vue';

export const WelcomeLayout: FunctionalComponent = (props, context) => {
  const {slots: {icon, title, buttons}} = context;
  return (
    <div class={s.wrapper}>
      <div class={s.card}>
        {icon?.()}
        <div class={s.fontStyle}>
          {title?.()}
        </div>
      </div>
      <div class={s.action}>
        {buttons?.()}
      </div>
    </div>
  );
};



