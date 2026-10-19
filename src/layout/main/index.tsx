import { Outlet } from 'react-router-dom';

// material-ui
import { styled } from '@mui/material/styles';

// project imports
import Footer from './footer';
import Contact from './contact';
import AppBar from '@/ui-component/extended/AppBar';
import { TemplateProvider } from '@/contexts/template-context';

// ==============================|| MAIN LAYOUT ||============================== //

const HeaderWrapper = styled('div')(({ theme }) => ({
    // paddingBottom: 30,
  backgroundColor: '#00A64F', // Set your desired background color
  overflowX: 'hidden',
  overflowY: 'clip',
  width: '100%', // Ensure it spans the full width
    [theme.breakpoints.down('md')]: {
        // paddingBottom: 42
    }
}));

const SecondWrapper = styled('div')(({ theme }) => ({
    // paddingTop: 160,
    [theme.breakpoints.down('md')]: {
        // paddingTop: 60
    }
}));

const MainLayout = () => {
    return (
        <>
         <TemplateProvider>
             <HeaderWrapper   id="home">
                <AppBar  />
            </HeaderWrapper>
            <SecondWrapper>
                <Outlet />
            </SecondWrapper>
         </TemplateProvider>
        </>
    );
};

export default MainLayout;
