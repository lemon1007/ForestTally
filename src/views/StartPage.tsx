import {defineComponent} from 'vue';
import {Button} from '../shared/Button';
import s from '../stylesheets/StartPage.module.scss';
import {FloatButton} from '../shared/FloatButton';
import {Center} from '../shared/Center';
import {Nav} from '../shared/Nav';
import {Icon} from '../shared/Icon';

export const StartPage = defineComponent({
  setup: (props, context) => {
    const onClick = () => {
      console.log('hi');
    };
    return () => (
      <div>
        <Nav></Nav>
        <Center class={s.icon_wrapper}>
          <Icon name="tree" class={s.icon}></Icon>
        </Center>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>测试</Button>
        </div>
        <FloatButton IconName="add"/>
      </div>
    );
  }
});