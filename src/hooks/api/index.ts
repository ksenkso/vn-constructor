import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {StoriesEndpoint} from "./StoriesEndpoint";
import {SequencesEndpoint} from "./SequencesEndpoint";
import {action, makeObservable, observable} from "mobx";
import {createContext, useContext} from "react";

const BASE_URL = process.env.REACT_APP_API_URL

export interface ApiOptions {
  client?: AxiosInstance;
  accessToken?: string;
  refreshToken?: string;
}

export class Api {
  public isLoggedIn = false;
  private readonly _transport: AxiosInstance;
  private accessToken?: string;
  private refreshRequest?: Promise<AxiosResponse>;

  public readonly stories: StoriesEndpoint;
  public readonly sequences: SequencesEndpoint;

  constructor(options: ApiOptions = {}) {
    this._transport = options.client || axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
    })
    this.setAccessToken(options.accessToken)

    this.isLoggedIn = Boolean(Number(localStorage.getItem('auth/isLoggedIn')))

    makeObservable<Api, 'setAccessToken'>(this, {
      isLoggedIn: observable,
      setAccessToken: action,
    })

    this._transport.interceptors.request.use(config => {
      if (this.accessToken) {
        const newConfig = {
          headers: {},
          ...config
        }
        newConfig.headers.Authorization = `Bearer ${this.accessToken}`;

        return newConfig
      }

      return config
    })

    this._transport.interceptors.response.use(r => r, async (error: AxiosError) => {
      if (error.response?.status === 401 && !(error.config as any).retry && error.config.url !== '/auth/refresh') {
        await this.refresh()

        const newConfig = {
          ...error.config,
          retry: true
        }

        return this._transport.request(newConfig)
      }

      throw error
    })
    this.stories = new StoriesEndpoint(this._transport);
    this.sequences = new SequencesEndpoint(this._transport)
  }

  private setAccessToken(token?: string) {
    this.accessToken = token
    this.isLoggedIn = !!token
    localStorage.setItem('auth/isLoggedIn', String(Number(this.isLoggedIn)))
  }

  login(username: string, password: string) {
    return this._transport.post('/auth/login', {
      username,
      password
    })
      .then(({data}) => {
        this.setAccessToken(data.accessToken)
      })
  }

  logout(): Promise<void> {
    return this._transport.post('/auth/logout')
      .then(() => {
        this.setAccessToken(undefined)
      })
  }

  async refresh() {
    if (!this.refreshRequest) {
      this.refreshRequest = this._transport.post('/auth/refresh')
    }

    const {data} = await this.refreshRequest
    this.refreshRequest = undefined
    this.setAccessToken(data.accessToken)
  }
}

export const api = new Api()
export const ApiContext = createContext<Api>(api)
export const useApi = () => {
  return useContext(ApiContext)
}
