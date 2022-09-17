import {defineComponent, PropType} from 'vue';

export const Nav = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div>Nav</div>
    );
  }
});
