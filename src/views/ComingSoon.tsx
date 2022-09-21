import {defineComponent, PropType} from 'vue';
import {Center} from '../shared/Center';
import {Icon} from '../shared/Icon';
import s from '../stylesheets/ComingSoon.module.scss'

export const ComingSoon = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={s.tree_wrapper}>
        <Center class={s.pig_wrapper}>
          <Icon name="tree" class={s.tree}/>
        </Center>
        <p class={s.text}>敬请期待</p>
      </div>
    );
  }
});
