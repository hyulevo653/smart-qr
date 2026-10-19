export interface QRHistory {
    id: number;
    userId: number;
    url: string;
}

export interface QRValue {
    url?: string;
    text?: string;
    email?: string;
    subject?: string;
    version?: string;
    body?: string;
    phone?: string;
    phone1?: string;
    phone2?: string;
    phone3?: string;
    nickName?: string;
    birthday?: string;
    name?: string;
    sms?: string;
    content?: string;
    firstName?: string;
    lastName?: string;
    company?: string;
    position?: string;
    personalPhone?: string;
    businessPhone?: string;
    website?: string;
    address?: string;
    city?: string;
    country?: string;
    zipcode?: string;
    fbUrl?: string;
    twitterUrl?:string;
    shareUrl? : string;
    type?: string;
    latitude?: string;
    longitude?: string;
    state?: string;
    street?: string;
    notes?: string;
    placeName?: string;
    ssid?: string;
    security?: 'WEP' | 'WPA' | 'nopass' | '';
    password?: string;
    hidden?: boolean;
    tiktokUrl?: string;
    videoUrl?: string;
    cryptoType?: string;
    label?: string;
    message? :string;
    amount?: string;
    bgColor?: string;
    fgColor?: string;
    logoBase64?: string; 
    logoWidth?: number; 
    logoHeight?: number;
    eventTitle?: string;
    eventLocation?: string;
    startDate?: string;
    startTime?: string;
    endDate?: string;
    endTime?: string;
    allDay?: boolean;
    eventDescription?: string;
}

export interface QRData {
    id: number;
    userId: number;
    url: string;
    name: string;
    type: string;
    date: string;
    format: string;
}

export interface LocationState {
    qrData?: QRData;
}