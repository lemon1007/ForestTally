import {defineComponent, PropType} from 'vue';
import s from '../../stylesheets/item/ItemCreate.module.scss';

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div>ItemCreate</div>
    );
  }
});
