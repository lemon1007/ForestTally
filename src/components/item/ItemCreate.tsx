import {defineComponent, onMounted, PropType, ref} from 'vue';
import s from '../../stylesheets/item/ItemCreate.module.scss';
import {Icon} from '../../shared/Icon';
import {MainLayout} from '../../layouts/MainLayout';
import {Tabs, Tab} from '../../shared/Tabs';
import {InputPad} from './InputPad';
import {http} from '../../shared/Http';
import {Tag} from '../../env';


export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    // 支出tag列表
    const refKind = ref('支出');
    onMounted(async () => {
      const response = await http.get<{ resources: Tag[] }>('/tags', {
        kind: 'expenses',
        _mock: 'tagIndex'
      });
      refExpensesTags.value = response.data.resources;
    });
    const refExpensesTags = ref<Tag[]>([]);

    // 收入tag列表
    onMounted(async () => {
      const response = await http.get<{ resources: Tag[] }>('/tags', {
        kind: 'income',
        _mock: 'tagIndex'
      });
      refIncomeTags.value = response.data.resources;
    });
    const refIncomeTags = ref<Tag[]>([]);
    return () => (
      <MainLayout>{
        {
          title: () => '记一笔',
          icon: () => <Icon name="return" class={s.navIcon}></Icon>,
          default: () => <>
            <div class={s.wrapper}>
              <Tabs v-model:selected={refKind.value} class={s.tabs}>
                <Tab name="支出" class={s.tags_wrapper}>
                  <div class={s.tagList_wrapper}>
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag}/>
                      </div>
                      <div class={s.name}>
                        <span>新增</span>
                      </div>
                    </div>
                    {refExpensesTags.value.map(tag =>
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>
                          {tag.sign}
                        </div>
                        <div class={s.name}>
                          {tag.name}
                        </div>
                      </div>
                    )}
                  </div>
                </Tab>


                <Tab name="收入" class={s.tags_wrapper}>
                  <div class={s.tag}>
                    <div class={s.sign}>
                      <Icon name="add" class={s.createTag}/>
                    </div>
                    <div class={s.name}>
                      <span>新增</span>
                    </div>
                  </div>
                  {refIncomeTags.value.map(tag =>
                    <div class={[s.tag, s.selected]}>
                      <div class={s.sign}>
                        {tag.sign}
                      </div>
                      <div class={s.name}>
                        {tag.name}
                      </div>
                    </div>
                  )}
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
