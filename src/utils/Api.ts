import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import localStore from './localStore'

 class Api {
    axiosInstance: AxiosInstance

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_BASE_URL + '/api/v1',
        })
    }

    getInstance = () => {
        this.initialize()
        return this.axiosInstance
    }

    get = (url: string, config: AxiosRequestConfig) => {
        return this.getInstance().get(url, config)
    }

    put = (url: string ,config: AxiosRequestConfig) => {
        return this.getInstance().put(url, config)
    }

    post = (url: string, config: AxiosRequestConfig) => {
        return this.getInstance().post(url, config)
    }

    patch = (url: string, config: AxiosRequestConfig) => {
        return this.getInstance().patch(url, config)
    }

    delete = (url: string, config: AxiosRequestConfig) => {
        return this.getInstance().delete(url, config)
    }

    initialize = () => {
        this.axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + localStore.getItem('auth_token')

        this.axiosInstance.defaults.timeout = 30000

        this.axiosInstance.interceptors.response.use(function (response: any) {
            return response
        })
    }
}

const api = new Api()

export default api