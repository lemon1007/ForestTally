import {defineComponent, reactive} from 'vue';
import {MainLayout} from '../../layouts/MainLayout';
import {Icon} from '../../shared/Icon';
import {TagForm} from './TagForm';
import {BackIcon} from '../../shared/BackIcon';

export const TagCreate = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout>{{
        title: () => '新建标签',
        icon: () => <BackIcon/>,
        default: () => (
          <TagForm></TagForm>
        )
      }}</MainLayout>
    );
  }
});