import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  CancelToken,
  CancelTokenSource,
} from "axios";

interface RequestOptions {
  cancelToken?: CancelToken;
  params?: AxiosRequestConfig["params"];
  responseType?: string;
  timeout?: number;
}

export class Api {
  public optionalHeaders?: { [key: string]: any };

  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: "http://localhost:3000/",
      timeout: 30000,
      responseType: "json",
    });
  }

  public get<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.http.get<T>(url, options).then(this.getData);
  }

  public post<T>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    return this.http.post(url, data, options).then(this.getData);
  }

  public put<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.http.put(url, data, options).then(this.getData);
  }

  public upload<T>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    return this.http.put(url, data.file, options).then(this.getData);
  }

  public patch<T>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    return this.http.patch(url, data, options).then(this.getData);
  }

  public delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.http.delete(url, options).then(this.getData);
  }

  public cancelRequest(source: CancelTokenSource): boolean {
    try {
      source.cancel(`${source.token} canceled`);

      return true;
    } catch (e) {
      return false;
    }
  }

  private getData<T>(response: AxiosResponse<T>): T {
    return response.data;
  }
}

const apiSingleton = new Api();
export default apiSingleton;
