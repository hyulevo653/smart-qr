import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Paper, Button, Grid, Divider } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReplayIcon from '@mui/icons-material/Replay';

function CheckoutResult() {
    const navigation = useNavigate();
    const [searchParams] = useSearchParams();

    // Get payment details from URL parameters
    const success = searchParams.get('success') || 'false';
    const transactionCode = searchParams.get('transactionCode') || 'N/A';
    const errorCode = searchParams.get('errorCode') || 'unknown';

    const isSuccess = success === 'true';

    const handleRetryPayment = () => {
        // In a real app, this would redirect to the payment page
        navigation('/checkout');
    };

    const handleGoHome = () => {
        // Navigate to home page
        window.location.replace('/');
    };

    return (
        <Container maxWidth="md" sx={{ py: 18 }}>
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: 2,
                    border: isSuccess ? '1px solid #4caf50' : '1px solid #f44336',
                    transition: 'all 0.3s ease'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mb: 4
                    }}
                >
                    {isSuccess ? (
                        <CheckCircleOutlineIcon color="success" sx={{ fontSize: { xs: 60, md: 80 }, mb: 2 }} aria-hidden="true" />
                    ) : (
                        <ErrorOutlineIcon color="error" sx={{ fontSize: { xs: 60, md: 80 }, mb: 2 }} aria-hidden="true" />
                    )}

                    <Typography
                        variant="h4"
                        component="h1"
                        color={isSuccess ? 'success.main' : 'error.main'}
                        fontWeight="bold"
                        textAlign="center"
                        sx={{ mb: 1 }}
                    >
                        {isSuccess ? 'Payment Successful' : 'Payment Failed'}
                    </Typography>

                    <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ maxWidth: '80%' }}>
                        {isSuccess
                            ? 'Your payment has been processed successfully. Thank you for your purchase!'
                            : `We couldn't process your payment. Error code: ${errorCode}`}
                    </Typography>
                </Box>

                {isSuccess && (
                    <Box sx={{ my: 3 }}>
                        <Divider sx={{ my: 2 }} />

                        <Grid container spacing={2} sx={{ px: { xs: 1, md: 4 } }}>
                            <Grid item xs={6}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Transaction order
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" fontWeight="medium" textAlign="right">
                                    {transactionCode}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 2 }} />
                    </Box>
                )}

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'center',
                        gap: 2,
                        mt: 4
                    }}
                >
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleGoHome}
                        fullWidth={false}
                        sx={{
                            minWidth: '140px',
                            py: 1.5,
                            borderRadius: 2
                        }}
                    >
                        {'Back to Home'}
                    </Button>

                    {!isSuccess && (
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<ReplayIcon />}
                            onClick={handleRetryPayment}
                            fullWidth={false}
                            sx={{
                                minWidth: '140px',
                                py: 1.5,
                                borderRadius: 2
                            }}
                        >
                            {'Try Again'}
                        </Button>
                    )}
                </Box>
            </Paper>
        </Container>
    );
}

export default CheckoutResult;
