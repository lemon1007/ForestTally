import {defineComponent, PropType} from 'vue';
import s from '../stylesheets/sharedStyle/Center.module.scss';

const directionMap = {
  'x': s.horizontal,
  'y': s.vertical,
  'horizontal': s.horizontal,
  'vertical': s.vertical
};

export const Center = defineComponent({
  props: {
    direction: {
      type: String as PropType<'x' | 'y' | 'horizontal' | 'vertical'>,
      default: 'horizontal'
    }
  },
  setup: (props, context) => {
    const extraClass = directionMap[props.direction];
    return () => (
      <div class={[s.center, extraClass]}>
        {context.slots.default?.()}
      </div>
    );
  }
});
