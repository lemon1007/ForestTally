import {defineComponent} from 'vue';
import {RouterLink} from 'vue-router';
import {Button} from '../shared/Button';
import {FloatButton} from '../shared/FloatButton';
import {Center} from '../shared/Center';
import {Icon} from '../shared/Icon';
import s from '../stylesheets/StartPage.module.scss';
import {OverlayIcon} from '../shared/Overlay';
import {MainLayout} from '../layouts/MainLayout';

export const StartPage = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout>{
        {
          title: () => '森林记账',
          icon: () => <OverlayIcon/>,
          default: () => <>
            <Center class={s.icon_wrapper}>
              <Icon name="tree" class={s.icon}></Icon>
            </Center>
            <div class={s.button_wrapper}>
              <RouterLink to="/items/create">
                <Button class={s.button}>开始记账</Button>
              </RouterLink>
            </div>
            <RouterLink to="/items/create">
              <FloatButton IconName="add"/>
            </RouterLink>
          </>
        }
      }</MainLayout>
    );
  }
});