import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TextField, Typography, Grid, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type FacebookFormProps = {
    values: {
        name?: string;
        fbUrl?: string;
        shareUrl?: string;
        type?: string;
        body?: string;
    };
    onChange: (values: { name?: string; fbUrl?: string; shareUrl?: string; body?: string;type?: string }) => void;
};

const FacebookForm: React.FC<FacebookFormProps> = ({ values, onChange }) => {
    const [expanded, setExpanded] = useState<boolean>(true);
    const handleFieldChange = (field: keyof typeof values, value: string) => {
        onChange({ ...values, [field]: value });
    };
    const handleChange = (_: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded);
    };
    useEffect(() => {
        if (!values.type) {
            onChange({ ...values, type: 'url' });
        }
    }, []);

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
                <Box>
                    <RadioGroup row   value={values.type || "url"}  onChange={(e) => handleFieldChange("type", e.target.value)}>
                        {/* Version 1 */}
                        <FormControlLabel
                            value="url"
                            control={<Radio />}
                            label={
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography>Facebook URL</Typography>
                                </Box>
                            }
                        />

                        {/* Version 2 */}
                        <FormControlLabel
                            value="share"
                            control={<Radio />}
                            label={
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography>Share URL</Typography>
                                </Box>
                            }
                        />
                    </RadioGroup>
                </Box>
            </AccordionDetails>
             {values.type === 'url' && (
                <AccordionDetails>
                    <label>Link facebook của bạn</label>
                    <TextField
                        fullWidth
                        placeholder="https://www.facebook.com/"
                        size="small"
                        value={values.fbUrl || ''}
                        onChange={(e) => handleFieldChange('fbUrl', e.target.value)}
                    />
                </AccordionDetails>
            )}
            {values.type === 'share' && (
                <AccordionDetails>
                    <label>Chia sẻ link facebook của bạn</label>
                    <TextField
                        fullWidth
                        placeholder="https://"
                        size="small"
                        value={values.shareUrl || ''}
                        onChange={(e) => handleFieldChange('shareUrl', e.target.value)}
                    />
                </AccordionDetails>
            )}
        </Accordion>
    );
};

export default FacebookForm;
