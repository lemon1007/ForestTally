import s from '../../../stylesheets/Welcome/WelcomeLayout.module.scss';
import {WelcomeLayout} from '../WelcomeLayout';
import third from '../../../assets/icons/third.svg';

export const Third = () => {
  return (
    <WelcomeLayout>
      {{
        icon: () =>
          <svg class={s.iconStyle}>
            <use xlinkHref="#third"></use>
          </svg>,
        title: () => <>
          <div>这是三段话</div>
          <div>还会有第四段哦</div>
        </>,
      }}
    </WelcomeLayout>
  );
};
Third.displayName = 'Third';