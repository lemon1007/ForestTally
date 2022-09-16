import s from '../../../stylesheets/Welcome/WelcomeLayout.module.scss';
import {RouterLink} from 'vue-router';
import {WelcomeLayout} from '../WelcomeLayout';
import first from '../../../assets/icons/first.svg';
import {WelcomeFooterLayout} from '../WelcomeFooterLayout';

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
      }}
    </WelcomeLayout>
  );
};

First.displayName = 'First';