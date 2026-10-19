
import axios from 'axios';
import { onRequest, onRequestError, onResponse, onResponseError } from './axios-client';
import qs from 'qs';
import { API_KEY, APP_ID, PAYMENT_URL } from '@/constants/env';
import { Package, PaymentCreatePayload, PaymentCreateResponse, PaymentQueryPayload } from '@/types/payment';

const axiosClient = axios.create({
  baseURL: PAYMENT_URL,
  headers: {
    ['Content-Type']: 'application/json',
    ...(API_KEY ? { ["Api-Key"]: API_KEY } : {}),
    ...(APP_ID ? { ["App-Id"]: APP_ID } : {})
  },
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: 'brackets' });
  },
});

axiosClient.interceptors.request.use(onRequest, onRequestError);
axiosClient.interceptors.response.use(onResponse, onResponseError);

export const paymentApi = {
  getAllPackage() {
    return axiosClient.get<unknown, Package[]>('/pub/packages/EPL');
  },
  createPayment(payload: PaymentCreatePayload) {
    return axiosClient.post<unknown, PaymentCreateResponse>(
      '/payments/create',
      payload
    );
  },
  queryPayment(payload: PaymentQueryPayload) {
    return axiosClient.post<unknown, { status: string }>(
      '/payments/query',
      payload
    );
  },
};
