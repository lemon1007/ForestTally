import {defineComponent} from 'vue';
import {Button} from '../shared/Button';
import {FloatButton} from '../shared/FloatButton';
import {Center} from '../shared/Center';
import {Icon} from '../shared/Icon';
import {Navbar} from '../shared/Navbar';
import s from '../stylesheets/StartPage.module.scss';

export const StartPage = defineComponent({
  setup: (props, context) => {
    const onClick = () => {
      console.log('hi');
    };
    return () => (
      <div>
        <Navbar>{
          {
            default: '森林记账',
            icon: <Icon name="menu" class={s.navIcon}/>
          }
        }</Navbar>
        <Center class={s.icon_wrapper}>
          <Icon name="tree" class={s.icon}></Icon>
        </Center>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>开始记账</Button>
        </div>
        <FloatButton IconName="add"/>
      </div>
    );
  }
});