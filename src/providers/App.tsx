import i18n from '@/locales/i18n';
import { ReactProps } from '@/types';
import { I18nextProvider } from 'react-i18next';
import QueryClientProvider from './Client';
import { AuthProvider } from '@/contexts/auth-context';
import { ToastProvider } from '@/contexts/toast-context';

export default function AppProvider({ children }: ReactProps) {
    return (
         <I18nextProvider i18n={i18n}>
            <QueryClientProvider>
                <ToastProvider>
                    <AuthProvider>{children}</AuthProvider>
                </ToastProvider>
            </QueryClientProvider>
        </I18nextProvider>
    );
}

