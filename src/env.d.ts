/// <reference types="vite/client" />

import {AxiosRequestConfig} from 'axios';

declare module '*.vue' {
  import type {DefineComponent} from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue };
type Mock = (config: AxiosRequestConfig) => [number, any]