import { FunctionalComponent} from 'vue';
import s from '../../stylesheets/Welcome/WelcomeFooterLayout.module.scss'

export const WelcomeFooterLayout: FunctionalComponent = (props, context) => {
  const {slots: {buttons}} = context;
  return (
    <div class={s.action}>
      {buttons?.()}
    </div>
  );
};