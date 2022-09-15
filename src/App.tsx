import {defineComponent} from 'vue';
import {RouterView} from 'vue-router';

export const App = defineComponent({
  setup() {
    return () =>
      <>
        <header>
          <span>导航</span>
          <ul>
            <li>
              <router-link to="/">Foo</router-link>
            </li>
            <li>
              <router-link to="/bar">Bar</router-link>
            </li>
          </ul>
          <hr/>
        </header>
        <div>
          <RouterView/>
          <hr/>
        </div>
        <footer>页脚</footer>
      </>;
  }
});