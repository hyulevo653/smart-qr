import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface URLFormProps {
    values: {
        name?: string;
        url?: string;
        [key: string]: any;
    };
    onChange: (values: { name?: string; url?: string; [key: string]: any }) => void;
}

const URLForm: React.FC<URLFormProps> = ({ values, onChange }) => {
    const [expanded, setExpanded] = useState<boolean>(true);
    const handleFieldChange = (field: string, value: string) => {
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
                <label>URL</label>
                <TextField
                    fullWidth
                    placeholder="https://smartqr.vn/"
                    size="small"
                    value={values?.url || ''}
                    onChange={(e) => handleFieldChange('url', e.target.value)}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default URLForm;
