import React, { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Typography,
    Grid,
    Box,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type VCardProps = {
    values: {
        firstName?: string;
        lastName?: string;
        company?: string;
        position?: string;
        personalPhone?: string;
        businessPhone?: string;
        phone?: string;
        email?: string;
        website?: string;
        address?: string;
        city?: string;
        country?: string;
        zipcode?: string;
        version?: string;
    };
    onChange: (values: {
        firstName?: string;
        email?: string;
        lastName?: string;
        personalPhone?: string;
        businessPhone?: string;
        phone?: string;
        company?: string;
        website?: string;
        address?: string;
        city?: string;
        country?: string;
        zipCode?: string;
        version?: string;
    }) => void;
};

const VCard: React.FC<VCardProps> = ({ values, onChange }) => {
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
                <Box>
                    <RadioGroup row   value={values.version || "2.0"}  onChange={(e) => handleFieldChange("version", e.target.value)}>
                        {/* Version 1 */}
                        <FormControlLabel
                            value="1.0"
                            control={<Radio />}
                            label={
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography>Version 1</Typography>
                                    {/* {value === '1' && <CheckCircleIcon sx={{ color: '#00A64F', fontSize: 20 }} />} */}
                                </Box>
                            }
                        />

                        {/* Version 2 */}
                        <FormControlLabel
                            value="2.0"
                            control={<Radio />}
                            label={
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography>Version 2</Typography>
                                    {/* {value === '2' && <CheckCircleIcon sx={{ color: '#00A64F', fontSize: 20 }} />} */}
                                </Box>
                            }
                        />
                    </RadioGroup>
                </Box>
            </AccordionDetails>
            <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <label>Họ và tên đệm của bạn</label>
                        <TextField
                            fullWidth
                            placeholder="Nhập họ và tên đệm"
                            size="small"
                            value={values.firstName || ''}
                            onChange={(e) => handleFieldChange('firstName', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <label>Tên của bạn</label>
                        <TextField
                            fullWidth
                            placeholder="Nhập tên"
                            size="small"
                            value={values.lastName || ''}
                            onChange={(e) => handleFieldChange('lastName', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <label>Công ty</label>
                        <TextField
                            fullWidth
                            placeholder="Nhập tên công ty"
                            size="small"
                            value={values.company || ''}
                            onChange={(e) => handleFieldChange('company', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
            <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <label>Chức vụ</label>
                        <TextField
                            fullWidth
                            placeholder="Nhập chức vụ"
                            size="small"
                            value={values.position || ''}
                            onChange={(e) => handleFieldChange('position', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <label>Điện thoại (Công việc)</label>
                        <TextField
                            fullWidth
                            placeholder="Nhập số điện thoại"
                            size="small"
                            value={values.businessPhone || ''}
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(/\D/g, '');
                                handleFieldChange('businessPhone', onlyNums);
                            }}
                            error={!!values.businessPhone && !/^0\d{9,10}$/.test(values.businessPhone)}
                            helperText={values.businessPhone && !/^0\d{9,10}$/.test(values.businessPhone) ? 'Số điện thoại công việc không hợp lệ' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <label>Điện thoại (Cá nhân)</label>
                        <TextField
                            fullWidth
                            placeholder="Nhập số điện thoại"
                            size="small"
                            value={values.personalPhone || ''}
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(/\D/g, '');
                                handleFieldChange('personalPhone', onlyNums);
                            }}
                            error={!!values.personalPhone && !/^0\d{9,10}$/.test(values.personalPhone)}
                            helperText={values.personalPhone && !/^0\d{9,10}$/.test(values.personalPhone) ? 'Số điện thoại cá nhân không hợp lệ' : ''}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
            <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <label>Điện thoại (Di động)</label>
                        <TextField
                            fullWidth
                            placeholder="Nhập số điện thoại"
                            size="small"
                            value={values.phone || ''}
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(/\D/g, '');
                                handleFieldChange('phone', onlyNums);
                            }}
                            error={!!values.phone && !/^0\d{9,10}$/.test(values.phone)}
                            helperText={values.phone && !/^0\d{9,10}$/.test(values.phone) ? 'Số điện thoại không hợp lệ' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <label>Email</label>
                        <TextField
                            fullWidth
                            placeholder="Nhập email"
                            size="small"
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
                            fullWidth
                            placeholder="Nhập website"
                            size="small"
                            value={values.website || ''}
                            onChange={(e) => handleFieldChange('website', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
            <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <label>Địa chỉ</label>
                        <TextField
                            fullWidth
                            placeholder="Nhập địa chỉ"
                            size="small"
                            value={values.address || ''}
                            onChange={(e) => handleFieldChange('address', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <label>Thành phố</label>
                        <TextField
                            fullWidth
                            placeholder="Nhập thành phố"
                            size="small"
                            value={values.city || ''}
                            onChange={(e) => handleFieldChange('city', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <label>Quốc gia</label>
                        <TextField
                            fullWidth
                            placeholder="Nhập quốc gia"
                            size="small"
                            value={values.country || ''}
                            onChange={(e) => handleFieldChange('country', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
            <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <label>Zipcode</label>
                        <TextField
                            fullWidth
                            placeholder="Nhập mã"
                            size="small"
                            value={values.zipcode || ''}
                            onChange={(e) => handleFieldChange('zipcode', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

export default VCard;
