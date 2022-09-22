import {defineComponent, PropType, ref} from 'vue';
import s from '../../stylesheets/item/Tags.module.scss';
import {Icon} from '../../shared/Icon';
import {Button} from '../../shared/Button';
import {useTags} from '../../shared/useTags';
import {http} from '../../shared/Http';
import {Resources, Tag} from '../../env';
import {RouterLink, useRouter} from 'vue-router';

export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<string>,
      required: true
    },
    selected: Number
  },
  emits: ['update:selected'],
  setup: (props, context) => {
    const onSelect = (tag: Tag) => {
      context.emit('update:selected', tag.id);
    };
    const {tags: expensesTags, hasMore, fetchTags} = useTags((page) => {
      return http.get<Resources<Tag>>('/tags', {
        kind: props.kind,
        page: page + 1,
        _mock: 'tagIndex',
      }, {_autoLoading: true});
    });

    const timer = ref<number>();
    const currentTag = ref<HTMLDivElement>();
    const router = useRouter();
    const onLongPress = (tagId: Tag['id']) => {
      router.push(`/tags/${tagId}/edit?kind=${props.kind}`);
    };
    const onTouchStart = (e: TouchEvent, tag: Tag) => {
      currentTag.value = e.currentTarget as HTMLDivElement;
      // @ts-ignore
      timer.value = setTimeout(() => {
        onLongPress(tag.id);
      }, 500);
    };
    const onTouchEnd = (e: TouchEvent) => {
      clearTimeout(timer.value);
    };
    const onTouchMove = (e: TouchEvent) => {
      const pointedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
      if (currentTag.value?.contains(pointedElement) === false && currentTag.value !== pointedElement) {
        clearTimeout(timer.value);
      }
    };
    return () => <>
      <div class={s.tags_wrapper} onTouchmove={onTouchMove}>
        <div class={s.tagList_wrapper}>
          <RouterLink to={`/tags/create?kind=${props.kind}`} class={s.tag}>
            <div class={s.sign}>
              <Icon name="add" class={s.createTag}/>
            </div>
            <div class={s.name}>
              <span>新增</span>
            </div>
          </RouterLink>
          {expensesTags.value.map(tag =>
            <div class={[s.tag, props.selected === tag.id ? s.selected : '']}
                 onClick={() => onSelect(tag)}
                 onTouchstart={(e) => onTouchStart(e, tag)}
                 onTouchend={onTouchEnd}>
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
    </>;
  }
});
