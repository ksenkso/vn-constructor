import {AxiosInstance, AxiosRequestConfig} from "axios";

export class Endpoint {
    constructor(protected transport: AxiosInstance) {
    }

    protected get<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
        return this.transport.get(url, config)
            .then(({data}) => data as T)
    }

    protected head<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
        return this.transport.head(url, config)
            .then(({data}) => data as T)
    }

    protected options<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
        return this.transport.options(url, config)
            .then(({data}) => data as T)
    }

    protected post<T, D = any>(url: string, data: D, config?: AxiosRequestConfig<D>): Promise<T> {
        return this.transport.post(url, data, config)
            .then(({data}) => data as T)
    }

    protected delete<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
        return this.transport.delete(url, config)
            .then(({data}) => data as T)
    }

    protected patch<T, D = any>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> {
        return this.transport.patch(url, data, config)
            .then(({data}) => data as T)
    }

    protected put<T, D = any>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> {
        return this.transport.put(url, data, config)
            .then(({data}) => data as T)
    }
}
