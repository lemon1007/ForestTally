import {defineComponent, PropType} from 'vue';
import s from '../stylesheets/ItemPage.modue.scss';

export const ItemPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div>ItemPage</div>
    );
  }
});
