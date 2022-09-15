import {defineComponent} from 'vue';
import {RouterView} from 'vue-router';
import s from '../stylesheets/Welcome/Welcome.module.scss';

export const Welcome = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <header></header>
        <main><RouterView/></main>
        <footer></footer>
      </div>
    );
  }
});