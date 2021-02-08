import axios, { AxiosInstance, AxiosResponse } from "axios";

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

  public get<T>(url: string): Promise<T> {
    return this.http.get<T>(url).then(this.getData);
  }

  public post<T>(url: string, data?: any): Promise<T> {
    return this.http.post(url, data).then(this.getData);
  }

  public put<T>(url: string, data?: any): Promise<T> {
    return this.http.put(url, data).then(this.getData);
  }

  public delete<T>(url: string): Promise<T> {
    return this.http.delete(url).then(this.getData);
  }

  private getData<T>(response: AxiosResponse<T>): T {
    return response.data;
  }
}

const apiSingleton = new Api();
export default apiSingleton;
