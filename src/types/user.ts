export interface UserInfo {
  user: User
  roles: string[]
}

export interface User {
  id: string
  userId?: string
  username?: string
  email?: string
  avatar?: string
  fullname?: string
  address?: string
  gender?: string
  birthday?: string
  isVerified?: boolean
  subscribe? : Subscribe
  roles?: string[]
  isActive?: boolean
  phone?: string
  metadata?: Metadata
}

export interface Subscribe {
  id?: number;
  clientId?: number;
  subscribeClientId?: number;
  appId?: number;
  startDate?: string;
  endDate?: string;
  renewedDate?: string | null;
  status?: string;
  info?: string; 
  updated?: string;
  updatedBy?: string;
  created?: string;
  createdBy?: string | null;
}

export interface Metadata {
  wardName: string
  districtId: string
  districtName: string
  avatarUrl: string
  provinceName: string
  wardId: string
  provinceId: string
}
