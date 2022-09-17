import {defineComponent, PropType} from 'vue';
import {Icon} from './Icon';
import s from '../stylesheets/sharedStyle/FloatButton.module.scss';

export const FloatButton = defineComponent({
  props: {
    IconName: {
      type: String as PropType<string>,
      required: true,
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={s.floatButton}>
        <Icon name={props.IconName} class={s.icon}></Icon>
      </div>
    );
  }
});