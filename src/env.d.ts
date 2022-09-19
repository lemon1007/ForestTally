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
type Tag = {
  id: number,
  user_id: number,
  name: string,
  sign: string,
  kind: 'expenses' | 'income'
}

type Resources<T = any> = {
  resources: [],
  pager: {
    page: number,
    per_page: number,
    count: number
  }
}
