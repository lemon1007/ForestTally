import {defineComponent, PropType} from 'vue';
import s from '../../stylesheets/item/ItemList.module.scss';

export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div>ItemList</div>
    );
  }
});
