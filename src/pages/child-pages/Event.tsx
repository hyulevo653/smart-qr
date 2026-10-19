import React, { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Typography,
    Grid,
    FormControlLabel,
    Checkbox,
    Box,
    Paper,
    Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import NotesIcon from '@mui/icons-material/Notes';

type EventFormProps = {
    values: {
        eventTitle?: string;
        eventLocation?: string;
        startDate?: string;
        startTime?: string;
        endDate?: string;
        endTime?: string;
        allDay?: boolean;
        eventDescription?: string;
        [key: string]: any;
    };
    onChange: (values: {
        eventTitle?: string;
        eventLocation?: string;
        startDate?: string;
        startTime?: string;
        endDate?: string;
        endTime?: string;
        allDay?: boolean;
        eventDescription?: string;
        [key: string]: any;
    }) => void;
};

const EventForm: React.FC<EventFormProps> = ({ values, onChange }) => {
    const [expanded, setExpanded] = useState<boolean>(true);

    const handleFieldChange = (field: string, value: any) => {
        onChange({ ...values, [field]: value });
    };

    const handleChange = (_: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded);
    };

    const isAllDay = Boolean(values.allDay);

    const isDateInvalid = Boolean(
        values.startDate &&
        values.endDate &&
        values.endDate < values.startDate
    );

    const isTimeInvalid = Boolean(
        !isAllDay &&
        values.startDate &&
        values.endDate &&
        values.startDate === values.endDate &&
        values.startTime &&
        values.endTime &&
        values.endTime < values.startTime
    );

    const hasAnyContent = Boolean(
        values.eventTitle ||
        values.eventLocation ||
        values.startDate ||
        values.eventDescription
    );

    const formatDisplayDate = (d?: string) => {
        if (!d) return '';
        const parts = d.split('-');
        if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
        return d;
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
                    NHẬP NỘI DUNG SỰ KIỆN
                </Typography>
            </AccordionSummary>

            <AccordionDetails>
                <Grid container spacing={2}>
                    {/* Tiêu đề sự kiện */}
                    <Grid item xs={12} md={7}>
                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, color: '#333' }}>
                            Tên sự kiện / Tiêu đề <span style={{ color: 'red' }}>*</span>
                        </label>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Ví dụ: Hội thảo Ra mắt Sản phẩm, Tiệc tất niên..."
                            value={values.eventTitle || ''}
                            onChange={(e) => handleFieldChange('eventTitle', e.target.value)}
                        />
                    </Grid>

                    {/* Địa điểm sự kiện */}
                    <Grid item xs={12} md={5}>
                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, color: '#333' }}>
                            Địa điểm (Tùy chọn)
                        </label>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Ví dụ: Tầng 5 Keangnam, hoặc Link họp online"
                            value={values.eventLocation || ''}
                            onChange={(e) => handleFieldChange('eventLocation', e.target.value)}
                        />
                    </Grid>

                    {/* Section Thời gian */}
                    <Grid item xs={12}>
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                backgroundColor: '#FAFAFA',
                                borderColor: '#E5E7EB'
                            }}
                        >
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5} flexWrap="wrap" gap={1}>
                                <Typography variant="subtitle2" fontWeight={600} color="#1E293B" sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                    <AccessTimeIcon sx={{ fontSize: 18, color: '#00A64F' }} />
                                    Thời gian diễn ra
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={isAllDay}
                                            onChange={(e) => handleFieldChange('allDay', e.target.checked)}
                                            sx={{
                                                color: '#00A64F',
                                                '&.Mui-checked': {
                                                    color: '#00A64F'
                                                }
                                            }}
                                        />
                                    }
                                    label={<Typography variant="body2" fontWeight={500}>Sự kiện cả ngày</Typography>}
                                    sx={{ m: 0 }}
                                />
                            </Box>

                            <Grid container spacing={2}>
                                {/* Khung Bắt đầu */}
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ p: 1.5, bgcolor: '#fff', borderRadius: 1.5, border: '1px solid #E2E8F0' }}>
                                        <Typography variant="caption" fontWeight={600} color="#00A64F" sx={{ display: 'block', mb: 1 }}>
                                            BẮT ĐẦU
                                        </Typography>
                                        <Grid container spacing={1}>
                                            <Grid item xs={isAllDay ? 12 : 7}>
                                                <label style={{ display: 'block', fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>
                                                    Ngày bắt đầu
                                                </label>
                                                <TextField
                                                    type="date"
                                                    fullWidth
                                                    size="small"
                                                    value={values.startDate || ''}
                                                    onChange={(e) => handleFieldChange('startDate', e.target.value)}
                                                    InputLabelProps={{ shrink: true }}
                                                />
                                            </Grid>
                                            {!isAllDay && (
                                                <Grid item xs={5}>
                                                    <label style={{ display: 'block', fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>
                                                        Giờ bắt đầu
                                                    </label>
                                                    <TextField
                                                        type="time"
                                                        fullWidth
                                                        size="small"
                                                        value={values.startTime || ''}
                                                        onChange={(e) => handleFieldChange('startTime', e.target.value)}
                                                        InputLabelProps={{ shrink: true }}
                                                    />
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Box>
                                </Grid>

                                {/* Khung Kết thúc */}
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ p: 1.5, bgcolor: '#fff', borderRadius: 1.5, border: '1px solid #E2E8F0' }}>
                                        <Typography variant="caption" fontWeight={600} color="#64748B" sx={{ display: 'block', mb: 1 }}>
                                            KẾT THÚC (TÙY CHỌN)
                                        </Typography>
                                        <Grid container spacing={1}>
                                            <Grid item xs={isAllDay ? 12 : 7}>
                                                <label style={{ display: 'block', fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>
                                                    Ngày kết thúc
                                                </label>
                                                <TextField
                                                    type="date"
                                                    fullWidth
                                                    size="small"
                                                    value={values.endDate || ''}
                                                    onChange={(e) => handleFieldChange('endDate', e.target.value)}
                                                    InputLabelProps={{ shrink: true }}
                                                    error={isDateInvalid}
                                                    helperText={isDateInvalid ? 'Ngày kết thúc phải sau ngày bắt đầu' : ''}
                                                />
                                            </Grid>
                                            {!isAllDay && (
                                                <Grid item xs={5}>
                                                    <label style={{ display: 'block', fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>
                                                        Giờ kết thúc
                                                    </label>
                                                    <TextField
                                                        type="time"
                                                        fullWidth
                                                        size="small"
                                                        value={values.endTime || ''}
                                                        onChange={(e) => handleFieldChange('endTime', e.target.value)}
                                                        InputLabelProps={{ shrink: true }}
                                                        error={isTimeInvalid}
                                                        helperText={isTimeInvalid ? 'Giờ sau giờ bắt đầu' : ''}
                                                    />
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Mô tả / Ghi chú */}
                    <Grid item xs={12}>
                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, color: '#333' }}>
                            Mô tả / Ghi chú (Tùy chọn)
                        </label>
                        <TextField
                            fullWidth
                            size="small"
                            multiline
                            minRows={2}
                            placeholder="Nhập ghi chú ngắn gọn, lịch trình hoặc người liên hệ..."
                            value={values.eventDescription || ''}
                            onChange={(e) => handleFieldChange('eventDescription', e.target.value)}
                        />
                    </Grid>

                    {/* Bản tóm tắt hiển thị khi quét mã */}
                    {hasAnyContent && (
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    mt: 1,
                                    p: 1.5,
                                    borderRadius: 2,
                                    bgcolor: '#F4FBF7',
                                    border: '1px solid #C6EAD3',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0.5
                                }}
                            >
                                <Typography variant="caption" fontWeight={700} color="#00A64F" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <EventAvailableIcon sx={{ fontSize: 16 }} />
                                    Xem trước nội dung khi quét mã QR:
                                </Typography>
                                <Divider sx={{ my: 0.5, borderColor: '#D1EFE0' }} />
                                {values.eventTitle && (
                                    <Typography variant="body2" sx={{ color: '#1E293B' }}>
                                        <strong>Tiêu đề:</strong> {values.eventTitle}
                                    </Typography>
                                )}
                                {values.eventLocation && (
                                    <Typography variant="body2" sx={{ color: '#1E293B', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <LocationOnOutlinedIcon sx={{ fontSize: 15, color: '#00A64F' }} />
                                        <strong>Địa điểm:</strong> {values.eventLocation}
                                    </Typography>
                                )}
                                {values.startDate && (
                                    <Typography variant="body2" sx={{ color: '#1E293B' }}>
                                        <strong>Thời gian:</strong>{' '}
                                        {(() => {
                                            const startD = formatDisplayDate(values.startDate);
                                            const endD = values.endDate ? formatDisplayDate(values.endDate) : '';
                                            if (isAllDay) {
                                                return endD && endD !== startD ? `${startD} — Đến ${endD} (Cả ngày)` : `${startD} (Cả ngày)`;
                                            }
                                            if (!endD || endD === startD) {
                                                if (values.startTime && values.endTime) return `${startD} (${values.startTime} - ${values.endTime})`;
                                                if (values.startTime) return `${startD} lúc ${values.startTime}`;
                                                return startD;
                                            }
                                            const startPart = values.startTime ? `${startD} lúc ${values.startTime}` : startD;
                                            const endPart = values.endTime ? `${endD} lúc ${values.endTime}` : endD;
                                            return `${startPart} — Đến ${endPart}`;
                                        })()}
                                    </Typography>
                                )}
                                {values.eventDescription && (
                                    <Typography variant="body2" sx={{ color: '#475569', display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
                                        <NotesIcon sx={{ fontSize: 15, color: '#64748B', mt: 0.3 }} />
                                        <span><strong>Ghi chú:</strong> {values.eventDescription}</span>
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

export default EventForm;
