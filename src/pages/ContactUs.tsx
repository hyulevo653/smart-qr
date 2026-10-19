import React, { useState, useEffect, useContext } from 'react';
import { axiosClient } from '@/api/axios-client';
import { v4 as uuidv4 } from 'uuid';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    Grid,
    IconButton,
    Paper,
    Container
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContext } from '@/contexts/toast-context';

// Simple email/phone validators used for client-side validation
const isEmail = (v: string) => /\S+@\S+\.\S+/.test(v);
const isPhone = (v: string) => /^\+?[0-9\s\-()]{7,}$/.test(v);

const ContactUs: React.FC = () => {
    const { showToast } = useContext(ToastContext)!;
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [captchaSvg, setCaptchaSvg] = useState<string | null>(null);
    const [captchaLoading, setCaptchaLoading] = useState(false);
    const [captCode, setCaptCode] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const resetForm = () => {
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
        setCaptcha('');
        setCaptchaSvg(null);
        setCaptCode(null);
        setErrors({});
    };

    const validate = () => {
        const e: Record<string, string> = {};
        if (!name.trim()) e.name = 'Vui lòng nhập họ tên';
        if (!phone.trim()) e.phone = 'Vui lòng nhập số điện thoại';
        else if (!isPhone(phone)) e.phone = 'Số điện thoại không hợp lệ';
        if (!email.trim()) e.email = 'Vui lòng nhập email';
        else if (!isEmail(email)) e.email = 'Email không hợp lệ';
        if (!message.trim()) e.message = 'Vui lòng nhập nội dung';
        if (!captcha.trim()) e.captcha = 'Vui lòng nhập mã kiểm tra';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const onSubmit = async () => {
        if (!validate()) return;
        setSubmitting(true);
        try {
            // Mock submit: replace with actual API call (e.g. api/contact.ts)
            const payload = {
                name,
                phone,
                email,
                message,
                captcha
            };
            console.log('Submitting contact payload', payload);

            await axiosClient.post('/contacts', payload, {
                responseType: 'text'
            });
            // show simple success state then close
            showToast('Gửi liên hệ thành công, chúng tôi sẽ phản hồi trong thời gian sớm nhất.', 'success');
            resetForm();
            setOpen(false);
        } catch (err) {
            // For now, set a generic error
            console.error('Failed to submit contact', err);
            showToast('Gửi liên hệ thất bại, vui lòng thử lại sau.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const loadCaptcha = async () => {
        setCaptchaLoading(true);
        try {
            const code = uuidv4();
            setCaptCode(code);
            const svg = await axiosClient.get('/captcha', {
                responseType: 'text',
                params: { captCode: code }
            });
            setCaptchaSvg(typeof svg === 'string' ? svg : String(svg));
        } catch (err) {
            console.error('Failed to load captcha', err);
            setCaptchaSvg(null);
        } finally {
            setCaptchaLoading(false);
        }
    };

    // Load captcha when dialog opens
    useEffect(() => {
        if (open) loadCaptcha();
    }, [open]);

    return (
            <Box sx={{ p: { xs: 2, md: 2,bgcolor: '#E8E8E880' } }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={7}>
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{
                                fontSize: '28px',
                                fontWeight: 600,
                                fontFamily: 'Inter'
                            }}
                        >
                            Chúng tôi đang sẵn sàng hỗ trợ và tư vấn
                        </Typography>
                        <Typography sx={{ mb: 2,fontWeight:500,fontSize:'16px',color:'#363F3E' }}>
                            Rất cảm ơn sự quan tâm của bạn đến sản phẩm SmartQR. Chúng tôi sẽ liên hệ lại bạn trong thời gian sớm nhất.
                        </Typography>
                        <Button variant="contained" sx={{ backgroundColor: '#1C8263',padding: '14px 28px',fontFamily: 'Inter',fontSize:'15px',fontWeight: 600 }} onClick={() => setOpen(true)}>
                            Liên hệ ngay
                        </Button>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Paper variant="outlined" sx={{ p: 2,bgcolor: '#fff' }}>
                            <Typography sx={{fontSize: '18px',fontWeight: 700, fontFamily: 'Inter',color: '#363F3E'}}>
                                CÔNG TY CỔ PHẦN CÔNG NGHỆ SMARTQR VIỆT NAM
                            </Typography>
                            <Typography sx={{fontFamily: 'Inter',fontSize: '14px',fontWeight: 400}}>Mã số thuế: 0109886688</Typography>
                            <Typography sx={{fontFamily: 'Inter',fontSize: '14px',fontWeight: 400}}>Địa chỉ: Tầng 12, Tòa nhà Keangnam Landmark 72, Đường Phạm Hùng, Nam Từ Liêm, Hà Nội</Typography>
                            <Typography sx={{fontFamily: 'Inter',fontSize: '14px',fontWeight: 400}}>Hotline: 1900 6868 - (+84) 24 7300 8899</Typography>
                            <Typography sx={{fontFamily: 'Inter',fontSize: '14px',fontWeight: 400}}>Email: support@smartqr.vn</Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Dialog fullWidth maxWidth="sm" open={open} onClose={() => setOpen(false)}>
                    <DialogTitle sx={{ m: 0, p: 2 }}>
                        <Typography variant="h6" component="div">
                            Liên hệ
                        </Typography>
                        <IconButton aria-label="close" onClick={() => setOpen(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                        {errors.form && (
                            <Typography color="error" sx={{ mb: 1 }}>
                                {errors.form}
                            </Typography>
                        )}
                        <Grid container spacing={2} sx={{ mt: 0 }}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Họ tên"
                                    placeholder="Nhập họ tên"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Số điện thoại"
                                    placeholder="Nhập số điện thoại"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    placeholder="Nhập email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    label="Tin nhắn"
                                    placeholder="Nhập nội dung"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    error={!!errors.message}
                                    helperText={errors.message}
                                />
                            </Grid>

                            <Grid item xs={8} sm={9}>
                                <TextField
                                    fullWidth
                                    label="Nhập mã kiểm tra"
                                    placeholder="Nhập mã kiểm tra"
                                    value={captcha}
                                    onChange={(e) => setCaptcha(e.target.value)}
                                    error={!!errors.captcha}
                                    helperText={errors.captcha}
                                />
                            </Grid>
                            <Grid item xs={4} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        width: '100%',
                                        minHeight: 40,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        p: 0.5
                                    }}
                                >
                                    {captchaLoading ? (
                                        <Typography variant="body2">Đang tải...</Typography>
                                    ) : captchaSvg ? (
                                        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Box sx={{ flex: 1, mr: 1 }} dangerouslySetInnerHTML={{ __html: captchaSvg }} />
                                        </Box>
                                    ) : (
                                        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Typography variant="body2">Không tải được mã</Typography>
                                        </Box>
                                    )}
                                </Paper>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button
                            onClick={() => {
                                resetForm();
                                setOpen(false);
                            }}
                            disabled={submitting}
                        >
                            Hủy
                        </Button>
                        <Button variant="contained" color="success" onClick={onSubmit} disabled={submitting}>
                            Gửi yêu cầu
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
    );
};

export default ContactUs;
