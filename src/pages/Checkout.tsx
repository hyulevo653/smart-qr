import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Grid, TextField, Typography, MenuItem, IconButton, Divider } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { axiosAuthgateClient } from '@/api';
import { useLocation, Navigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
    const location = useLocation();
    const packages = location.state?.packages || [];
    const currentPackage = location.state?.currentPackage || {};
    const [selectedPackage, setSelectedPackage] = useState(location.state?.package || {});

    const [client, setClient] = useState({
        clientId: '',
        name: '',
        email: '',
        phone: ''
    });

    const [customer, setCustomer] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const [quantity, setQuantity] = useState(1);
    const discount = 49000; // giảm giá cố định để giống hình

    useEffect(() => {
        axiosAuthgateClient.get('/public/users/me').then((response) => {
            if (response && response.data) {
                const { user, client } = response.data;
                setCustomer({
                    name: user.fullname || user.username,
                    phone: user.phone || client.phone,
                    email: user.email || client.email
                });
                setClient({
                    clientId: client.id,
                    name: client.name,
                    email: client.email,
                    phone: client.phone || ''
                });
            }
        });
    }, []);

    const handleChangePackage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedPackage = packages.find((pak: any) => pak.id === e.target.value);
        handleChangePackage(selectedPackage);
    };

    const handleQuantityChange = (delta: number) => {
        setQuantity((prev) => Math.max(1, prev + delta));
    };

    const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });
        if (e.target.value.trim() === '' && errors[e.target.name as keyof typeof errors] === '') {
            setErrors({
                ...errors,
                [e.target.name]: 'This field is required'
            });
        } else if (e.target.value.trim() !== '' && errors[e.target.name as keyof typeof errors] !== '') {
            setErrors({
                ...errors,
                [e.target.name]: ''
            });
        }
    };

    const getPackagePrice = () => {
        if (!selectedPackage || !selectedPackage.price) return 0;
        return selectedPackage.salePrice && selectedPackage.salePrice > 0 ? selectedPackage.salePrice : selectedPackage.price;
    };

    const calculatedPrice = () => {
        if (!selectedPackage || !selectedPackage.price) return 0;
        const price = selectedPackage.salePrice && selectedPackage.salePrice > 0 ? selectedPackage.salePrice : selectedPackage.price;
        return price * quantity;
    };

    const validation = () => {
        const cloneErrors = { ...errors };
        let valid = true;
        if (customer.name.trim() === '') {
            cloneErrors.name = 'Đây là trường bắt buộc';
            valid = false;
        }
        if (customer.phone.trim() === '') {
            cloneErrors.phone = 'Đây là trường bắt buộc';
            valid = false;
        }
        if (customer.email.trim() === '') {
            cloneErrors.email = 'Đây là trường bắt buộc';
            valid = false;
        }
        setErrors(cloneErrors);
        return valid;
    };

    const handleSubmit = () => {
        if (!validation()) return;

        const contractFromDate = new Date();
        const contractToDate = addDuration(selectedPackage.blockNum, selectedPackage.periodUnit);

        const items = [
            {
                packageId: selectedPackage.id,
                packageCode: selectedPackage.packageCode,
                name: selectedPackage.name,
                price: selectedPackage.price,
                quanity: `${quantity}`,
                amount: selectedPackage.price * quantity,
                currency: selectedPackage.currency,
                fromDate: contractFromDate.toISOString(),
                toDate: contractToDate.toISOString()
            }
            // Optionally, add selected quotas as items if needed
        ];

        const payload = {
            clientId: client.clientId,
            lang: 'vi',
            items,
            amount: calculatedPrice(),
            currency: selectedPackage.currency,
            orderDescription: selectedPackage.description || selectedPackage.name || 'Order',
            appId: selectedPackage.appId,
            customerName: customer.name,
            customerPhone: customer.phone || '',
            customerEmail: customer.email,
            companyName: client.name,
            companySN: '',
            companyEmail: client.email,
            companyPhone: client.phone || customer.phone || '',
            contractFromDate: contractFromDate,
            contractToDate: contractToDate,
            captkey: '',
            captvalue: '',
            orderTime: new Date(),
            redirectUrl: `${window.location.origin}/payment-result`
        };

        axiosAuthgateClient
            .post('/checkout/payments/create', payload)
            .then((response) => {
                if (response && response.data && response.data.checkoutUrl) {
                    const { checkoutUrl } = response.data;
                    window.location.replace(checkoutUrl);
                }
            })
            .catch((error) => {
                console.error('Error creating order:', error);
            });
    };

    function addDuration(value: number, unit: string) {
        const date = new Date(); // Create a copy to avoid modifying the original

        switch (unit.toUpperCase()) {
            case 'YEAR':
                date.setFullYear(date.getFullYear() + value);
                break;
            case 'MONTH':
                date.setMonth(date.getMonth() + value);
                break;
            case 'WEEK':
                date.setDate(date.getDate() + value * 7);
                break;
            case 'DAY':
                date.setDate(date.getDate() + value);
                break;
            case 'HOUR':
                date.setHours(date.getHours() + value);
                break;
            default:
                throw new Error('Unsupported time unit: ' + unit);
        }

        return date;
    }

    if (!selectedPackage || !selectedPackage.id || packages.length === 0) {
        return <Navigate to="/subcription" />;
    }

    return (
        <Box
            sx={{
                p: 4,
                backgroundColor: '#f5f5f5',
                minHeight: '100vh'
            }}
        >
            <Box sx={{ maxWidth: 1360, mx: 'auto' }}>
                {/* Thanh điều hướng */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton size="small" sx={{ mr: 1 }} onClick={() => window.history.back()}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography sx={{ color: '#1C8263', fontWeight: 600, fontSize: '24px' }}>Thanh toán</Typography>
                </Box>

                <Grid container spacing={3}>
                    {/* Cột trái */}
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent>
                                {/* Thông tin người mua */}
                                <Typography sx={{ mb: 1, color: '#1C8263', fontSize: '20px', fontWeight: 600 }}>
                                    Thông tin người mua
                                </Typography>

                                <Grid container spacing={2} sx={{ mb: 2 }}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{ color: '#1C8263', fontSize: '14px', fontWeight: 600 }}>Tên khách hàng</Typography>
                                        <TextField
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            label="Tên khách hàng"
                                            name="name"
                                            fullWidth
                                            size="small"
                                            value={customer.name}
                                            onChange={handleCustomerChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{ color: '#1C8263', fontSize: '14px', fontWeight: 600 }}>Số điện thoại</Typography>
                                        <TextField
                                            error={!!errors.phone}
                                            helperText={errors.phone}
                                            label="Số điện thoại"
                                            name="phone"
                                            fullWidth
                                            size="small"
                                            value={customer.phone}
                                            onChange={handleCustomerChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography sx={{ color: '#1C8263', fontSize: '14px', fontWeight: 600 }}>Email</Typography>
                                        <TextField
                                            error={!!errors.email}
                                            helperText={errors.email}
                                            label="Email"
                                            name="email"
                                            fullWidth
                                            size="small"
                                            value={customer.email}
                                            onChange={handleCustomerChange}
                                        />
                                    </Grid>
                                </Grid>

                                {/* Thông tin đơn hàng */}
                                <Typography sx={{ mb: 1, color: '#1C8263', fontSize: '20px', fontWeight: 600 }}>
                                    Thông tin đơn hàng
                                </Typography>

                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={8}>
                                        <Typography sx={{ color: '#1C8263', fontSize: '14px', fontWeight: 600 }}>Gói dịch vụ</Typography>
                                        <TextField select fullWidth size="small" value={selectedPackage.id} onChange={handleChangePackage}>
                                            {packages
                                                .filter((pak: any) => pak.id !== currentPackage.id)
                                                .map((pak: any) => {
                                                    const price = pak.salePrice && pak.salePrice > 0 ? pak.salePrice : pak.price;
                                                    const formatedPrice = new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    }).format(price);
                                                    const label = `${pak.name} - ${formatedPrice}`;
                                                    return (
                                                        <MenuItem key={pak.id} value={pak.id}>
                                                            {label}
                                                        </MenuItem>
                                                    );
                                                })}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography sx={{ color: '#1C8263', fontSize: '14px', fontWeight: 600 }}>&ensp;</Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '1px solid #ccc',
                                                borderRadius: '8px',
                                                p: 0.5
                                            }}
                                        >
                                            <IconButton size="small" onClick={() => handleQuantityChange(-1)}>
                                                <RemoveIcon fontSize="small" />
                                            </IconButton>
                                            <Typography sx={{ mx: 2, width: 20, textAlign: 'center' }}>
                                                {quantity.toString().padStart(2, '0')}
                                            </Typography>
                                            <IconButton size="small" onClick={() => handleQuantityChange(1)}>
                                                <AddIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Cột phải */}
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography sx={{ mb: 1, color: '#1C8263', fontsize: '20px', fontWeight: 600 }}>
                                    Thông tin thanh toán
                                </Typography>

                                <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                                    <Typography>Số lượng</Typography>
                                    <Typography>{quantity}</Typography>
                                </Grid>

                                <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                                    <Typography>Đơn giá</Typography>
                                    <Typography>
                                        {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(getPackagePrice())}
                                    </Typography>
                                </Grid>

                                <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                                    <Typography>Thành tiền</Typography>
                                    <Typography>
                                        {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(calculatedPrice())}
                                    </Typography>
                                </Grid>

                                {/* <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                                    <Typography>Giảm giá</Typography>
                                    <Typography>{discount.toLocaleString('vi-VN')}</Typography>
                                </Grid> */}

                                <Divider sx={{ my: 2 }} />

                                <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
                                    <Typography fontWeight="bold">Tổng cộng</Typography>
                                    <Typography fontWeight="bold" color="#00A64F">
                                        {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(calculatedPrice())}
                                    </Typography>
                                </Grid>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ backgroundColor: '#00A64F', fontWeight: 600 }}
                                    onClick={handleSubmit}
                                >
                                    Thanh toán
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default CheckoutPage;
