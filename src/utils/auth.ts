import { BASE_SSO_URL } from '@/constants';
import { clearLoginStorage } from './storage';

export function login() {
    clearLoginStorage();
    window.location.href = `${BASE_SSO_URL}/login?continue=${encodeURIComponent(`${location.protocol}//${location.host}/authorize`)}`;
}
