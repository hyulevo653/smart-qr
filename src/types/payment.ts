export type PackageCode = 'EPL_FREE' | 'EPL_BASIC' | 'EPL_PRO' | 'EPL_ADVANCED' | 'EPL_SAAS_FREE' | 'EPL_SAAS_BASIC' | 'EPL_SAAS_PRO' | 'EPL_SAAS_ADVANCED';

export type Package = {
  id: number;
  appId: number;
  appCode: string;
  packageCode: PackageCode;
  category: string;
  lang: string;
  name: string;
  description: string;
  price: number;
  salePrice: number;
  currency: string;
  availableQty: number;
  periodUnit: string;
  blockNum: number;
  isCustomPrice: boolean;
  status: string;
  updaterId: any;
  packOptions: OrderItemOption[] | null;
  packQuotas: any;
  updatedBy: any;
  createdBy: any;
  updatedTime: string;
  createdTime: string;
};

export interface PaymentCreatePayload {
  lang: string;
  items: Item[];
  amount: number;
  currency: string;
  orderDescription: string;
  appId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  companyName: string;
  companySN: string;
  companyEmail: string;
  customerAddress?: string;
  contractFromDate: Date;
  contractToDate: Date;
  message?: string;
  captkey: string;
  captvalue: string;
  orderTime: Date;
}

export interface Item {
  packageId: number;
  packageCode: string;
  name: string;
  price: number;
  quanity: string;
  amount: number;
  currency: string;
  fromDate: string;
  toDate: string;
  options: OrderItemOption[] | null;
}

export interface PaymentCreateResponse {
  message: string;
  code: string;
  signature: string;
  checkoutUrl: string;
  transactionCode: string;
  status: string;
  orderCode: string;
}
export interface PaymentQueryPayload {
  appCode: string;
  orderCode: string;
  transactionCode: string;
}

export interface OrderItemOption {
  code: string;
  name: string;
  price: string;
  currency: string;
  isDefault: boolean;
  isFixed: boolean;
  isRequired: boolean;
}
