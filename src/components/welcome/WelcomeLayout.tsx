import {defineComponent} from 'vue';
import s from '../../stylesheets/Welcome/WelcomeLayout.module.scss';

export const WelcomeLayout = defineComponent({
  setup: (props, context) => {
    const {slots} = context;
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          {slots.pic?.()}
          <div class={s.fontStyle}>
            {slots.title?.()}
          </div>
        </div>
        <div class={s.action}>
          {slots.buttons?.()}
        </div>
      </div>
    );
  }
});