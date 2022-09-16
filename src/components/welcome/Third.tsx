import s from '../../stylesheets/Welcome/WelcomeLayout.module.scss';
import {RouterLink} from 'vue-router';
import {WelcomeLayout} from './WelcomeLayout';
import third from '../../assets/icons/third.svg';

export const Third = () => {
  return (
    <WelcomeLayout>
      {{
        icon: () => <img src={third} class={s.iconStyle}/>,
        title: () => <>
          <div>这是三段话</div>
          <div>还会有第四段哦</div>
        </>,
        buttons: () => <>
          <RouterLink class={s.fake} to="/start">跳过</RouterLink>
          <RouterLink class={s.next} to="/welcome/4">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </>
      }}
    </WelcomeLayout>
  );
};
Third.displayName = 'Third';