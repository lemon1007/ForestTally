import s from '../../../stylesheets/Welcome/WelcomeLayout.module.scss';
import {WelcomeLayout} from '../WelcomeLayout';
import forth from '../../../assets/icons/forth.svg';

export const Forth = () => {
  return (
    <WelcomeLayout>
      {{
        icon: () =>
          <svg class={s.iconStyle}>
            <use xlinkHref="#forth"></use>
          </svg>,
        title: () => <>
          <div>这是四段话</div>
          <div>后面没有话了哦</div>
        </>,
      }}
    </WelcomeLayout>
  );
};
Forth.displayName = 'Forth';