import {defineComponent, onMounted, PropType, ref} from 'vue';
import s from '../../stylesheets/item/ItemCreate.module.scss';
import {Icon} from '../../shared/Icon';
import {MainLayout} from '../../layouts/MainLayout';
import {Tabs, Tab} from '../../shared/Tabs';
import {InputPad} from './InputPad';
import {http} from '../../shared/Http';
import {Resources, Tag} from '../../env';
import {Button} from '../../shared/Button';
import {useTags} from '../../shared/useTags';


export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    // 支出tag列表
    const refKind = ref('支出');
    const {tags: expensesTags, hasMore, fetchTags} = useTags((page) => {
      return http.get<Resources<Tag>>('/tags', {
        kind: 'expenses',
        page: page + 1,
        _mock: 'tagIndex',
      });
    });

    // 收入tag列表
    const {tags: incomeTags, hasMore: hasMore2, fetchTags: fetchTags2} = useTags((page) => {
      return http.get<Resources<Tag>>('/tags', {
        kind: 'income',
        page: page + 1,
        _mock: 'tagIndex',
      });
    });
    return () => (
      <MainLayout>{
        {
          title: () => '记一笔',
          icon: () => <Icon name="return" class={s.navIcon}></Icon>,
          default: () => <>
            <div class={s.wrapper}>
              <Tabs v-model:selected={refKind.value} class={s.tabs}>
                <Tab name="支出">
                  <div class={s.tags_wrapper}>
                    <div class={s.tagList_wrapper}>
                      <div class={s.tag}>
                        <div class={s.sign}>
                          <Icon name="add" class={s.createTag}/>
                        </div>
                        <div class={s.name}>
                          <span>新增</span>
                        </div>
                      </div>
                      {expensesTags.value.map(tag =>
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
                    <div class={s.loadMore_wrapper}>
                      {hasMore.value ?
                        <Button class={s.loadMore} onClick={fetchTags}>加载更多</Button> :
                        <span class={s.noMore}>加载到头了</span>}
                    </div>
                  </div>
                </Tab>

                <Tab name="收入">
                  <div class={s.tags_wrapper}>
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag}/>
                      </div>
                      <div class={s.name}>
                        <span>新增</span>
                      </div>
                    </div>
                    {incomeTags.value.map(tag =>
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
                  <div class={s.loadMore_wrapper}>
                    {hasMore2.value ?
                      <Button class={s.loadMore} onClick={fetchTags2}>加载更多</Button> :
                      <span class={s.noMore}>加载到头了</span>}
                  </div>
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
