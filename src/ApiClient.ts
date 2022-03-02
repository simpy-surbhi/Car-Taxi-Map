import axios, { AxiosInstance } from "axios";
import { Config } from "./config";
import { objectToUrlParams, pascalToUnderscoreCase } from "./lib";

class APIClient {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create();
  }

  public async get<T>(
    path: string,
    queryStringData?: { [key: string]: string | number }
  ) {
    await this.setHeaders("GET");

    const url = `${path}${objectToUrlParams(queryStringData)}`;
    const response = await this.api.get<T>(`${Config.API_BASE_URL}${url}`);
    return response.data;
  }

  private async setHeaders(method: "GET" | "POST" | "PUT" | "DELETE") {
    const headers: any = {};

    if (["GET", "POST", "PUT"].includes(method)) {
      headers.Accept = "application/json";
    }

    if (["PUT", "POST"].includes(method)) {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    this.api.defaults.headers = headers;
  }

  private prepareData(method: "POST" | "PUT", data: any) {
    const formData = method === "PUT" ? new URLSearchParams() : new FormData();

    if (!data) {
      return formData;
    }

    Object.keys(data).forEach((k) => {
      const key = pascalToUnderscoreCase(k);

      if (typeof data[k] === "undefined") {
        return;
      }

      if (Array.isArray(data[k])) {
        data[k].forEach((value: any, index: number) => {
          if (typeof value === "object") {
            Object.keys(value).forEach((objKey: any) => {
              formData.append(
                `${key}[${index}][${pascalToUnderscoreCase(objKey)}]`,
                value[objKey]
              );
            });
          } else {
            formData.append(`${key}[]`, value);
          }
        });
      } else {
        formData.set(key, data[k]);
      }
    });

    return formData;
  }
}

const singleton = new APIClient();

export { singleton as ApiClient };
