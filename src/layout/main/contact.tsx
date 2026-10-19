import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRef } from 'react';

import Captcha from '@/ui-component/captcha';
import { contactApi } from '@/api';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import bgImage from '@/assets/images/landing/bg-contact.jpg';

const schema = z.object({
    name: z.string().min(4, 'Tên quá ngắn'),
    email: z.string().email('Email không hợp lệ'),
    phoneNum: z.string().regex(/(84|0)(3|5|7|8|9)+([0-9]{8})\b/, 'Số điện thoại không hợp lệ'),
    message: z.string().min(5, 'Nội dung quá ngắn'),
    captvalue: z.string()
});

const defaultValues = {
    name: '',
    email: '',
    phoneNum: '',
    message: '',
    captvalue: ''
};

export default function Contact() {
    const theme = useTheme();
    const captchaRef = useRef({ refresh: () => {} });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues,
        resolver: zodResolver(schema),
        mode: 'onTouched'
    });

    const onSubmit = async (data: z.infer<typeof schema>) => {
        try {
            await contactApi.sendContact(data);
            reset();
            captchaRef.current.refresh?.();
            showSuccessMessage('Đã gửi thành công, chúng tôi sẽ liên hệ sớm nhất!');
        } catch (e) {
            showErrorMessage('Gửi không thành công. Vui lòng thử lại.');
        }
    };

    return (
        <Box
            id="contact-sales"
            sx={{
                backgroundColor: '#F8FAFC',
                py: { xs: 6, md: 10 }
            }}
        >
            <Container>
                <Box
                    sx={{
                       background: `url(${bgImage}) center center / cover no-repeat`,
                        borderRadius: '16px',
                        p: { xs: 3, md: 6 },
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 4
                    }}
                >
                    {/* Left Text */}
                    <Box sx={{ flex: 1,maxWidth: '600px' }}>
                        <Typography
                            variant="h4"
                            sx={{
                                color: '#fff',
                                   fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 700,
                                fontSize: { xs: '28px', md: '36px' },
                                mb: 1,
                            }}
                        >
                            Liên Hệ Ngay
                        </Typography>
                        <Typography
                            variant="h4"
                            sx={{
                                color: '#fff',
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 700,
                                fontSize: { xs: '28px', md: '36px' },
                                mb: 2
                            }}
                        >
                            Nhận <span style={{ color: '#FF960F' }}>Ưu Đãi</span> Triển Khai
                        </Typography>
                        <Typography sx={{ color: '#fff', mb: 1,fontSize: { xs: '16px', md: '18px' } }}>
                            Bắt đầu tích hợp authGate.One ngay hôm nay!
                        </Typography>
                        <Typography sx={{ color: '#fff',fontSize: { xs: '16px', md: '18px' } }}>
                            Để lại thông tin, đội ngũ chuyên gia sẽ hỗ trợ tư vấn miễn phí và đề xuất giải pháp tối ưu nhất
                            cho doanh nghiệp bạn.
                        </Typography>
                    </Box>

                    {/* Right Form */}
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            p: 3,
                            width: { xs: '100%', md: '420px' },
                            boxShadow: '0 8px 20px rgba(0,0,0,0.05)'
                        }}
                    >
                        <Stack spacing={2}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        label="Nhập họ tên"
                                        {...field}
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                        fullWidth
                                    />
                                )}
                            />
                            <Controller
                                name="phoneNum"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        label="Số điện thoại"
                                        {...field}
                                        error={!!errors.phoneNum}
                                        helperText={errors.phoneNum?.message}
                                        fullWidth
                                    />
                                )}
                            />
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        label="Email"
                                        {...field}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        fullWidth
                                    />
                                )}
                            />
                            <Controller
                                name="message"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        label="Nhập yêu cầu của bạn"
                                        {...field}
                                        error={!!errors.message}
                                        helperText={errors.message?.message}
                                        multiline
                                        rows={4}
                                        fullWidth
                                    />
                                )}
                            />

                         <Stack direction="row" alignItems="center" spacing={1}>
                            <Captcha ref={captchaRef} />
                            <Controller
                                name="captvalue"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        placeholder="Captcha"
                                        {...field}
                                        error={!!errors.captvalue}
                                        helperText={errors.captvalue?.message}
                                        sx={{ flex: 1 }}
                                    />
                                )}
                            />
                        </Stack>
                            <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                                Gửi
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
