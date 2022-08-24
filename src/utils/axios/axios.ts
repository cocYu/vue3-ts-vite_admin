import { YkRequestInterceptors, YKRequstConfig } from "./types";
import axios, { AxiosInstance } from "axios";
import { getToken } from "~/utils/cookieUtil";
import { toast } from "~/utils/notifyUtil";

/**
 * 自定义请求客户端
 * 使用 axios 封装
 */
class YkRequestClient {
    /**
     * axios 实例
     */
    _instance: AxiosInstance;
    /**
     * axios 拦截器信息
     */
    interceprots?: YkRequestInterceptors;

    /**
     * 构造方法
     */
    constructor(config: YKRequstConfig) {
        // 创建 axios 实例
        this._instance = axios.create(config);
        // 设置 axios 拦截器
        this.interceprots = config.interceptors;
        this._instance.interceptors.request.use(
            this.interceprots?.requestInterceptor,
            this.interceprots?.requestInterceptorCatch,
        );
        this._instance.interceptors.response.use(
            this.interceprots?.responseInterceptor,
            this.interceprots?.responseInterceptorCatch,
        );
    }

    request<T = any>(config: YKRequstConfig<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            if (config.interceptors?.requestInterceptor) {
                config = config.interceptors.requestInterceptor(config);
            }
            this._instance
                .request<any, T, any>(config)
                .then((response) => {
                    if (config.interceptors?.responseInterceptor) {
                        response = config.interceptors.responseInterceptor(response);
                    }
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    get<T = any>(config: YKRequstConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: "GET" });
    }

    post<T = any>(config: YKRequstConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: "POST" });
    }

    delete<T = any>(config: YKRequstConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: "DELETE" });
    }

    put<T = any>(config: YKRequstConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: "PUT" });
    }

    patch<T = any>(config: YKRequstConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: "patch" });
    }
}

const baseURL = "/api";

const requestClient = new YkRequestClient({
    baseURL: baseURL,
    timeout: 30000,
    interceptors: {
        responseInterceptor: (res) => {
            return res.data;
        },
        responseInterceptorCatch: (err) => {
            toast(err.response.data.msg || "请求失败", "error");
            return Promise.reject(err);
        },
        requestInterceptor: (conf) => {
            let token = getToken();
            if (token) {
                const headers = conf?.headers || {};
                headers["token"] = token;
            }
            return conf;
        },
        requestInterceptorCatch: (err) => {
            return Promise.reject(err);
        },
    },
});

export default requestClient;
