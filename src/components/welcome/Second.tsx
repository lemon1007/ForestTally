import {defineComponent} from 'vue';
import {RouterLink} from 'vue-router';
import s from '../../stylesheets/Welcome/WelcomeLayout.module.scss';
import {WelcomeLayout} from './WelcomeLayout';

export const Second = defineComponent({
  setup: (props, context) => {
    return () => (
      <WelcomeLayout>
        {{
          pic: () => <div class={s.picStyle}></div>,
          title: () => <>
            <div>这是二段话</div>
            <div>还会有第三段哦</div>
          </>,
          buttons: () => <>
            <RouterLink class={s.fake} to="/start">跳过</RouterLink>
            <RouterLink class={s.next} to="/welcome/3">下一页</RouterLink>
            <RouterLink to="/start">跳过</RouterLink>
          </>
        }}
      </WelcomeLayout>
    );
  }
});