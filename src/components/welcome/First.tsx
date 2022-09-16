import s from '../../stylesheets/Welcome/WelcomeLayout.module.scss';
import {RouterLink} from 'vue-router';
import {WelcomeLayout} from './WelcomeLayout';
import first from '../../assets/icons/first.svg';

export const First = () => {
  return (
    <WelcomeLayout>
      {{
        icon: () => <img src={first} class={s.iconStyle}/>,
        title: () =>
          <>
            <div>这是一段话</div>
            <div>还会有第二段哦</div>
          </>,
        buttons: () =>
          <>
            <RouterLink class={s.fake} to="/start">跳过</RouterLink>
            <RouterLink class={s.next} to="/welcome/2">下一页</RouterLink>
            <RouterLink to="/start">跳过</RouterLink>
          </>
      }}
    </WelcomeLayout>
  );
};

First.displayName = 'First';