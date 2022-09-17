import {defineComponent} from 'vue';
import {Icon} from './Icon';
import s from '../stylesheets/sharedStyle/FloatButton.module.scss';

export const FloatButton = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.floatButton}>
        <Icon name="add" class={s.icon}></Icon>
      </div>
    );
  }
});