import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Button,
    IconButton,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Paper,
    Pagination,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Popover
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { qrApi, QRItem, QRResponse } from '@/api/qr';
import { format, isValid } from 'date-fns';
import { AxiosResponse } from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContext } from '@/contexts/toast-context';
import { useNavigate } from 'react-router-dom';

type IconType = 'url' | 'sms' | 'wifi' | 'vcard' | 'email' | 'phone' | 'text' | 'bitcoin' | 'youtube' | 'tiktok' | 'facebook' | 'twitter' | 'location' | 'mecard' | 'event';
const svgIcons: Record<IconType, JSX.Element> = {
    url: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                d="M14.9902 17.5H16.5002C19.5202 17.5 22.0002 15.03 22.0002 12C22.0002 8.98 19.5302 6.5 16.5002 6.5H14.9902"
                stroke="#1C8263"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9 6.5H7.5C4.47 6.5 2 8.97 2 12C2 15.02 4.47 17.5 7.5 17.5H9"
                stroke="#1C8263"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M8 12H16" stroke="#1C8263" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    sms: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                d="M8.5 10.5H15.5"
                stroke="#1C8263"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7 18.4297H11L15.45 21.3897C16.11 21.8297 17 21.3597 17 20.5597V18.4297C20 18.4297 22 16.4297 22 13.4297V7.42969C22 4.42969 20 2.42969 17 2.42969H7C4 2.42969 2 4.42969 2 7.42969V13.4297C2 16.4297 4 18.4297 7 18.4297Z"
                stroke="#1C8263"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    wifi: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                d="M6 9.96004C9.63 7.15004 14.37 7.15004 18 9.96004"
                stroke="#1C8263"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.6001 13.0499C10.2701 10.9899 13.7401 10.9899 16.4101 13.0499"
                stroke="#1C8263"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.7998 16.1397C11.1298 15.1097 12.8698 15.1097 14.1998 16.1397"
                stroke="#1C8263"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="#1C8263"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    vcard: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                d="M18 18.8597H17.24C16.44 18.8597 15.68 19.1697 15.12 19.7297L13.41 21.4197C12.63 22.1897 11.36 22.1897 10.58 21.4197L8.87 19.7297C8.31 19.1697 7.54 18.8597 6.75 18.8597H6C4.34 18.8597 3 17.5298 3 15.8898V4.97974C3 3.33974 4.34 2.00977 6 2.00977H18C19.66 2.00977 21 3.33974 21 4.97974V15.8898C21 17.5198 19.66 18.8597 18 18.8597Z"
                stroke="#1C8263"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.9999 9.99982C13.2868 9.99982 14.33 8.95662 14.33 7.6698C14.33 6.38298 13.2868 5.33984 11.9999 5.33984C10.7131 5.33984 9.66992 6.38298 9.66992 7.6698C9.66992 8.95662 10.7131 9.99982 11.9999 9.99982Z"
                stroke="#1C8263"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16 15.6594C16 13.8594 14.21 12.3994 12 12.3994C9.79 12.3994 8 13.8594 8 15.6594"
                stroke="#1C8263"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    email: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                d="M8.5 10.5H15.5"
                stroke="#1C8263"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7 18.4297H11L15.45 21.3897C16.11 21.8297 17 21.3597 17 20.5597V18.4297C20 18.4297 22 16.4297 22 13.4297V7.42969C22 4.42969 20 2.42969 17 2.42969H7C4 2.42969 2 4.42969 2 7.42969V13.4297C2 16.4297 4 18.4297 7 18.4297Z"
                stroke="#1C8263"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    text: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                d="M8.5 10.5H15.5"
                stroke="#1C8263"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7 18.4297H11L15.45 21.3897C16.11 21.8297 17 21.3597 17 20.5597V18.4297C20 18.4297 22 16.4297 22 13.4297V7.42969C22 4.42969 20 2.42969 17 2.42969H7C4 2.42969 2 4.42969 2 7.42969V13.4297C2 16.4297 4 18.4297 7 18.4297Z"
                stroke="#1C8263"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    bitcoin: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 8.38086H13.6846C14.7231 8.38086 15.5654 9.31548 15.5654 10.2616C15.5654 11.3001 14.7231 12.1424 13.6846 12.1424H9V8.38086Z" stroke="#1C8263" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 12.1309H14.3539C15.5423 12.1309 16.5 12.9732 16.5 14.0116C16.5 15.0501 15.5423 15.8924 14.3539 15.8924H9V12.1309Z" stroke="#1C8263" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.2769 15.8809V17.7616" stroke="#1C8263" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.93457 15.8809V17.7616" stroke="#1C8263" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.2769 6.5V8.38077" stroke="#1C8263" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.93457 6.5V8.38077" stroke="#1C8263" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10.7769 8.38086H7.5" stroke="#1C8263" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10.7769 15.8809H7.5" stroke="#1C8263" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#1C8263" stroke-width="1.5" stroke-miterlimit="10"/>
        </svg>
    ),
    youtube: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17 20H7C4 20 2 18 2 15V9C2 6 4 4 7 4H17C20 4 22 6 22 9V15C22 18 20 20 17 20Z" stroke="#1C8263" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11.4001 9.5003L13.9001 11.0003C14.8001 11.6003 14.8001 12.5003 13.9001 13.1003L11.4001 14.6003C10.4001 15.2003 9.6001 14.7003 9.6001 13.6003V10.6003C9.6001 9.3003 10.4001 8.9003 11.4001 9.5003Z" stroke="#1C8263" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    ),
    tiktok: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M19.4998 9.39958C19.4999 9.95195 19.0497 10.4076 18.5033 10.3266C17.3525 10.156 16.2898 9.69453 15.3859 9.01525V15.3043C15.3859 18.4454 12.944 21 9.94295 21C8.78326 21 7.70743 20.6175 6.82368 19.968C5.4203 18.9367 4.5 17.2311 4.5 15.3043C4.5 12.1631 6.94194 9.60778 9.94366 9.60778C10.3639 9.60778 10.6769 9.97582 10.6769 10.3961V12.0763C10.6769 12.4444 10.3117 12.7024 9.94366 12.7024C8.57325 12.7024 7.458 13.8695 7.458 15.3043C7.458 16.3033 7.99986 17.1711 8.79114 17.6069C9.13589 17.7966 9.52795 17.9054 9.94438 17.9054C11.2833 17.9054 12.3756 16.7908 12.4257 15.4018L12.4277 3.99983C12.4278 3.44761 12.8755 3 13.4277 3H14.5958C15.0318 3 15.3799 3.35582 15.4547 3.78528C15.6633 4.96433 16.332 5.97612 17.2587 6.6084C17.6375 6.86693 18.0593 7.06236 18.5102 7.17965C19.0446 7.31867 19.4994 7.7535 19.4995 8.3057L19.4998 9.39958Z" stroke="#1C8263" stroke-width="1.5"/>
        </svg>
    ),
    facebook: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M14 9.3V12.2H16.6C16.8 12.2 16.9 12.4 16.9 12.6L16.5 14.5C16.5 14.6 16.3 14.7 16.2 14.7H14V22H11V14.8H9.3C9.1 14.8 9 14.7 9 14.5V12.6C9 12.4 9.1 12.3 9.3 12.3H11V9C11 7.3 12.3 6 14 6H16.7C16.9 6 17 6.1 17 6.3V8.7C17 8.9 16.9 9 16.7 9H14.3C14.1 9 14 9.1 14 9.3Z" stroke="#1C8263" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
        <path d="M15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9V15C22 20 20 22 15 22Z" stroke="#1C8263" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    ),
    twitter: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <g clip-path="url(#clip0_754_3883)">
        <path d="M17.175 3.86523H19.9365L13.905 10.757L21 20.1365H15.4462L11.0933 14.4492L6.11775 20.1365H3.35175L9.80175 12.7632L3 3.86523H8.69475L12.6255 9.06348L17.175 3.86523ZM16.2052 18.4857H17.7345L7.8615 5.42973H6.219L16.2052 18.4857Z" fill="#1C8263"/>
        </g>
        <defs>
        <clipPath id="clip0_754_3883">
        <rect width="18" height="18" fill="white" transform="translate(3 3)"/>
        </clipPath>
        </defs>
        </svg>
    ),
    location: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M22 8.99953V14.9995C22 17.4995 21.5 19.2495 20.38 20.3795L14 13.9995L21.73 6.26953C21.91 7.05953 22 7.95953 22 8.99953Z" stroke="#1C8263" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.73 6.27L6.26999 21.73C3.25999 21.04 2 18.96 2 15V9C2 4 4 2 9 2H15C18.96 2 21.04 3.26 21.73 6.27Z" stroke="#1C8263" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.38 20.38C19.25 21.5 17.5 22 15 22H9.00003C7.96003 22 7.06002 21.91 6.27002 21.73L14 14L20.38 20.38Z" stroke="#1C8263" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.23977 7.97973C6.91977 5.04973 11.3198 5.04973 11.9998 7.97973C12.3898 9.69973 11.3098 11.1597 10.3598 12.0597C9.66977 12.7197 8.57979 12.7197 7.87979 12.0597C6.92979 11.1597 5.83977 9.69973 6.23977 7.97973Z" stroke="#1C8263" stroke-width="1.5"/>
<path d="M9.0946 8.7002H9.10359" stroke="#1C8263" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    ),
    mecard: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M16.9949 4H6.99488C3.16488 4 2.09488 4.92 2.00488 8.5C3.93488 8.5 5.49488 10.07 5.49488 12C5.49488 13.93 3.93488 15.49 2.00488 15.5C2.09488 19.08 3.16488 20 6.99488 20H16.9949C20.9949 20 21.9949 19 21.9949 15V9C21.9949 5 20.9949 4 16.9949 4Z" stroke="#1C8263" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.99316 4V7.5" stroke="#1C8263" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.99316 16.5V20" stroke="#1C8263" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.025 9.33016L15.645 10.5802C15.705 10.7002 15.825 10.7902 15.955 10.8102L17.335 11.0102C17.675 11.0602 17.815 11.4802 17.565 11.7202L16.565 12.6902C16.465 12.7802 16.425 12.9202 16.445 13.0602L16.685 14.4302C16.745 14.7702 16.385 15.0302 16.085 14.8702L14.855 14.2202C14.735 14.1602 14.585 14.1602 14.465 14.2202L13.235 14.8702C12.925 15.0302 12.575 14.7702 12.635 14.4302L12.875 13.0602C12.895 12.9202 12.855 12.7902 12.755 12.6902L11.765 11.7202C11.515 11.4802 11.655 11.0602 11.995 11.0102L13.375 10.8102C13.515 10.7902 13.625 10.7102 13.685 10.5802L14.295 9.33016C14.435 9.02016 14.875 9.02016 15.025 9.33016Z" stroke="#1C8263" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    ),
    phone: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" stroke="#1C8263" stroke-width="1.5" stroke-miterlimit="10"/>
<path d="M18.5 9C18.5 8.4 18.03 7.48 17.33 6.73C16.69 6.04 15.84 5.5 15 5.5" stroke="#1C8263" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 9C22 5.13 18.87 2 15 2" stroke="#1C8263" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    ),
    event: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8 2V5" stroke="#1C8263" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 2V5" stroke="#1C8263" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.5 9.09H20.5" stroke="#1C8263" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#1C8263" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.6947 13.7H15.7037" stroke="#1C8263" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.6947 16.7H15.7037" stroke="#1C8263" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.9955 13.7H12.0045" stroke="#1C8263" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.9955 16.7H12.0045" stroke="#1C8263" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.29431 13.7H8.30329" stroke="#1C8263" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.29431 16.7H8.30329" stroke="#1C8263" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
};

const QRList: React.FC = () => {
    const [filterType, setFilterType] = useState('Tất cả loại mã');
    const [search, setSearch] = useState('');
    const { showToast } = useContext(ToastContext)!;
    const [data, setData] = useState<QRItem[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const fetchQRList = async () => {
        try {
            const limit = 10;
            const skip = (page - 1) * limit;
            const params: any = { limit, skip };

            const conditions: any[] = [];

            if (search) {
                conditions.push({ name: { like: `%${search}%` } });
            }

            if (filterType !== 'Tất cả loại mã') {
                conditions.push({ type: filterType });
            }

            let hasDateFilter = false;

            if (fromDate && isValid(fromDate) && toDate && isValid(toDate)) {
                hasDateFilter = true;
                conditions.push({ date: { gte: format(fromDate, "yyyy-MM-dd'T'00:00:00.000'Z'") } });
                conditions.push({ date: { lt: format(toDate, "yyyy-MM-dd'T'23:59:59.999'Z'") } });
            } else if (fromDate && isValid(fromDate)) {
                hasDateFilter = true;
                conditions.push({ date: { gte: format(fromDate, "yyyy-MM-dd'T'00:00:00.000'Z'") } });
            } else if (toDate && isValid(toDate)) {
                hasDateFilter = true;
                conditions.push({ date: { lt: format(toDate, "yyyy-MM-dd'T'23:59:59.999'Z'") } });
            }

            if (conditions.length > 0) {
                // Nếu có lọc ngày hoặc có nhiều điều kiện, luôn bọc bằng and
                if (hasDateFilter || conditions.length > 1) {
                    params.where = { and: conditions };
                } else {
                    params.where = conditions[0];
                }
            }

            const res: AxiosResponse<QRResponse> = await qrApi.listQR(params);

            if (!res || !res.data || !res.data.history || !Array.isArray(res.data.history)) {
                console.error('API response is invalid:', res?.data);
                setData([]);
                setTotalPages(1);
                setTotalCount(0);
                return;
            }

            const qrData = res.data.history.map((item: QRItem) => ({
                id: item.id,
                userId: item.userId ?? undefined,
                name: item.name || 'N/A',
                type: item.type || 'N/A',
                date: item.date && isValid(new Date(item.date)) ? item.date : '',
                url: item.url || ''
            }));
            setData(qrData);

            const count = res.data.total?.count || 0;
            setTotalCount(count);
            setTotalPages(Math.ceil(count / limit));

        } catch (error: any) {
            console.error('Fetch QR list failed:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                stack: error.stack
            });
            setData([]);
            setTotalPages(1);
            setTotalCount(0);
        }
    };

    useEffect(() => {
        fetchQRList();
    }, [page, search, filterType, fromDate, toDate]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleDownload = (base64Url: string, name: string, id: number) => {
        try {
            if (!base64Url || !base64Url.startsWith('data:image/')) {
                console.error('Invalid Base64 URL:', base64Url);
                return;
            }

            const link = document.createElement('a');
            link.href = base64Url;
            link.download = `${name || `qr-code-${id}`}.png`;
            link.click();
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    const handleOpenConfirm = (id: number) => {
        setSelectedId(id);
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
        setSelectedId(null);
    };

    const handleDelete = async () => {
        if (!selectedId) return;

        try {
            await qrApi.deleteQR(selectedId);
            handleCloseConfirm();
            showToast('Xóa QR thành công', 'success');
            fetchQRList();
        } catch (error: any) {
            showToast(`Xóa QR thất bại ${error}`, 'success');
        }
    };

   const handlePreview = async (id: number) => {
      try {
        const response = await qrApi.getQRById(id); 
        navigate('/', { state: { qrData: response }, replace: true })
      } catch (err) {
        console.error('Lỗi khi lấy QR:', err);
        // Có thể show snackbar lỗi
      }
    };

    const handleClosePreview = () => {
        setPreviewOpen(false);
        setPreviewUrl(null);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: '#f5f5f5',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                p: 4
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 1360,
                    bgcolor: '#fff',
                    borderRadius: 3,
                    boxShadow: 1,
                    p: 3
                }}
            >
                <Typography variant="h5" fontWeight="bold" mb={2} color="#00A64F">
                    Danh sách mã QR
                </Typography>

                {/* Bộ lọc */}
                <Box display="flex" gap={2} mb={2}>
                    <Select
                        size="small"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        sx={{ minWidth: 150, backgroundColor: '#fff' }}
                    >
                        <MenuItem value="Tất cả loại mã">Tất cả loại mã</MenuItem>
                        <MenuItem value="url">URL</MenuItem>
                        <MenuItem value="wifi">Wifi</MenuItem>
                        <MenuItem value="vcard">VCard</MenuItem>
                        <MenuItem value="sms">Tin nhắn</MenuItem>
                        <MenuItem value="email">Email</MenuItem>
                        <MenuItem value="phone">Điện thoại</MenuItem>
                        <MenuItem value="text">Văn bản</MenuItem>
                        <MenuItem value="youtube">Youtube</MenuItem>
                        <MenuItem value="tiktok">Tiktok</MenuItem>
                        <MenuItem value="facebook">Facebook</MenuItem>
                        <MenuItem value="twitter">Twitter</MenuItem>
                        <MenuItem value="location">Vị trí</MenuItem>
                        <MenuItem value="mecard">MeCard</MenuItem>
                        <MenuItem value="event">Sự kiện</MenuItem>
                    </Select>

                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<CalendarMonthIcon />}
                        sx={{ backgroundColor: '#fff' }}
                        onClick={handleClick}
                    >
                        {fromDate && toDate ? `${fromDate.toLocaleDateString()} - ${toDate.toLocaleDateString()}` : 'Tất cả ngày tạo'}
                    </Button>

                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                    >
                        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <input
                                type="date"
                                value={fromDate ? fromDate.toISOString().split('T')[0] : ''}
                                onChange={(e) => setFromDate(e.target.value ? new Date(e.target.value) : null)}
                            />
                            <input
                                type="date"
                                value={toDate ? toDate.toISOString().split('T')[0] : ''}
                                onChange={(e) => setToDate(e.target.value ? new Date(e.target.value) : null)}
                            />
                            <Button variant="contained" size="small" onClick={handleClose}>
                                Xác nhận
                            </Button>
                        </Box>
                    </Popover>

                    <TextField
                        size="small"
                        placeholder="Tìm kiếm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ ml: 'auto', backgroundColor: '#fff' }}
                    />
                </Box>

                {/* Bảng */}
                <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ảnh QR</TableCell>
                                <TableCell>Tên mã</TableCell>
                                <TableCell>Loại mã</TableCell>
                                <TableCell>Ngày cập nhật</TableCell>
                                <TableCell align="center">Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <img src={item.url} width={80} height={80} alt={item.name} id={`qr-img-${item.id}`} />
                                    </TableCell>
                                    <TableCell>{item.name || 'No Name'}</TableCell>
                                    <TableCell>
                                        <IconButton color="success">{svgIcons[item.type as IconType]}</IconButton>
                                        {item.type}
                                    </TableCell>
                                    <TableCell>{item.date ? format(new Date(item.date), 'dd/MM/yyyy') : 'N/A'}</TableCell>
                                    <TableCell align="center">
                                        <IconButton color="success" onClick={() => handlePreview(item.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z"
                                                    stroke="#00A64F"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M11.9998 20.2697C15.5298 20.2697 18.8198 18.1897 21.1098 14.5897C22.0098 13.1797 22.0098 10.8097 21.1098 9.39973C18.8198 5.79973 15.5298 3.71973 11.9998 3.71973C8.46984 3.71973 5.17984 5.79973 2.88984 9.39973C1.98984 10.8097 1.98984 13.1797 2.88984 14.5897C5.17984 18.1897 8.46984 20.2697 11.9998 20.2697Z"
                                                    stroke="#00A64F"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </IconButton>
                                        <IconButton color="primary" onClick={() => handleDownload(item.url, item.name, item.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                                                    stroke="#292D32"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M9 11.5098L12 14.5098L15 11.5098"
                                                    stroke="#292D32"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M12 14.5098V6.50977"
                                                    stroke="#292D32"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M6 16.5098C9.89 17.8098 14.11 17.8098 18 16.5098"
                                                    stroke="#292D32"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleOpenConfirm(item.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047"
                                                    stroke="#292D32"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                                                    stroke="#292D32"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M18.8499 9.13965L18.1999 19.2096C18.0899 20.7796 17.9999 21.9996 15.2099 21.9996H8.7899C5.9999 21.9996 5.9099 20.7796 5.7999 19.2096L5.1499 9.13965"
                                                    stroke="#292D32"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M10.3301 16.5H13.6601"
                                                    stroke="#292D32"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M9.5 12.5H14.5"
                                                    stroke="#292D32"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <Typography variant="body2">Hiển thị {totalCount} kết quả</Typography>
                    <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
                </Box>
            </Box>

            {/* Popup xác nhận */}
            <Dialog open={openConfirm} onClose={handleCloseConfirm}>
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>Bạn có chắc chắn muốn xóa QR này không? Hành động này không thể hoàn tác.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm} color="inherit">
                        Hủy
                    </Button>
                    <Button onClick={handleDelete} color="error" variant="contained">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={previewOpen} onClose={handleClosePreview} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Xem trước QR
                    <IconButton
                        aria-label="close"
                        onClick={handleClosePreview}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500]
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                    {previewUrl && <img src={previewUrl} alt="QR Preview" style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }} />}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default QRList;
