import {defineComponent, ref, Transition, VNode, watchEffect} from 'vue';
import {RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter} from 'vue-router';
import s from '../stylesheets/Welcome/Welcome.module.scss';
import {useSwipe} from '../hooks/useSwipe';
import {throttle} from '../shared/throttle';

export const Welcome = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement>();
    const {direction, swiping} = useSwipe(main, {
      beforeStart: e => e.preventDefault()
    });
    const route = useRoute();
    const router = useRouter();
    const push = throttle(
      () => {
        if (route.name === 'welcome1') {
          router.push('/welcome/2');
        } else if (route.name === 'welcome2') {
          router.push('/welcome/3');
        } else if (route.name === 'welcome3') {
          router.push('/welcome/4');
        } else if (route.name === 'welcome4') {
          router.push('/start');
        }
      }, 500);
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