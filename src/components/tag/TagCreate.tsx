import {defineComponent} from 'vue';
import {MainLayout} from '../../layouts/MainLayout';
import {TagForm} from './TagForm';
import {BackIcon} from '../../shared/BackIcon';
import s from '../../stylesheets/tag/TagCreate.module.scss';

export const TagCreate = defineComponent({
  setup: (props, context) => {
    return () =>
      <div class={s.wrapper}>
        <MainLayout>{{
          title: () => '新建标签',
          icon: () => <BackIcon/>,
          default: () => (
            <TagForm></TagForm>
          )
        }}</MainLayout>
      </div>;
  }
});

export default TagCreate;