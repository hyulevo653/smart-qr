import { ApiResponse } from '@/types';
import { axiosClient } from './axios-client';

function getToken(code: string): Promise<ApiResponse<any>> {
  return axiosClient.get('/auth/thirdparty/callback', {
    params: { code },  
  });
}

function getUserInfo(): Promise<ApiResponse<any>> {
  return axiosClient.get('/users/me');
}

export const authApi = {
  getToken,
  getUserInfo
};
