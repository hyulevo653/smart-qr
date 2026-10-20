import Logo from '@/ui-component/Logo';
import {
    AppBar as MuiAppBar,
    Toolbar,
    Container,
    Box,
    Button,
    Menu,
    MenuItem,
    IconButton,
    useScrollTrigger,
    Typography,
    Grid,
    DialogContent,
    Dialog
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { ReactElement, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '@/contexts/auth-context';
import { TemplateState, useTemplate } from '@/contexts/template-context';
import { QRCodeCanvas } from 'qrcode.react';
import facebook from '@/assets/images/facebook.png';
import twitter from '@/assets/images/twitter.png';
import tiktok from '@/assets/images/tiktok.png';
import youtube from '@/assets/images/youtube1.png';
import bitcoin from '@/assets/images/bitcoin.png';
import wifi from '@/assets/images/wifi.png';
import email from '@/assets/images/email.png';
import text from '@/assets/images/texticon.jpg';
import phone from '@/assets/images/phone1.png';
import sms from '@/assets/images/SMS.jpg';
import card from '@/assets/images/card.png';



const TEMPLATES = [
    {
        id: 1,
        title: 'Mẫu QR 01',
        qrBgColor: '#FFFFFF',
        qrColor: '#000000', 
        logoImage: '',
        qrValue: '',
    },
    {
        id: 2,
        title: 'Mẫu QR Facebook',
        qrBgColor: '#FFFFFF',
        qrColor: '#2C4270',
        logoImage: facebook,
        qrValue: '',

    },
    {
        id: 3,
        title: 'Mẫu QR Twitter',
        qrBgColor: '#FFFFFF',
        qrColor: '#55ACEE',
        logoImage: twitter,
        qrValue: '',

    },
    {
        id: 4,
        title: 'Mẫu QR Tiktok',
        qrBgColor: '#FFFFFF',
        qrColor: '#FE2C55',
        logoImage: tiktok,
        qrValue: '',

    },
    {
         id: 5,
        title: 'Mẫu QR Bitcoin',
        qrBgColor: '#FFFFFF',
        qrColor: '#F38E14',
        logoImage: bitcoin,
        qrValue: '',
    },
    {
        id: 6,
        title: 'Mẫu QR Wifi',
        qrBgColor: '#FFFFFF',
        qrColor: '#2F5D50',
        logoImage: wifi,
        qrValue: '',
    },
    {
        id: 7,
        title: 'Mẫu QR Email',
        qrBgColor: '#FFFFFF',

        qrColor: '#D44638',
        logoImage: email,
        qrValue: '',
    },
    {
        id: 8,
        title: 'Mẫu QR Text',
        qrBgColor: '#FFFFFF',
        qrColor: '#E067C8',
        logoImage: text,
        qrValue: '',
    },
    {
        id: 9,
        title: 'Mẫu QR Phone',
        qrBgColor: '#FFFFFF',
        qrColor: '#4D7C0F',
        logoImage: phone,
        qrValue: '',
    },
    {
        id: 10,
        title: 'Mẫu QR SMS',
        qrBgColor: '#FFFFFF',

        qrColor: '#42D375',
        logoImage: sms,
        qrValue: '',

    },
    {
        id: 11,
        title: 'Mẫu QR Card',
        qrBgColor: '#FFFFFF',
        qrColor: '#8B5CF6',
        logoImage: card,
        qrValue: '',

    },
    {
        id: 12,
        title: 'Mẫu QR Youtube',
        qrBgColor: '#FFFFFF',
        qrColor: '#EE0F0F',
        logoImage: youtube,
        qrValue: '',
    }

];

// elevation scroll
interface ElevationScrollProps {
    children: ReactElement;
    window?: Window | Node;
}

function ElevationScroll({ children, window }: ElevationScrollProps) {
    const theme = useTheme();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window!
    });
 
    return React.cloneElement(children, {
        elevation: trigger ? 2 : 0,
        style: {
            background: 'linear-gradient(to top right, #fff, #d5efda)',
            color: theme.palette.text.dark
        }
    });
}

const AppBar = ({ ...others }) => {
    const { isAuthenticated, user, login, logout } = useAuth();
     const { selectTemplate } = useTemplate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [useranchorEl, setUserAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [openPopup, setopenPopup] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () => setopenPopup(true);
    const handleClose = () => setopenPopup(false);

    const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

   const handleSelectTemplate = (template: any) => {
    const templateState: TemplateState = {
        qrBgColor: template.qrBgColor || '#FFFFFF',
        qrColor: template.qrColor || '#000000',
        logoImage: template.logoImage || ''
    };
    
    selectTemplate(templateState); 
    navigate('/', { 
        state: { 
            templateStyling: templateState
        }
    });
    
    handleClose(); 
};


    const handleLanguageClose = () => {
        setAnchorEl(null);
    };

    const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserAnchorEl(event.currentTarget);
    };

    const handleUserClose = () => {
    setUserAnchorEl(null);
    };

    const handletoListQr = () => {
        handleClose();
        navigate('/list-qr');
    }

    const QrCustomIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M2 9V6.5C2 4.01 4.01 2 6.5 2H9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 2H17.5C19.99 2 22 4.01 22 6.5V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M22 16V17.5C22 19.99 19.99 22 17.5 22H16"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M9 22H6.5C4.01 22 2 19.99 2 17.5V15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M10.5 7V9C10.5 10 10 10.5 9 10.5H7C6 10.5 5.5 10 5.5 9V7C5.5 6 6 5.5 7 5.5H9C10 5.5 10.5 6 10.5 7Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M18.5 7V9C18.5 10 18 10.5 17 10.5H15C14 10.5 13.5 10 13.5 9V7C13.5 6 14 5.5 15 5.5H17C18 5.5 18.5 6 18.5 7Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.5 15V17C10.5 18 10 18.5 9 18.5H7C6 18.5 5.5 18 5.5 17V15C5.5 14 6 13.5 7 13.5H9C10 13.5 10.5 14 10.5 15Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M18.5 15V17C18.5 18 18 18.5 17 18.5H15C14 18.5 13.5 18 13.5 17V15C13.5 14 14 13.5 15 13.5H17C18 13.5 18.5 14 18.5 15Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

    return (
        <ElevationScroll {...others}>
            <MuiAppBar position="sticky" color="transparent" elevation={0} sx={{ backgroundColor: 'transparent' }}>
                <Container maxWidth="lg">
                    <Toolbar
                        sx={{
                            margin: '12px 0',
                            borderRadius: '12px',
                            padding: '6px 16px',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <RouterLink to="/" style={{ textDecoration: 'none' }}>
                            <Logo />
                        </RouterLink>

               
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<QrCustomIcon />}
                                sx={{ textTransform: 'none', borderRadius: '6px', backgroundColor: '#00A64F', color: '#fff' }}
                                onClick={handleOpen}
                            >
                                QR mẫu
                            </Button>

                            <Dialog open={openPopup} onClose={handleClose} maxWidth="sm" fullWidth>
                                <DialogContent sx={{ position: 'relative', padding: '20px' }}>
                                    {/* Nút đóng */}
                                    <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 10, top: 10 }}>
                                        <CloseIcon />
                                    </IconButton>

                                    <Typography variant="h6" gutterBottom>
                                        CHỌN MẪU QR
                                    </Typography>

                                    <Grid container spacing={2}>
                                           {TEMPLATES.map((template, index) => (
                                            <Grid item xs={6} sm={4} md={3} key={index} textAlign="center">
                                                <div
                                                    style={{
                                                        border: '1px solid #eee',
                                                        borderRadius: '6px',
                                                        padding: '8px',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => handleSelectTemplate(template)}
                                                >
                                                    <Box sx={{ p: 0.5 }}>
                                                        <QRCodeCanvas                 
                                                            value={template.qrValue} 
                                                            size={90} // Kích thước nhỏ phù hợp cho Dialog
                                                            level="H"
                                                            bgColor={template.qrBgColor}
                                                            fgColor={template.qrColor}
                                                            imageSettings={{
                                                                src: template.logoImage,
                                                                height: 20,
                                                                width: 20,
                                                                excavate: true
                                                            }}
                                                        />
                                                    </Box>
                                                    
                                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                                        {template.title}
                                                    </Typography>
                                                </div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </DialogContent>
                            </Dialog>

                            {/* Ngôn ngữ */}
                            <Button
                                variant="outlined"
                                color="inherit"
                                onClick={handleLanguageClick}
                                endIcon={<KeyboardArrowDownIcon />}
                                sx={{ textTransform: 'none', borderColor: '#ddd' }}
                            >
                                Tiếng Việt
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleLanguageClose}
                                PaperProps={{
                                    style: { boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }
                                }}
                            >
                                <MenuItem onClick={handleLanguageClose}>English</MenuItem>
                                <MenuItem onClick={handleLanguageClose}>Tiếng Việt</MenuItem>
                            </Menu>
                            {/* Tạm ẩn tính năng Đăng nhập & Đăng ký */}
                            {isAuthenticated ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <img
                                        src={user?.avatar || 'https://i.pravatar.cc/40'}
                                        alt={user?.username || 'User'}
                                        style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: '50%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}  onClick={handleUserClick}>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            Xin chào
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {user?.username || 'Người dùng'}
                                        </Typography>
                                    </Box>
                                    <Menu
                                        anchorEl={useranchorEl}
                                        open={Boolean(useranchorEl)}
                                        onClose={handleUserClose}
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                        PaperProps={{
                                        sx: {
                                            borderRadius: 2,
                                            paddingY: 0.5,
                                        },
                                        }}
                                    >
                                        <MenuItem onClick={() => navigate('/user-profile')}>Thông tin cá nhân</MenuItem>
                                        <MenuItem onClick={() => handletoListQr()}>Quản lý QR</MenuItem>
                                        <MenuItem onClick={() => logout()}>Đăng xuất</MenuItem>
                                    </Menu>
                                </Box>
                            ) : (
                                <Button
                                    variant="outlined"
                                    color="success"
                                    sx={{
                                        textTransform: 'none',
                                        borderRadius: '6px',
                                        borderColor: '#00A64F',
                                        color: '#00A64F'
                                    }}
                                    onClick={() => navigate('/list-qr')}
                                >
                                    Quản lý QR
                                </Button>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </MuiAppBar>
        </ElevationScroll>
    );
};

export default AppBar;
