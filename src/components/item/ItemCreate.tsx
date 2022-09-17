import {defineComponent, onUpdated, PropType, ref} from 'vue';
import s from '../../stylesheets/item/ItemCreate.module.scss';
import {Icon} from '../../shared/Icon';
import {MainLayout} from '../../layouts/MainLayout';
import {Tabs, Tab} from '../../shared/Tabs';


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
            <Tabs v-model:selected={refKind.value}>
              <Tab name="支出">
                支出列表
              </Tab>
              <Tab name="收入">
                收入列表
              </Tab>
            </Tabs>
          </>
        }
      }</MainLayout>
    );
  }
});
