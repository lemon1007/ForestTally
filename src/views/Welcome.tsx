import {defineComponent, ref, Transition, VNode, watchEffect} from 'vue';
import {RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter} from 'vue-router';
import s from '../stylesheets/Welcome/Welcome.module.scss';
import {useSwipe} from '../hooks/useSwipe';
import {throttle} from '../shared/throttle';

const pushMap: Record<string, string> = {
  'welcome1': '/welcome/2',
  'welcome2': '/welcome/3',
  'welcome3': '/welcome/4',
  'welcome4': '/start',
};
export const Welcome = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement>();
    // 阻止默认动作
    const {direction, swiping} = useSwipe(main, {
      beforeStart: e => e.preventDefault()
    });
    const route = useRoute();
    const router = useRouter();
    // 设置throttle节流，在一次transition过渡时间内，只获取第一次滑动动作
    const push = throttle(
      () => {
        const name = (route.name || 'welcome1').toString();
        router.push(pushMap[name]);
      }, 500);
    // 监听swiping和direction，获取滑动状态，切换对应页面
    watchEffect(() => {
      if (swiping.value && direction.value === 'left') {
        push();
      }
    });
    return () => (
      <div class={s.wrapper}>
        <header>
          <div class={s.headerContent}>
            <svg>
              <use xlinkHref="#tree"></use>
            </svg>
            <span class={s.fontStyle}>森林记账</span>
          </div>
        </header>
        <main ref={main}>
          <RouterView name="main">
            {({Component: Content, route: R}: { Component: VNode, route: RouteLocationNormalizedLoaded }) =>
              <Transition
                enterFromClass={s.slideFadeEnterFrom}
                enterActiveClass={s.slideFadeEnterActive}
                leaveToClass={s.slideFadeLeaveTo}
                leaveActiveClass={s.slideFadeLeaveActive}>
                {Content}
              </Transition>
            }
          </RouterView>
        </main>
        <footer>
          <RouterView name="footer"/>
        </footer>
      </div>
    );
  }
});