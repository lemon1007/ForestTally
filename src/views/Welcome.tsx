import {defineComponent} from 'vue';
import {RouterView} from 'vue-router';
import s from '../stylesheets/Welcome/Welcome.module.scss';
import tree from '../assets/icons/tree.svg';

export const Welcome = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <header>
          <div class={s.headerContent}>
            <img src={tree} class={s.iconStyle}></img>
            <span class={s.fontStyle}>森林记账</span>
          </div>
        </header>
        <main>
          <RouterView name="main"/>
        </main>
        <footer>
          <RouterView name="footer"/>
        </footer>
      </div>
    );
  }
});