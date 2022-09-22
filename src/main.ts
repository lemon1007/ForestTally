import {createApp} from 'vue';
import {App} from './App';
import {createRouter} from 'vue-router';
import {routes} from './routers/routes';
import {history} from './shared/history';
import '@svgstore';
import {createPinia, storeToRefs} from 'pinia';
import {useMeStore} from './stores/useMeStore';
import {Dialog} from 'vant';

const router = createRouter({history, routes});
const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');

// 先配置pinia再使用，代码要放在配置代码后面
const meStore = useMeStore();
const {mePromise} = storeToRefs(meStore);
meStore.fetchMe();

const whiteList: Record<string, 'exact' | 'startsWith'> = {
  '/': 'exact',
  '/items': 'exact',
  '/welcome': 'startsWith',
  '/sign_in': 'startsWith',
};

router.beforeEach((to, from) => {
  for (const key in whiteList) {
    const value = whiteList[key];
    if (value === 'exact' && to.path === key) {
      return true;
    }
    if (value === 'startsWith' && to.path.startsWith(key)) {
      return true;
    }
  }
  return mePromise!.value!.then(
    () => true,
    async () => {
      await Dialog.alert({
        title: '提示',
        message: '请先登录'
      });
      return '/sign_in?return_to=' + from.path;
    }
  );
});