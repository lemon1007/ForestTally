import {defineComponent, PropType, ref} from 'vue';
import {MainLayout} from '../../layouts/MainLayout';
import s from '../../stylesheets/item/ItemList.module.scss';
import {Icon} from '../../shared/Icon';
import {Tab, Tabs} from '../../shared/Tabs';
import {ItemSummary} from '../../stylesheets/item/ItemSummary';

export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const refSelected = ref('本月');
    return () => (
      <MainLayout>{
        {
          title: () => '森林记账',
          icon: () => <Icon name="menu"></Icon>,
          default: () => <>
            <Tabs v-model:selected={refSelected.value} classPrefix={'itemList'}>
              <Tab name="本月">
                <ItemSummary/>
              </Tab>
              <Tab name="上个月">
                <ItemSummary/>
              </Tab>
              <Tab name="今年">
                <ItemSummary/>
              </Tab>
              <Tab name="自定义">
                <ItemSummary/>
              </Tab>
            </Tabs>
          </>
        }
      }</MainLayout>
    );
  }
});
