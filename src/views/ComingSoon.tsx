import {defineComponent, PropType} from 'vue';
import {Center} from '../shared/Center';
import {Icon} from '../shared/Icon';
import s from '../stylesheets/ComingSoon.module.scss';
import {Button} from '../shared/Button';
import {useRouter} from 'vue-router';

export const ComingSoon = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const router = useRouter();
    const onClick = () => {
      router.push('/');
    };
    return () => (
      <div class={s.tree_wrapper}>
        <Center class={s.pig_wrapper}>
          <Icon name="tree" class={s.tree}/>
        </Center>
        <p class={s.text}>敬请期待</p>
        <div class={s.return_button_wrapper}>
          <Button onClick={onClick} class={s.return_button}>返回</Button>
        </div>
      </div>
    );
  }
});
