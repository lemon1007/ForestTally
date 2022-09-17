import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {svgstore} from './src/vite_plugins/svgstore';

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/SimpleTally-vue3/dist/',
  plugins: [
    svgstore(),
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true
    }),
  ],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: 'import { h } from \'vue\';'
  }
});
