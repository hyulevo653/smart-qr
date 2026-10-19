import { axiosClient } from './axios-client';
import { APP_ID, PACKAGE_ID } from '@/constants';

export const packageApi = {
  getPackage(packageId: number) {
    return axiosClient.get<unknown, any>(`packages/${packageId}`);
  },

  getPackages() {
    return axiosClient.get<unknown, any>('packages', { params: { appId: APP_ID } });
  }
};
