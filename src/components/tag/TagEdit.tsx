import {defineComponent} from 'vue';
import {MainLayout} from '../../layouts/MainLayout';
import {Icon} from '../../shared/Icon';
import {TagForm} from './TagForm';
import {Button} from '../../shared/Button';
import s from '../../stylesheets/tag/Tag.module.scss';
import {BackIcon} from '../../shared/BackIcon';
import {useRoute} from 'vue-router';

export const TagEdit = defineComponent({
  setup: (props, context) => {
    const route = useRoute();
    const numberId = parseInt(route.params.id!.toString());
    if (Number.isNaN(route.params.id)) {
      return () => {<div>加载失败，id不存在</div>;};
    }
    return () => (
      <MainLayout>{{
        title: () => '编辑标签',
        icon: () => <BackIcon/>,
        default: () => <>
          <TagForm id={numberId}/>
          <div class={s.actions}>
            <Button level="danger" class={s.removeTags} onClick={() => {}}>删除标签</Button>
            <Button level="danger" class={s.removeTagsAndItems} onClick={() => {}}>删除标签和记账</Button>
          </div>
        </>
      }}</MainLayout>
    );
  }
});
