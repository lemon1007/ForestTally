import {defineComponent, ref} from 'vue';
import {Button} from '../shared/Button';
import {FloatButton} from '../shared/FloatButton';
import {Center} from '../shared/Center';
import {Icon} from '../shared/Icon';
import {Navbar} from '../shared/Navbar';
import s from '../stylesheets/StartPage.module.scss';
import {Overlay} from '../shared/Overlay';

export const StartPage = defineComponent({
  setup: (props, context) => {
    const refOverlayVisible = ref(false);
    const onClickMenu = () => {
      refOverlayVisible.value = !refOverlayVisible.value;
      console.log(refOverlayVisible.value);
    };
    return () => (
      <div>
        <Navbar>{
          {
            default: () => '森林记账',
            icon: () => <Icon name="menu" class={s.navIcon} onClick={onClickMenu}/>
          }
        }</Navbar>
        <Center class={s.icon_wrapper}>
          <Icon name="tree" class={s.icon}></Icon>
        </Center>
        <div class={s.button_wrapper}>
          <Button class={s.button}>开始记账</Button>
        </div>
        <FloatButton IconName="add"/>
        {
          refOverlayVisible.value &&
          <Overlay onClose={() => refOverlayVisible.value = false}/>
        }
      </div>
    );
  }
});