import {WelcomeFooterLayout} from '../WelcomeFooterLayout';
import {RouterLink} from 'vue-router';
import s from '../../../stylesheets/Welcome/WelcomeFooterLayout.module.scss';

export const ForthAction = () => {
  return (
    <WelcomeFooterLayout>
      {{
        buttons: () =>
          <>
            <RouterLink class={s.fake} to="/start">跳过</RouterLink>
            <RouterLink class={s.next} to="/start">开启记账</RouterLink>
            <RouterLink class={s.fake} to="/start">跳过</RouterLink>
          </>
      }}
    </WelcomeFooterLayout>
  );
};

ForthAction.displayName = 'ForthAction';