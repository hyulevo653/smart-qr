import { createRoot } from 'react-dom/client';

// third party
import { BrowserRouter } from 'react-router-dom';

// project imports
import { ConfigProvider } from '@/contexts/ConfigContext';
import { Toaster } from 'react-hot-toast';
import App from './App';
import AppProvider from './providers/App';

// style + assets
import '@/assets/scss/style.scss';
import { BASE_PATH } from './constants';
import { AuthProvider } from './contexts/auth-context';
import { ToastProvider } from './contexts/toast-context';

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <>
        <BrowserRouter basename={BASE_PATH}>
          <Toaster />
            <ConfigProvider>
                <AppProvider>  
                    <AuthProvider>
                         <App />
                    </AuthProvider>
                </AppProvider>
            </ConfigProvider>
        </BrowserRouter>
    </>
);
