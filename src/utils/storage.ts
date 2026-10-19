import { TOKEN_KEY } from '@/constants';
import { reactor } from './event';

reactor.registerEvent('storage-set');
reactor.registerEvent('storage-remove');

export function clearLoginStorage() {
  removeItem(TOKEN_KEY);
}

export function setItem(key: string, value: string) {
  reactor.dispatchEvent('storage-set', { key, value });
  localStorage.setItem(key, value);
}

export function removeItem(key: string) {
  reactor.dispatchEvent('storage-remove', { key });
  localStorage.removeItem(key);
}

export function getItem(key: string) {
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : item;
  } catch (error) {
    console.log(error);
    return null;
  }
}
