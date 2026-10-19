import { TemplateProvider } from '@/contexts/template-context';
import MainContent from './MainContent';
import { SnackbarProvider } from 'notistack';

// =============================|| LANDING MAIN ||============================= //

const Landing = () => (
    <>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
             <TemplateProvider>
                 <MainContent />
            </TemplateProvider>
        </SnackbarProvider>
    </>
);

export default Landing;
