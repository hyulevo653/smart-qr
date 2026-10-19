import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TextField, Typography, Grid, FormControlLabel, Radio, IconButton, InputAdornment, Box, FormControl, FormLabel, RadioGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


type WifiValue = {
    ssid?: string;
    security?: 'WEP' | 'WPA' | 'nopass' | '';
    password?: string;
    hidden?: boolean;
};
interface WifiFormProps {
    values: WifiValue;
    onChange: (values: WifiValue) => void;
}

const WifiForm: React.FC<WifiFormProps> = ({ values, onChange }) => {
   const [expanded, setExpanded] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleFieldChange = (field: keyof WifiValue, value: string | boolean) => {
        onChange({ ...values, [field]: value });
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as 'WEP' | 'WPA' | 'nopass' | '';
        handleFieldChange('security', value);
        if (value === 'nopass') {
            handleFieldChange('password', '');
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (_: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded);
    };

    const isNoPassword = values.security === 'nopass';

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
                    <Grid item xs={12}>
                        <label>Tên WiFi (SSID)</label>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Nhập tên WiFi"
                            value={values.ssid || ''}
                            onChange={(e) => handleFieldChange('ssid', e.target.value)}
                            required
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 2 }}>
                    <FormControl fullWidth size="small">
                        <FormLabel>Bảo mật</FormLabel>
                        <RadioGroup
                            value={values.security || ''}
                            onChange={handleRadioChange}
                            row
                        >
                            <FormControlLabel 
                                value="WPA" 
                                control={<Radio />} 
                                label="WPA/WPA2" 
                                // disabled={!values.ssid}
                            />
                            <FormControlLabel 
                                value="WEP" 
                                control={<Radio />} 
                                label="WEP" 
                                // disabled={!values.ssid}
                            />
                            <FormControlLabel 
                                value="nopass" 
                                control={<Radio />} 
                                label="Không mật khẩu" 
                                // disabled={!values.ssid}
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>

                {!isNoPassword && (
                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        <Grid item xs={12}>
                            <label>Mật khẩu WiFi</label>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Nhập mật khẩu WiFi"
                                type={showPassword ? 'text' : 'password'}
                                value={values.security === 'nopass' ? '' : values.password || ''}
                                onChange={(e) => handleFieldChange('password', e.target.value)}
                                disabled={!values.ssid || values.security === '' || values.security === 'nopass'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleTogglePassword}
                                                edge="end"
                                                disabled={!values.ssid || values.security === '' || values.security === 'nopass'}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                )}

                <Grid container spacing={3} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={values.hidden || false}
                                    onChange={(e) => handleFieldChange('hidden', e.target.checked)}
                                    disabled={!values.ssid}
                                />
                            }
                            label="WiFi ẩn (Hidden SSID)"
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

export default WifiForm;