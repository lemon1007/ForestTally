import {defineComponent, PropType} from 'vue';
import s from '../stylesheets/sharedStyle/Overlay.module.scss';
import {Icon} from './Icon';

export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>
    }
  },
  setup: (props, context) => {
    const close = () => {
      props.onClose?.();
    };
    return () => <>
      <div class={s.mask} onClick={close}></div>
      <div class={s.overlay}>
        <section class={s.overlay_header}>
          <h2>未登录用户</h2>
          <p>点击登录</p>
        </section>
        <nav class={s.overlay_main}>
          <ul>
            <li>
              <Icon name="test"></Icon>
              <span>统计图表</span>
            </li>
            <li>
              <Icon name="test"></Icon>
              <span>导出数据</span>
            </li>
            <li>
              <Icon name="test"></Icon>
              <span>自定义分类</span>
            </li>
            <li>
              <Icon name="test"></Icon>
              <span>记账提醒</span>
            </li>
          </ul>
        </nav>
      </div>
    </>;
  }
});
