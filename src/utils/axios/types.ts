import { AxiosRequestConfig } from "./../../../node_modules/axios/index.d";
import { AxiosResponse } from "axios";

/**
 * 定义 axios 配置信息
 */
export interface YKRequstConfig<T = AxiosResponse> extends AxiosRequestConfig {
  /**
   * 拦截器配置信息
   */
  interceptors?: YkRequestInterceptors<T>;
}

/**
 * axios 请求拦截器
 */
export interface YkRequestInterceptors<T = AxiosResponse> {
  /**
   * 请求拦截
   */
  requestInterceptor?: (conf: AxiosRequestConfig) => AxiosRequestConfig;
  /**
   * 请求异常拦截
   */
  requestInterceptorCatch?: (err: any) => any;
  /**
   * 响应拦截
   */
  responseInterceptor?: (res: T) => T;
  /**
   * 响应异常拦截
   */
  responseInterceptorCatch?: (err: any) => any;
}
