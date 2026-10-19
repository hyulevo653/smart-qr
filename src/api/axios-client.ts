import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_KEY, API_URL, APP_ID, AUTH_GATE_API } from '@/constants';
import qs from 'qs';

export const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    let token = sessionStorage.getItem('token');
    // console.log('Token from sessionStorage:', token);

    if (token) {
        token = token.replace(/^"|"$/g, '');
        config.headers.set('Authorization', `Bearer ${token}`);
    }
    // console.info(`[request] [${JSON.stringify(config)}]`);
    return config;
};

export const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    // console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
};

export const onResponse = (response: AxiosResponse): any => {
    // console.info(`[response] [${JSON.stringify(response)}]`);
    if (response.data) return response.data;
    return response;
};

export const onResponseError = (error: AxiosError, cb?: (error: AxiosError) => void): Promise<AxiosError> => {
    // console.error(`[response error] [${JSON.stringify(error)}]`);
    cb?.(error);
    return Promise.reject(error);
};

export const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'brackets' });
    }
});

axiosClient.interceptors.request.use(onRequest, onRequestError);
axiosClient.interceptors.response.use(onResponse, onResponseError);

export const axiosAuthgateClient = axios.create({
    baseURL: AUTH_GATE_API,
    headers: {
        'Content-Type': 'application/json',
        ...(API_KEY ? { ['Api-Key']: API_KEY } : {}),
        ...(APP_ID ? { ['App-Id']: APP_ID } : {}),
        ...(typeof sessionStorage !== 'undefined' && sessionStorage.getItem('token')
            ? { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
            : {})
    },
    paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'brackets' });
    }
});

axiosAuthgateClient.interceptors.request.use(onRequest, onRequestError);
axiosAuthgateClient.interceptors.response.use(onResponse, onResponseError);
