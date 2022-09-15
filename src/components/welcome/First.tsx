import {defineComponent} from 'vue';
import s from '../../stylesheets/Welcome/First.module.scss';
import {RouterLink} from 'vue-router';

export const First = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <div class={s.pic}></div>
          <div class={s.fontStyle}>
            <div>这是一段话</div>
            <div>还会有第二段哦</div>
          </div>
        </div>
        <div class={s.action}>
          <RouterLink class={s.fake} to="/star">跳过</RouterLink>
          <RouterLink class={s.next} to="/welcome/2">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </div>
      </div>
    );
  }
});