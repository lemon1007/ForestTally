import {defineComponent, onMounted, PropType, ref} from 'vue';
import s from '../../stylesheets/item/ItemCreate.module.scss';
import {Icon} from '../../shared/Icon';
import {MainLayout} from '../../layouts/MainLayout';
import {Tabs, Tab} from '../../shared/Tabs';
import {InputPad} from './InputPad';
import {http} from '../../shared/Http';
import {Resources, Tag} from '../../env';
import {useTags} from '../../shared/useTags';
import {Tags} from './Tags';


export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const refKind = ref('支出');
    return () => (
      <MainLayout>{
        {
          title: () => '记一笔',
          icon: () => <Icon name="return" class={s.navIcon}></Icon>,
          default: () => <>
            <div class={s.wrapper}>
              <Tabs v-model:selected={refKind.value} class={s.tabs}>
                <Tab name="支出">
                  <Tags kind="expenses"></Tags>
                </Tab>
                <Tab name="收入">
                  <Tags kind="income"></Tags>
                </Tab>
              </Tabs>
            </div>
            <div class={s.inputPad_wrapper}>
              <InputPad/>
            </div>
          </>
        }
      }</MainLayout>
    );
  }
});
