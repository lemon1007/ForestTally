import {RouterLink} from 'vue-router';
import s from '../../../stylesheets/Welcome/WelcomeFooterLayout.module.scss';
import {FunctionalComponent} from 'vue';

export const ForthAction: FunctionalComponent = () => {
  return (
    <div class={s.action}>
      <RouterLink class={s.fake} to="/start">跳过</RouterLink>
      <RouterLink class={s.next} to="/start">开启记账</RouterLink>
      <RouterLink class={s.fake} to="/start">跳过</RouterLink>
    </div>
  );
};

ForthAction.displayName = 'ForthAction';