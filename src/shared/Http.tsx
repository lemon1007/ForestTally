import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import {Dialog} from 'vant';

type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue };

export class Http {
  instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    });
  }

  // read
  get<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>) {
    return this.instance.request<R>({
      ...config,
      url: url,
      params: query,
      method: 'get'
    });
  }

  // create
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>) {
    return this.instance.request<R>({
      ...config,
      url,
      data,
      method: 'post'
    });
  }

  // update
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data'>) {
    return this.instance.request<R>({
      ...config,
      url,
      data,
      method: 'patch'
    });
  }

  // destroy
  delete<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'params'>) {
    return this.instance.request<R>({
      ...config,
      url: url,
      params: query,
      method: 'delete'
    });
  }
}

export const http = new Http('/api/v1');

http.instance.interceptors.request.use(config => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    config.headers!.Authorization = `Bearer ${jwt}`;
  }
  return config;
});


http.instance.interceptors.response.use(response => {
  return response;
}, (error) => {
  // throw error 或者 return Promise.reject(error) 二选一
  // 比较宏观笼统的通用error写在(拦截)在这里
  if (error.response) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 429) {
      window.alert('请求发送过于频繁，请稍后再试');
    }
  }
  throw error;
});
