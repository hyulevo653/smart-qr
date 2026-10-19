import React from 'react';
import { Box, Typography } from '@mui/material';

const Logo = () => {
    return (
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, userSelect: 'none', cursor: 'pointer' }}>
            <Box
                sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #00A64F 0%, #007A3A 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0, 166, 79, 0.28)',
                    color: '#fff',
                    flexShrink: 0
                }}
            >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="white" strokeWidth="2" />
                    <rect x="5.5" y="5.5" width="2" height="2" fill="white" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="white" strokeWidth="2" />
                    <rect x="16.5" y="5.5" width="2" height="2" fill="white" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="white" strokeWidth="2" />
                    <rect x="5.5" y="16.5" width="2" height="2" fill="white" />
                    <rect x="14" y="14" width="3" height="3" rx="0.5" fill="white" />
                    <rect x="18" y="14" width="3" height="3" rx="0.5" fill="white" />
                    <rect x="14" y="18" width="3" height="3" rx="0.5" fill="white" />
                    <rect x="18" y="18" width="3" height="3" rx="0.5" fill="white" />
                </svg>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                    component="span"
                    sx={{
                        fontSize: '24px',
                        fontWeight: 800,
                        letterSpacing: '-0.5px',
                        color: '#2C3437',
                        fontFamily: 'Inter, sans-serif'
                    }}
                >
                    Smart
                </Typography>
                <Typography
                    component="span"
                    sx={{
                        fontSize: '24px',
                        fontWeight: 800,
                        letterSpacing: '-0.5px',
                        color: '#00A64F',
                        fontFamily: 'Inter, sans-serif',
                        ml: 0.2
                    }}
                >
                    QR
                </Typography>
                <Box
                    component="span"
                    sx={{
                        ml: 0.8,
                        px: 0.75,
                        py: 0.15,
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: 700,
                        bgcolor: 'rgba(0, 166, 79, 0.12)',
                        color: '#00A64F',
                        letterSpacing: '0.5px'
                    }}
                >
                    PRO
                </Box>
            </Box>
        </Box>
    );
};

export default Logo;

