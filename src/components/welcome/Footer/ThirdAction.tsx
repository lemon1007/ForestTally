import {RouterLink} from 'vue-router';
import s from '../../../stylesheets/Welcome/WelcomeFooterLayout.module.scss';
import {FunctionalComponent} from 'vue';

export const ThirdAction: FunctionalComponent = () => {
  return (
    <div class={s.action}>
      <RouterLink class={s.fake} to="/start">跳过</RouterLink>
      <RouterLink class={s.next} to="/welcome/4">下一页</RouterLink>
      <RouterLink to="/start">跳过</RouterLink>
    </div>
  );
};

ThirdAction.displayName = 'ThirdAction';