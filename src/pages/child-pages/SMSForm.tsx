import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TextField, Typography, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type SMSFormProps = {
    values: {
        phone?: string;
        sms?: string;
    };
    onChange: (values: { phone?: string; sms?: string }) => void;
};

const SMSForm: React.FC<SMSFormProps> = ({ values, onChange }) => {
    const [expanded, setExpanded] = useState<boolean>(true);
    const handleFieldChange = (field: keyof typeof values, value: string) => {
        onChange({ ...values, [field]: value });
    };
    const handleChange = (_: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded);
    };

    return (
        <Accordion defaultExpanded sx={{ mb: 2 }} expanded={expanded} onChange={handleChange}>
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
                <label>Số điện thoại của bạn</label>
                <TextField
                    fullWidth
                    placeholder="Nhập số điện thoại"
                    size="small"
                    type="tel"
                    value={values.phone || ''}
                    onChange={(e) => {
                        const onlyNums = e.target.value.replace(/\D/g, '');
                        handleFieldChange('phone', onlyNums);
                    }}
                    error={!!values.phone && !/^0\d{9,10}$/.test(values.phone)}
                    helperText={values.phone && !/^0\d{9,10}$/.test(values.phone) ? 'Số điện thoại không hợp lệ' : ''}
                />
            </AccordionDetails>
            <AccordionDetails>
                <label>Nội dung</label>
                <TextField
                    fullWidth
                    placeholder="Nhập nội dung tin nhắn"
                    size="small"
                    multiline
                    minRows={4}
                    value={values.sms || ''}
                    onChange={(e) => handleFieldChange('sms', e.target.value)}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default SMSForm;
