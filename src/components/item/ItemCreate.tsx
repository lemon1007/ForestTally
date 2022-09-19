import {defineComponent, onMounted, PropType, ref} from 'vue';
import s from '../../stylesheets/item/ItemCreate.module.scss';
import {Icon} from '../../shared/Icon';
import {MainLayout} from '../../layouts/MainLayout';
import {Tabs, Tab} from '../../shared/Tabs';
import {InputPad} from './InputPad';
import {Tags} from './Tags';


export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const refKind = ref('支出');
    const refTagId = ref<number>();
    const refHappenAt = ref<string>(new Date().toISOString());
    const refAmount = ref<number>(0);
    return () => (
      <MainLayout>{
        {
          title: () => '记一笔',
          icon: () => <Icon name="return" class={s.navIcon}></Icon>,
          default: () => <>
            <div class={s.wrapper}>
              <Tabs v-model:selected={refKind.value} class={s.tabs}>
                <Tab name="支出">
                  <div>{refAmount.value}</div>
                  <Tags kind="expenses" v-model:selected={refTagId.value}></Tags>
                </Tab>
                <Tab name="收入">
                  <Tags kind="income" v-model:selected={refTagId.value}></Tags>
                </Tab>
              </Tabs>
            </div>
            <div class={s.inputPad_wrapper}>
              <InputPad
                v-model:happenAt={refHappenAt.value}
                v-model:amount={refAmount.value}/>
            </div>
          </>
        }
      }</MainLayout>
    );
  }
});
