import { Axios, AxiosResponse, AxiosRequestConfig } from "axios";

const axiosInstance = new Axios({
  baseURL: import.meta.env.VITE_BASE_URL + "api/",
  timeout: 2000,
  headers: { "Content-Type": "application/json" },
  transformResponse: [
    function (data) {
      return JSON.parse(data);
    },
  ],
});

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = "getToken()";
    if (token) {
      // config.headers.Authorization = `${TokenPrefix}${token}`
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response;
    } else {
      console.log("请求已发出，但是不在2xx的范围");
      console.log(response.data);
      return Promise.reject(response);
    }
  },
  // 请求失败
  (error: any) => {
    const { response } = error;
    if (response) {
      console.log("请求已发出，但是不在2xx的范围");
      return Promise.reject(response.data);
    }
    console.log("网络连接异常,请稍后再试!");
  }
);

interface IResponse<T = any> {
  code: number;
  data: T;
  msg: string;
}
const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve) => {
    axiosInstance
      .request<any, AxiosResponse<IResponse>>(config)
      .then((res: AxiosResponse<IResponse>) => {
        const {
          data: { data },
        } = res;
        resolve(data as T);
      });
  });
};
export default request;
