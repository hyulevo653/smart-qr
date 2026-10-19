import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TextField, Typography, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type EmailFormProps = {
    values: {
        name?: string;
        email?: string;
        subject?: string;
        body?: string;
    };
    onChange: (values: { name?: string; email?: string; subject?: string; body?: string }) => void;
};

const EmailForm: React.FC<EmailFormProps> = ({ values, onChange }) => {
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
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <label>Email của bạn</label>
                        <TextField
                            fullWidth
                            placeholder="example@email.com"
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
                    <Grid item xs={6}>
                        <label>Tiêu đề email</label>
                        <TextField
                            fullWidth
                            placeholder="Nhập tiêu đề"
                            size="small"
                            value={values.subject || ''}
                            onChange={(e) => handleFieldChange('subject', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
            <AccordionDetails>
                <label>Nội dung</label>
                <TextField
                    fullWidth
                    placeholder="Nhập nội dung email"
                    size="small"
                    multiline      
                    minRows={2}     
                    value={values.body || ''}
                    onChange={(e) => handleFieldChange('body', e.target.value)}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default EmailForm;
