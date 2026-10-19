import { reactor, setItem } from '@/utils';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function useLocalStorage<ValueType>(key: string, defaultValue?: ValueType) {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue === null ? defaultValue : JSON.parse(storedValue);
    });

    useEffect(() => {
        const listener = (e: StorageEvent) => {
            if (e.storageArea === localStorage && e.key === key) {
                setValue(e.newValue ? JSON.parse(e.newValue) : e.newValue);
            }
        };

        const storageSet = (event: { key: string; value: string }) => {
            if (event.key !== key) return;
            setValue(event.value ? JSON.parse(event.value) : event.value);
        };
        const storageRemove = (event: { key: string }) => {
            if (event.key !== key) return;
            setValue(defaultValue);
        };

        window.addEventListener('storage', listener);
        reactor.addEventListener('storage-set', storageSet);
        reactor.addEventListener('storage-remove', storageRemove);

        return () => {
            window.removeEventListener('storage', listener);
            reactor.removeEventListener('storage-set', storageSet);
            reactor.removeEventListener('storage-remove', storageRemove);
        };
    }, [key, defaultValue]);

    const setValueInLocalStorage = (newValue: ValueType) => {
        setValue((currentValue: any) => {
            const result = typeof newValue === 'function' ? newValue(currentValue) : newValue;
            setItem(key, result);
            return result;
        });
    };

    return [value, setValueInLocalStorage];
}
