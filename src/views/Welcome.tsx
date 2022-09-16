import {defineComponent, Transition, VNode} from 'vue';
import {RouteLocationNormalizedLoaded, RouterView} from 'vue-router';
import s from '../stylesheets/Welcome/Welcome.module.scss';
import tree from '../assets/icons/tree.svg';

export const Welcome = defineComponent({
  setup: (props, context) => {
    type Y = { Component: VNode, route: RouteLocationNormalizedLoaded };
    return () => (
      <div class={s.wrapper}>
        <header>
          <div class={s.headerContent}>
            <img src={tree} class={s.iconStyle}></img>
            <span class={s.fontStyle}>森林记账</span>
          </div>
        </header>
        <main>
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