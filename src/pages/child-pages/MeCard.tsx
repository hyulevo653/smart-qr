import React, { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Typography,
    Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type MeCardProps = {
    values: {
        firstName?: string;
        lastName?: string;
        nickName?: string;
        phone1?: string;
        phone2?: string;
        phone3?: string;
        birthday?: string;
        street?: string;
        city?: string;
        state?: string;
        email?: string;
        website?: string;
        country?: string;
        zipcode?: string;
        notes?: string;
    };
    onChange: (values: {
        firstName?: string;
        lastName?: string;
        nickName?: string;
        phone1?: string;
        phone2?: string;
        phone3?: string;
        birthday?: string;
        street?: string;
        city?: string;
        state?: string;
        email?: string;
        website?: string;
        country?: string;
        zipcode?: string;
        notes?: string;
    }) => void;
};

const MeCard: React.FC<MeCardProps> = ({ values, onChange }) => {
    const [expanded, setExpanded] = useState<boolean>(true);
    const handleFieldChange = (field: keyof typeof values, value: string) => {
        onChange({ ...values, [field]: value });
    };
    const handleChange = (_: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded);
    };

    return (
        <Accordion defaultExpanded expanded={expanded} onChange={handleChange} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                    fontWeight="bold"
                    sx={{
                        color: expanded ? '#00A64F' : '#4C4C4C',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: '18px',
                        fontWeight: expanded ? 600 : 500
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="10" fill="#00A64F" />
                        <path
                            d="M20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30Z"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16.0001 11H17.0001C15.0501 16.84 15.0501 23.16 17.0001 29H16.0001"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M23 11C24.95 16.84 24.95 23.16 23 29"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M11 24V23C16.84 24.95 23.16 24.95 29 23V24"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M11 17.0001C16.84 15.0501 23.16 15.0501 29 17.0001"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>{' '}
                    NHẬP NỘI DUNG
                </Typography>
            </AccordionSummary>
             <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <label>Họ và tên đệm</label>
                        <TextField
                            fullWidth size="small" placeholder="Nhập họ và tên đệm"
                            value={values.firstName || ''}
                            onChange={(e) => handleFieldChange('firstName', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <label>Tên</label>
                        <TextField
                            fullWidth size="small" placeholder="Nhập tên"
                            value={values.lastName || ''}
                            onChange={(e) => handleFieldChange('lastName', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <label>Biệt danh</label>
                        <TextField
                            fullWidth size="small" placeholder="Nhập biệt danh"
                            value={values.nickName || ''}
                            onChange={(e) => handleFieldChange('nickName', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>

            <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <label>Điện thoại 1</label>
                        <TextField
                            fullWidth size="small" placeholder="Nhập số điện thoại 1"
                            value={values.phone1 || ''}
                             onChange={(e) => {
                                const onlyNums = e.target.value.replace(/\D/g, '');
                                handleFieldChange('phone1', onlyNums);
                            }}
                            error={!!values.phone1 && !/^0\d{9,10}$/.test(values.phone1)}
                            helperText={values.phone1 && !/^0\d{9,10}$/.test(values.phone1) ? 'Số điện thoại không hợp lệ' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <label>Điện thoại 2</label>
                        <TextField
                            fullWidth size="small" placeholder="Nhập số điện thoại 2"
                            value={values.phone2 || ''}
                             onChange={(e) => {
                                const onlyNums = e.target.value.replace(/\D/g, '');
                                handleFieldChange('phone2', onlyNums);
                            }}
                            error={!!values.phone2 && !/^0\d{9,10}$/.test(values.phone2)}
                            helperText={values.phone2 && !/^0\d{9,10}$/.test(values.phone2) ? 'Số điện thoại không hợp lệ' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <label>Điện thoại 3</label>
                        <TextField
                            fullWidth size="small" placeholder="Nhập số điện thoại 3"
                            value={values.phone3 || ''}
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(/\D/g, '');
                                handleFieldChange('phone3', onlyNums);
                            }}
                            error={!!values.phone3 && !/^0\d{9,10}$/.test(values.phone3)}
                            helperText={values.phone3 && !/^0\d{9,10}$/.test(values.phone3) ? 'Số điện thoại không hợp lệ' : ''}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>

            <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <label>Ngày sinh</label>
                        <TextField
                            type="date"
                            fullWidth size="small"
                            value={values.birthday || ''}
                            onChange={(e) => handleFieldChange('birthday', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <label>Email</label>
                        <TextField
                            fullWidth size="small" placeholder="Nhập email"
                            value={values.email || ''}
                            onChange={(e) => {
                                const value = e.target.value;
                                handleFieldChange('email', value);
                            }}
                            error={Boolean(values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))}
                            helperText={
                                values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
                                ? 'Email không hợp lệ'
                                : ''
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <label>Website</label>
                        <TextField
                            fullWidth size="small" placeholder="Nhập website"
                            value={values.website || ''}
                            onChange={(e) => handleFieldChange('website', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>

            <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <label>Đường / Số nhà</label>
                        <TextField
                            fullWidth size="small" placeholder="Nhập địa chỉ đường"
                            value={values.street || ''}
                            onChange={(e) => handleFieldChange('street', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <label>Thành phố</label>
                        <TextField
                            fullWidth size="small" placeholder="Nhập thành phố"
                            value={values.city || ''}
                            onChange={(e) => handleFieldChange('city', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <label>Tỉnh / Bang</label>
                        <TextField
                            fullWidth size="small" placeholder="Nhập tỉnh / bang"
                            value={values.state || ''}
                            onChange={(e) => handleFieldChange('state', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>

            <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <label>Quốc gia</label>
                        <TextField
                            fullWidth size="small" placeholder="Nhập quốc gia"
                            value={values.country || ''}
                            onChange={(e) => handleFieldChange('country', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <label>Mã bưu điện (Zipcode)</label>
                        <TextField
                            fullWidth size="small" placeholder="Nhập mã bưu điện"
                            value={values.zipcode || ''}
                            onChange={(e) => handleFieldChange('zipcode', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <label>Ghi chú</label>
                        <TextField
                            fullWidth size="small" placeholder="Nhập ghi chú"
                            value={values.notes || ''}
                            onChange={(e) => handleFieldChange('notes', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

export default MeCard;
