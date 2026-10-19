import { AxiosResponse } from 'axios';
import { axiosClient } from './axios-client';

export interface QRItem {
    id: number;
    name: string;
    type: string;
    userId: number;
    date: string;
    url: string;
}

export interface QRResponse {
    history: QRItem[];
    total: { count: number };
}

export const qrApi = {
    createQR(data: any) {
        return axiosClient.post('/histories', data);
    },
    listQR: async (params?: any): Promise<AxiosResponse<QRResponse>> => {
        try {
            const response = await axiosClient.get('/histories', {
                params: params ? { filter: JSON.stringify(params) } : undefined
            });
            return response;
        } catch (error: any) {
            console.error('Error in listQR:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error; 
        }
    },
    deleteQR(id: number) {
        return axiosClient.delete(`/histories/${id}`);
    },
    getQRById(id: number) {
        return axiosClient.get(`/histories/${id}`);
    },
    updateQR(data: any) {
        return axiosClient.patch(`/histories`, data);
    }
};
