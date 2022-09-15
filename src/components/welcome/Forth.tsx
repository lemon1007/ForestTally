import s from '../../stylesheets/Welcome/WelcomeLayout.module.scss';
import {RouterLink} from 'vue-router';
import {WelcomeLayout} from './WelcomeLayout';

export const Forth = () => {
  return (
    <WelcomeLayout>
      {{
        icon: () => <div class={s.iconStyle}></div>,
        title: () => <>
          <div>这是四段话</div>
          <div>后面没有话了哦</div>
        </>,
        buttons: () => <>
          <RouterLink class={s.fake} to="/start">跳过</RouterLink>
          <RouterLink class={s.next} to="/start">下一页</RouterLink>
          <RouterLink class={s.fake} to="/start">跳过</RouterLink>
        </>
      }}
    </WelcomeLayout>
  );
};
Forth.displayName = 'Forth';