import {defineComponent} from 'vue';
import {MainLayout} from '../../layouts/MainLayout';
import {Icon} from '../../shared/Icon';
import {TagForm} from './TagForm';
import {Button} from '../../shared/Button';
import s from '../../stylesheets/tag/Tag.module.scss';

export const TagEdit = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout>{{
        title: () => '新建标签',
        icon: () => <Icon name="return" onClick={() => { }}/>,
        default: () => <>
          <TagForm/>
          <div class={s.actions}>
            <Button level="danger" class={s.removeTags} onClick={() => {}}>删除标签</Button>
            <Button level="danger" class={s.removeTagsAndItems} onClick={() => {}}>删除标签和记账</Button>
          </div>
        </>
      }}</MainLayout>
    );
  }
});
