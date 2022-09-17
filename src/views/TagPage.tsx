import {defineComponent, PropType} from 'vue';

export const TagPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div>TagPage</div>
    );
  }
});
