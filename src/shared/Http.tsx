import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {
  mockItemCreate,
  mockItemIndex,
  mockItemIndexBalance, mockItemSummary,
  mockSession,
  mockTagEdit,
  mockTagIndex,
  mockTagShow
} from '../mock/mock';
import {JSONValue} from '../env';

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>

export class Http {
  instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    });
  }

  get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
    return this.instance.request<R>({...config, url: url, params: query, method: 'get'});
  }

  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
    return this.instance.request<R>({...config, url, data, method: 'post'});
  }

  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
    return this.instance.request<R>({...config, url, data, method: 'patch'});
  }

  delete<R = unknown>(url: string, query?: Record<string, string>, config?: DeleteConfig) {
    return this.instance.request<R>({...config, url: url, params: query, method: 'delete'});
  }
}

const mock = (response: AxiosResponse) => {
  if (location.hostname !== 'localhost'
    && location.hostname !== '127.0.0.1'
    && location.hostname !== '192.168.31.244') { return false; }
  switch (response.config?.params?._mock) {
    case 'tagIndex':
      [response.status, response.data] = mockTagIndex(response.config);
      return true;
    case 'session':
      [response.status, response.data] = mockSession(response.config);
      return true;
    case 'itemCreate':
      [response.status, response.data] = mockItemCreate(response.config);
      return true;
    case 'tagShow':
      [response.status, response.data] = mockTagShow(response.config);
      return true;
    case 'tagEdit':
      [response.status, response.data] = mockTagEdit(response.config);
      return true;
    case 'itemIndex':
      [response.status, response.data] = mockItemIndex(response.config);
      return true;
    case 'itemIndexBalance':
      [response.status, response.data] = mockItemIndexBalance(response.config);
      return true;
    case 'itemSummary':
      [response.status, response.data] = mockItemSummary(response.config);
      return true;
  }
  return false;
};

export const http = new Http('/api/v1');

http.instance.interceptors.request.use(config => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    config.headers!.Authorization = `Bearer ${jwt}`;
  }
  return config;
});

http.instance.interceptors.response.use((response) => {
  mock(response);
  if (response.status >= 400) {
    throw {response};
  } else {
    return response;
  }
}, (error) => {
  mock(error.response);
  if (error.response.status >= 400) {
    throw error;
  } else {
    return error.response;
  }
});

http.instance.interceptors.response.use(
  response => response,
  error => {
    // throw error 或者 return Promise.reject(error) 二选一
    // 比较宏观笼统的通用error写在(拦截)在这里
    if (error.response) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 429) {
        window.alert('请求发送过于频繁，请稍后再试');
      }
    }
    throw error;
  }
);
