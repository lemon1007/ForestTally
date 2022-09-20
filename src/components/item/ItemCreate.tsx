import {defineComponent, PropType, reactive} from 'vue';
import s from '../../stylesheets/item/ItemCreate.module.scss';
import {MainLayout} from '../../layouts/MainLayout';
import {Tabs, Tab} from '../../shared/Tabs';
import {InputPad} from './InputPad';
import {Tags} from './Tags';
import {http} from '../../shared/Http';
import {Item, Resource, ResourceError} from '../../env';
import {useRouter} from 'vue-router';
import {Dialog} from 'vant';
import {AxiosError} from 'axios';
import {BackIcon} from '../../shared/BackIcon';


export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const formData = reactive({
      kind: '支出',
      tags_id: [],
      amount: 0,
      happen_at: new Date().toISOString(),
    });
    const router = useRouter();
    const onError = (error: AxiosError<ResourceError>) => {
      if (error.response?.status === 422) {
        Dialog.alert({
          title: '出错啦',
          message: Object.values(error.response.data.errors).join('\n'),
        });
      }
      throw error;
    };
    const onSubmit = async () => {
      await http
        .post<Resource<Item>>('/items', formData, {
          params: {_mock: 'itemCreate'},
        })
        .catch(onError);
      router.push('/items');
    };
    return () => (
      <MainLayout>{{
        title: () => '记一笔',
        icon: () => <BackIcon/>,
        default: () => <>
          <div class={s.wrapper}>
            <Tabs v-model:selected={formData.kind} class={s.tabs}>
              <Tab name="支出">
                <div>{JSON.stringify(formData)}</div>
                <Tags kind="expenses" v-model:selected={formData.tags_id[0]}></Tags>
              </Tab>
              <Tab name="收入">
                <Tags kind="income" v-model:selected={formData.tags_id[0]}></Tags>
              </Tab>
            </Tabs>
          </div>
          <div class={s.inputPad_wrapper}>
            <InputPad
              v-model:happenAt={formData.happen_at}
              v-model:amount={formData.amount}
              onSubmit={onSubmit}/>
          </div>
        </>
      }}</MainLayout>
    );
  }
});
