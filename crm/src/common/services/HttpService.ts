import axios from "axios";
import { API_PATH } from '../constants';
import TokenService from "./TokenService";
import PubSub from './PubSub';

const httpClient = axios.create({
    baseURL: API_PATH,
    withCredentials: true
});

httpClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        const hasAccessToken = TokenService.getToken();

        if (error.response.status === 401 && error.config && !error.config._isRetry && Boolean(hasAccessToken)) {
            originalRequest._isRetry = true;

            try {
                await axios.get(`${API_PATH}/refresh`, { withCredentials: true });

                return httpClient.request(originalRequest);
            } catch (e) {
                PubSub.emit('logout');
                throw e;
            }
        }

        throw error;
    }
);

type Params = Record<string, string | undefined>;

export class HttpService {
    private baseApi: string = '';

    constructor(baseApiPath: string = API_PATH) {
        this.baseApi = baseApiPath;
    }

    get baseHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TokenService.getToken()}`
        };
    }

    async get(path: string, params?: Params) {
        const response = await httpClient.get(
            `${this.baseApi}/${path}`,
            { params, headers: this.baseHeaders }
        );

        return response.data;
    }

    async post<T>(path: string, data?: T, params?: Params) {
        const response = await httpClient.post(
            `${this.baseApi}/${path}`, data,
            { params, headers: this.baseHeaders }
        );

        return response.data;
    }

    async patch<T>(path: string, id: number, data?: T, params?: Params,) {
        const response = await httpClient.patch(`${this.baseApi}/${path}${id}`, data,
            { params, headers: this.baseHeaders }
        );
        return response.data;
    }

    async delete<T>(path: string, id: number, data?: T) {
        const response = await httpClient.delete(`${this.baseApi}/${path}${id}`,
            { headers: this.baseHeaders }
        );
        return response.data;
    }

}