import {defineComponent, onMounted, PropType, reactive, ref, watch} from 'vue';
import {FloatButton} from '../../shared/FloatButton';
import s from '../../stylesheets/item/ItemSummary.module.scss';
import {http} from '../../shared/Http';
import {Money} from '../../shared/Money';
import {Datetime} from '../../shared/Datetime';
import {Button} from '../../shared/Button';
import {Center} from '../../shared/Center';
import {Icon} from '../../shared/Icon';
import {RouterLink} from 'vue-router';
import {useAfterMe} from '../../hooks/useAfterMe';
import {useItemStore} from '../../stores/userItemStore';

export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false
    },
    endDate: {
      type: String as PropType<string>,
      required: false
    }
  },
  setup: (props, context) => {
    const itemStore = useItemStore(['items', props.startDate, props.endDate]);
    useAfterMe(() => itemStore.fetchItems(props.startDate, props.endDate));

    watch(
      () => [props.startDate, props.endDate],
      () => {
        itemStore.$reset();
        itemStore.fetchItems(props.startDate, props.endDate);
      }
    );

    const itemsBalance = reactive({
      expenses: 0,
      income: 0,
      balance: 0
    });
    const fetchItemsBalance = async () => {
      if (!props.startDate || !props.endDate) {
        return;
      }
      const response = await http.get(
        '/items/balance',
        {
          happen_after: props.startDate,
          happen_before: props.endDate,
          _mock: 'itemIndexBalance'
        }
      );
      Object.assign(itemsBalance, response.data);
    };
    useAfterMe(fetchItemsBalance);
    watch(
      () => [props.startDate, props.endDate],
      () => {
        Object.assign(itemsBalance, {
          expenses: 0,
          income: 0,
          balance: 0
        });
        fetchItemsBalance();
      }
    );
    return () => (
      (!props.startDate || !props.endDate) ?
        (<div class={s.noShowTip_wrapper}>请先选择时间范围</div>) :
        (<div class={s.wrapper}>
          {(itemStore.items && itemStore.items.length > 0) ? (
            <div class={s.total_wrapper}>
              <ul class={s.total}>
                <li>
                  <span>收入</span>
                  <Money value={itemsBalance.income}/>
                </li>
                <li>
                  <span>支出</span>
                  <Money value={itemsBalance.expenses}/>
                </li>
                <li>
                  <span>结余</span>
                  <Money value={itemsBalance.balance}/>
                </li>
              </ul>
              <ol class={s.list}>
                {itemStore.items.map((item) => (
                  <li>
                    <div class={s.sign}>
                      <span>{item.tags && item.tags.length > 0 ? item.tags[0].sign : '💰'}</span>
                    </div>
                    <div class={s.text}>
                      <div class={s.tagAndAmount}>
                        <span
                          class={s.tag}>{item.tags && item.tags.length > 0 ? item.tags[0].name : '未分类'}</span>
                        <span class={s.amount}>
                          <span>{item.kind === 'expenses' ? '-' : '+'}</span>
                          <Money value={item.amount}/>
                        </span>
                      </div>
                      <div class={s.time}>
                        <Datetime value={item.happen_at}/>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <div class={s.more}>
                {itemStore.hasMore ? (
                  <Button onClick={() => itemStore.fetchNextPage(props.startDate, props.endDate)}>加载更多</Button>
                ) : (
                  <span>没有更多啦</span>
                )}
              </div>
            </div>
          ) : (
            <div class={s.noShow_wrapper}>
              <Center direction="y" class={s.tree_wrapper}>
                <Icon name="tree" class={s.tree}/>
                <p>目前没有相关数据</p>
              </Center>
              <div class={s.button_wrapper}>
                <RouterLink to="/items/create">
                  <Button class={s.button}>开始记账</Button>
                </RouterLink>
              </div>
            </div>
          )}
          <RouterLink to="/items/create">
            <FloatButton IconName="add"/>
          </RouterLink>
        </div>)
    );
  },
});