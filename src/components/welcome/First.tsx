import {defineComponent} from 'vue';
import s from '../../stylesheets/Welcome/WelcomeLayout.module.scss';
import {RouterLink} from 'vue-router';
import {WelcomeLayout} from './WelcomeLayout';

export const First = defineComponent({
  setup: (props, context) => {
    return () => (
      <WelcomeLayout>
        {{
          pic: () => <div class={s.picStyle}></div>,
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
  }
});