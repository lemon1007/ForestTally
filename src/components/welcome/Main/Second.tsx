import s from '../../../stylesheets/Welcome/WelcomeLayout.module.scss';
import {WelcomeLayout} from '../WelcomeLayout';
import second from '../../../assets/icons/second.svg';

export const Second = () => {
  return (
    <WelcomeLayout>
      {{
        icon: () =>
          <svg class={s.iconStyle}>
            <use xlinkHref="#second"></use>
          </svg>,
        title: () => <>
          <div>这是二段话</div>
          <div>还会有第三段哦</div>
        </>,
      }}
    </WelcomeLayout>
  );
};

Second.displayName = 'Second';