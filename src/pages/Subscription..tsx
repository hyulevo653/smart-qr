import React, { useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAuth } from '@/contexts/auth-context';
import { useNavigate } from 'react-router-dom';
import { axiosAuthgateClient } from '@/api';


const transactionHistory = [
    {
        type: 'Nâng cấp gói',
        date: '15:00:35 - 15/09/2025',
        old: 'Miễn phí',
        current: 'Premium',
        start: '04/01/2025',
        end: '04/01/2025',
        changes: [{ label: 'Giới hạn QR', from: '3', to: '10', diff: '+2' }]
    },
    {
        type: 'Gia hạn gói',
        date: '15:00:35 - 15/09/2025',
        changes: [{ label: 'Giới hạn QR', from: '3', to: '10', diff: '+2' }]
    },
    {
        type: 'Mua mới',
        date: '15:00:35 - 15/09/2025',
        old: 'Premium',
        current: 'Enterprise',
        start: '04/01/2025',
        end: '04/01/2026',
        changes: [{ label: 'Giới hạn QR', from: '3', to: '10', diff: '+10' }]
    }
];

const SubscriptionPage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [packages, setPackages] = React.useState<any[]>([]);

    useEffect(() => {
        // Fetch available packages from the backend API
        axiosAuthgateClient
            .get('/public/packages')
            .then((res) => {
                console.log('Fetched packages:', res);
                setPackages(res.data || []);
            })
            .catch((err) => {
                console.error('Error fetching packages:', err);
            });
    }, []);

    let packageInfo: any = null;
    if (user?.subscribe?.info) {
        try {
            packageInfo = JSON.parse(user.subscribe.info).appPackage;
        } catch (e) {
            console.error('Parse package info failed:', e);
        }
    }
    const createdDate = packageInfo && packageInfo.created ? new Date(packageInfo.created) : new Date();
    const trialTime = packageInfo && packageInfo.trialTime ? packageInfo.trialTime : 0;
    const expirationDate = new Date(createdDate);
    expirationDate.setDate(createdDate.getDate() + trialTime);
    const formattedExpirationDate = expirationDate.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const renderTable = (tx: any) => (
        <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: 0 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#00A64F' }}>Thông tin</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#00A64F' }}>Giá trị trước</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#00A64F' }}>Giá trị hiện tại</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#00A64F' }}>Thay đổi</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tx.old && tx.current && (
                        <TableRow>
                            <TableCell>Gói dịch vụ</TableCell>
                            <TableCell>{tx.old}</TableCell>
                            <TableCell>{tx.current}</TableCell>
                            <TableCell>
                                {tx.type === 'Nâng cấp gói' ? 'Nâng cấp gói' : tx.type === 'Gia hạn' ? 'Gia hạn' : 'Mua mới'}
                            </TableCell>
                        </TableRow>
                    )}
                    {tx.start && (
                        <TableRow>
                            <TableCell>Ngày bắt đầu</TableCell>
                            <TableCell>{tx.start}</TableCell>
                            <TableCell>{tx.start}</TableCell>
                            <TableCell>-</TableCell>
                        </TableRow>
                    )}
                    {tx.end && (
                        <TableRow>
                            <TableCell>Ngày kết thúc</TableCell>
                            <TableCell>{tx.end}</TableCell>
                            <TableCell>{tx.end}</TableCell>
                            <TableCell>-</TableCell>
                        </TableRow>
                    )}
                    {tx.changes &&
                        tx.changes.map((c: any, i: number) => (
                            <TableRow key={i}>
                                <TableCell>{c.label}</TableCell>
                                <TableCell>{c.from}</TableCell>
                                <TableCell>{c.to}</TableCell>
                                <TableCell>{c.diff}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <Box
            sx={{
                p: 4,
                backgroundColor: '#f5f5f5',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start'
            }}
        >
            {/* Premium Banner */}
            <Box sx={{ width: '100%', maxWidth: 1400, bgcolor: '#f5f5f5', borderRadius: 3, p: 3 }}>
                <Box>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        {/* Cột trái - Premium Banner (tỷ lệ 4) */}
                        <Grid item xs={12} md={4}>
                            <Card sx={{ backgroundColor: `#00A64F`, color: '#fff', borderRadius: 2, height: '100%' }}>
                                <CardContent
                                    sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
                                >
                                    <Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                backgroundColor: '#00a64f',
                                                borderRadius: '12px'
                                            }}
                                        >
                                            {/* Premium + icon */}
                                            <Typography
                                                sx={{
                                                    fontSize: 32,
                                                    fontWeight: 700,
                                                    color: '#FFC933',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1
                                                }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="32"
                                                    height="33"
                                                    viewBox="0 0 32 33"
                                                    fill="none"
                                                >
                                                    <rect y="0.5" width="32" height="32" rx="16" fill="#FFC933" />
                                                    <path
                                                        d="M19.75 24H12.25C11.9425 24 11.6875 23.745 11.6875 23.4375C11.6875 23.13 11.9425 22.875 12.25 22.875H19.75C20.0575 22.875 20.3125 23.13 20.3125 23.4375C20.3125 23.745 20.0575 24 19.75 24Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M22.2625 11.6403L19.2625 13.7853C18.865 14.0703 18.295 13.8978 18.1225 13.4403L16.705 9.66027C16.465 9.00777 15.5425 9.00777 15.3025 9.66027L13.8775 13.4328C13.705 13.8978 13.1425 14.0703 12.745 13.7778L9.74504 11.6328C9.14504 11.2128 8.35004 11.8053 8.59754 12.5028L11.7175 21.2403C11.8225 21.5403 12.1075 21.7353 12.4225 21.7353H19.57C19.885 21.7353 20.17 21.5328 20.275 21.2403L23.395 12.5028C23.65 11.8053 22.855 11.2128 22.2625 11.6403ZM17.875 18.5628H14.125C13.8175 18.5628 13.5625 18.3078 13.5625 18.0003C13.5625 17.6928 13.8175 17.4378 14.125 17.4378H17.875C18.1825 17.4378 18.4375 17.6928 18.4375 18.0003C18.4375 18.3078 18.1825 18.5628 17.875 18.5628Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                                {packageInfo ? packageInfo.name : 'Không có gói'} {/* Fallback if packageInfo is null */}
                                            </Typography>

                                            {/* Nút trạng thái */}
                                            <Typography
                                                sx={{
                                                    padding: '7px 14px',
                                                    border: '1px solid #FFFFFF',
                                                    borderRadius: '26px',
                                                    fontSize: '12px',
                                                    fontWeight: 600,
                                                    backgroundColor: 'rgba(255, 201, 51, 0.2)',
                                                    color: '#fff',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {packageInfo && packageInfo.isActive ? 'Đang hoạt động' : 'Không hoạt động'}
                                            </Typography>
                                        </Box>

                                        <Typography
                                            sx={{
                                                fontSize: 16,
                                                fontWeight: 600,
                                                mt: 2
                                            }}
                                        >
                                            Hết hạn vào ngày {formattedExpirationDate} {/* Uses fallback date if packageInfo is null */}
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            mt: 2,
                                            backgroundColor: '#FFC933',
                                            color: '#1C8263',
                                            fontWeight: '600',
                                            padding: '11px 22px',
                                            width: '50%',
                                            '&:hover': { backgroundColor: '#f0f0f0' }
                                        }}
                                        disabled={!packageInfo}
                                    >
                                        Gia hạn ngay
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Cột phải - Thông tin gói (tỷ lệ 8) */}
                        <Grid item xs={12} md={8}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            borderRadius: '12px'
                                        }}
                                    >
                                        <Typography sx={{ color: '#1C8263', fontSize: '20px', fontWeight: 600 }} gutterBottom>
                                            Thông tin gói của tôi
                                        </Typography>
                                        <Typography sx={{ fontSize: 20, fontWeight: 600, color: '#4C4C4C' }}>
                                            <b>
                                                {packageInfo && packageInfo.price === 0
                                                    ? 'Miễn phí'
                                                    : packageInfo
                                                    ? `${packageInfo.price.toLocaleString('vi-VN')} ${packageInfo.currency}/ tháng`
                                                    : 'Không có thông tin gói'}
                                            </b>
                                        </Typography>
                                    </Box>
                                    <Grid container spacing={1}>
                                        {packageInfo && packageInfo.packQuotas && packageInfo.packQuotas.length > 0 ? (
                                            packageInfo.packQuotas.map((quota: any, idx: number) => (
                                                <Grid item xs={12} sm={4} key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
                                                            fill="#00A64F"
                                                        />
                                                    </svg>
                                                    {quota.name}
                                                </Grid>
                                            ))
                                        ) : (
                                            <Grid item xs={12}>
                                                <Typography>Không có thông tin chi tiết về gói.</Typography>
                                            </Grid>
                                        )}
                                    </Grid>
                                    {/* <Button
                                        sx={{
                                            padding: '11px 22px',
                                            gap: 1,
                                            borderRadius: '8px',
                                            backgroundColor: '#DD0000',
                                            color: '#fff',
                                            mt: 2
                                        }}
                                        disabled={!packageInfo}
                                    >
                                        Hủy gói
                                    </Button> */}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, fontSize: '24px', fontWeight: 600, color: '#1C8263' }}>
                    Các gói có sẵn
                </Typography>
                {/* Gói cước */}
                <Grid container spacing={2} sx={{ mb: 4 }}>
                    {packages.map((pak: any) => {
                        const price = pak.salePrice && pak.salePrice > 0 ? pak.salePrice : pak.price;
                        const formatedPrice = new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        }).format(price);
                        const features = pak.packFeatures || [];
                        const isCurrentPlan = packageInfo && pak.id === packageInfo.id;
                        return (
                            <Grid item xs={12} sm={4} key={pak.name}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                borderRadius: '12px'
                                            }}
                                        >
                                            <Typography sx={{ color: '#1C8263', fontWeight: 600, fontSize: '27px' }} gutterBottom>
                                                {pak.name}
                                            </Typography>
                                            <Typography sx={{ color: '#4C4C4C', fontWeight: 600, fontSize: '20px' }}>
                                                {formatedPrice}
                                            </Typography>
                                        </Box>
                                        <Grid container spacing={1}>
                                            {features.map((feature: any, idx: number) => (
                                                <Grid item xs={12} sm={12} key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
                                                            fill="#00A64F"
                                                        />
                                                    </svg>
                                                    {feature.name}
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </CardContent>
                                    {!isCurrentPlan ? (
                                        <Box sx={{ p: 2 }}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                sx={{ backgroundColor: '#00A64F' }}
                                                onClick={() =>
                                                    navigate('/checkout', {
                                                        state: { package: pak, packages, currentPackage: packageInfo }
                                                    })
                                                }
                                            >
                                                Chọn gói
                                            </Button>
                                        </Box>
                                    ) : null}
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>

                {/* Lịch sử giao dịch */}
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, fontSize: '24px', fontWeight: 600, color: '#1C8263' }}>
                    Lịch sử giao dịch
                </Typography>

                <Box
                    sx={{
                        mt: 2,
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        border: '1px solid #E0E0E0',
                        overflow: 'hidden'
                    }}
                >
                    {transactionHistory.map((tx, idx) => (
                        <Box key={idx}>
                            <Accordion
                                defaultExpanded={idx === 0}
                                disableGutters
                                elevation={0}
                                square
                                sx={{
                                    '&:before': { display: 'none' }
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    sx={{
                                        backgroundColor: '#F9F9F9',
                                        borderBottom: '1px solid #E0E0E0',
                                        '& .MuiAccordionSummary-content': { alignItems: 'center' }
                                    }}
                                >
                                    <Typography fontWeight="bold" sx={{ flexGrow: 1 }}>
                                        {tx.type}
                                    </Typography>
                                    <Typography color="text.secondary" fontSize={14}>
                                        {tx.date}
                                    </Typography>
                                </AccordionSummary>

                                {/** 👇 Quan trọng: render cho tất cả các type nếu có dữ liệu */}
                                {tx.old || tx.start || (tx.changes && tx.changes.length > 0) ? (
                                    <AccordionDetails sx={{ p: 0 }}>{renderTable(tx)}</AccordionDetails>
                                ) : null}
                            </Accordion>

                            {idx !== transactionHistory.length - 1 && <Divider />}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default SubscriptionPage;
