import {defineComponent, ref, Transition, VNode, watchEffect} from 'vue';
import {RouteLocationNormalizedLoaded, RouterView} from 'vue-router';
import s from '../stylesheets/Welcome/Welcome.module.scss';
import {useSwipe} from '../hooks/useSwipe';

export const Welcome = defineComponent({
  setup: (props, context) => {
    type Y = { Component: VNode, route: RouteLocationNormalizedLoaded };
    const main = ref<HTMLElement | null>(null);
    const {direction, swiping} = useSwipe(main);
    watchEffect(() => {
      console.log( direction.value);
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
            {({Component: Content, route: R}: Y) =>
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