import React, { useEffect, useState } from 'react';
import {
    Box,
    Grid,
    Typography,
    Button,
    Slider,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Tabs,
    Tab,
    TextField,
    InputAdornment,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { QRCodeCanvas } from 'qrcode.react';
import URLForm from './child-pages/UrlForm';
import EmailForm from './child-pages/EmailForm';
import TextForm from './child-pages/TextForm';
import PhoneForm from './child-pages/PhoneForm';
import SMSForm from './child-pages/SMSForm';
import { useSnackbar } from 'notistack';
import { qrApi } from '@/api/qr';
import VCard from './child-pages/VCard';
import { LocationState, QRValue } from '@/types/qr';
import { useLocation } from 'react-router-dom';
import FacebookForm from './child-pages/Facebook';
import { SketchPicker } from 'react-color';
import { jsPDF } from 'jspdf';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import LocationForm from './child-pages/Location';
import MeCard from './child-pages/MeCard';
import WifiForm from './child-pages/Wifi';
import TwitterForm from './child-pages/Twitter';
import YoutubeForm from './child-pages/Youtube';
import TiktokForm from './child-pages/Tiktok';
import UploadImage from '../assets/images/nologo.svg';
import BitcoinForm from './child-pages/Bitcoin';
import EventForm from './child-pages/Event';
import phone from '../assets/images/phone.png';
import item1 from '../assets/images/item1.svg';
import item2 from '../assets/images/item2.svg';
import item3 from '../assets/images/item3.svg';
import item4 from '../assets/images/item4.svg';
import Footer from '@/layout/main/footer';
import { useTemplate } from '@/contexts/template-context';

export const ColorPicker = ({ title, color, setColor }: { title: string; color: string; setColor: (value: string) => void }) => {
    const [show, setShow] = useState(false);

    const handleChangeComplete = (color: any) => {
        console.log(color);
        setColor(color.hex);
    };

    return (
        <Box flex={1} sx={{ position: 'relative' }}>
            <Typography variant="body2" mb={1}>
                {title}
            </Typography>
            <ClickAwayListener onClickAway={() => setShow(false)}>
                <Box sx={{ position: 'relative' }}>
                    <TextField
                        fullWidth
                        size="small"
                        value={color}
                        onClick={() => setShow(!show)}
                        sx={{
                            '& .MuiInputBase-input': {
                                cursor: 'pointer'
                            }
                        }}
                        InputProps={{
                            readOnly: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Box
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            bgcolor: color,
                                            borderRadius: '4px',
                                            border: '1px solid #ccc'
                                        }}
                                    />
                                </InputAdornment>
                            )
                        }}
                    />

                    {show && (
                        <Box sx={{ position: 'absolute', zIndex: 2, bottom: '50px', left: 0 }}>
                            <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
                        </Box>
                    )}
                </Box>
            </ClickAwayListener>
        </Box>
    );
};

const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const MainContent: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [tab, setTab] = useState(0);
    const [values, setValues] = useState<QRValue>({});
    const [qrValue, setQrValue] = useState('');
    const [quality, setQuality] = useState(1000);
    const [expanded, setExpanded] = useState<string | false>(false);
    const [qrName, setQrName] = useState('');
    const [qrId, setQrId] = useState<number | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const location = useLocation();
    const [qrBgColor, setQrBgColor] = useState('#ffffff');
    const [qrColor, setQrColor] = useState('#000000');
    const [tempQrColor, setTempQrColor] = useState('#000000'); 
    const [tempQrBgColor, setTempQrBgColor] = useState('#ffffff');
    const [logoFile, setLogoFile] = useState<{ url: string; width: number; height: number } | null>(null);
    const [tempLogoFile, setTempLogoFile] = useState<{ url: string; width: number; height: number } | null>(null); 
    const { selectedTemplate, clearTemplate } = useTemplate();

    const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const typeToTab: Record<string, number> = {
        url: 0,
        text: 1,
        email: 2,
        phone: 3,
        sms: 4,
        vcard: 5,
        mecard: 6,
        facebook: 7,
        twitter: 8,
        youtube: 9,
        tiktok: 10,
        location: 11,
        wifi: 12,
        event: 13,
        bitcoin: 14
    };

    const generateQRValue = (tab: number, values: QRValue): string => {
        let newQRValue = '';

        switch (tab) {
            case 0:
                newQRValue = values.url || '';
                break;
            case 1:
                newQRValue = values.content || '';
                break;
            case 2:
                const email = values.email || '';
                const subject = values.subject ? encodeURIComponent(values.subject).replace(/%20/g, ' ') : '';
                const body = values.body ? encodeURIComponent(values.body).replace(/%20/g, ' ') : '';
                newQRValue = `mailto:${email}${subject || body ? '?' : ''}${subject ? `subject=${subject}` : ''}${
                    subject && body ? '&' : ''
                }${body ? `body=${body}` : ''}`;
                break;
            case 3:
                newQRValue = `tel:${values.phone || ''}`;
                break;
            case 4:
                const phone = values.phone || '';
                const sms = values.sms ? encodeURIComponent(values.sms).replace(/%20/g, ' ') : '';
                newQRValue = `SMSTO:${phone}:${sms}`;
                break;
            case 5: {
                const version = values.version || '2.0';
                const firstName = values.firstName || '';
                const lastName = values.lastName || '';
                const fullName = `${firstName} ${lastName}`.trim();
                const company = values.company || '';
                const position = values.position || '';
                const website = values.website || '';
                const email = values.email || '';
                const businessPhone = values.businessPhone || '';
                const personalPhone = values.personalPhone || '';
                const mobilePhone = values.phone || '';
                const address = values.address || '';
                const city = values.city || '';
                const country = values.country || '';
                const zipcode = values.zipcode || '';

                newQRValue = [
                    'BEGIN:VCARD',
                    `VERSION:${version}`,
                    `N:${lastName};${firstName}`,
                    `FN:${fullName}`,
                    position && `TITLE:${position}`,
                    company && `ORG:${company}`,
                    website && `URL:${website}`,
                    email && `EMAIL;TYPE=INTERNET:${email}`,
                    businessPhone && `TEL;TYPE=voice,work,pref:${businessPhone}`,
                    personalPhone && `TEL;TYPE=voice,home,pref:${personalPhone}`,
                    mobilePhone && `TEL;TYPE=voice,cell,pref:${mobilePhone}`,
                    (address || city || zipcode || country) && `ADR:;;${address};${city};;${zipcode};${country}`,
                    'END:VCARD'
                ]
                    .filter(Boolean)
                    .join('\n');
                break;
            }
            case 6: {
                const firstName = values.firstName || '';
                const lastName = values.lastName || '';
                const nickName = values.nickName || '';
                const phone1 = values.phone1 || '';
                const phone2 = values.phone2 || '';
                const phone3 = values.phone3 || '';
                const email = values.email || '';
                const website = values.website || '';
                const birthday = values.birthday || '';
                const street = values.street || '';
                const city = values.city || '';
                const state = values.state || '';
                const country = values.country || '';
                const zipcode = values.zipcode || '';
                const notes = values.notes || '';

                newQRValue = [
                    'MECARD:',
                    (lastName || firstName) && `N:${lastName}${firstName ? ',' + firstName : ''}`,
                    nickName && `NICKNAME:${nickName}`,
                    phone1 && `TEL:${phone1}`,
                    phone2 && `TEL:${phone2}`,
                    phone3 && `TEL:${phone3}`,
                    email && `EMAIL:${email}`,
                    website && `URL:${website}`,
                    birthday && `BDAY:${birthday.replace(/-/g, '')}`,
                    (street || city || state || zipcode || country) && `ADR:${street};${city};${state};${zipcode};${country}`,
                    notes && `NOTE:${notes}`,
                    ''
                ]
                    .filter(Boolean)
                    .join(';');
                break;
            }
            case 7: {
                if (values.type === 'url') {
                    newQRValue = values.fbUrl?.trim() || '';
                } else if (values.type === 'share') {
                    const shareUrl = values.shareUrl?.trim() || '';
                    if (shareUrl) {
                        newQRValue = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                    }
                }
                break;
            }
            case 8: {
                if (values.type === 'url') {
                    newQRValue = values.twitterUrl?.trim() || '';
                } else if (values.type === 'share') {
                    const tweetText = values.shareUrl?.trim() || '';
                    if (tweetText) {
                        newQRValue = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
                    }
                }
                break;
            }
            case 9: {
                const youtubeUrl = values.url?.trim() || '';
                newQRValue = youtubeUrl;
                break;
            }
            case 10: {
                if (values.type === 'url') {
                    newQRValue = values.tiktokUrl?.trim() || '';
                } else if (values.type === 'share') {
                    const videoUrl = values.videoUrl?.trim() || '';
                    if (videoUrl) {
                        const videoIdMatch = videoUrl.match(/\/video\/(\d+)/);
                        const videoId = videoIdMatch ? videoIdMatch[1] : '';
                        if (videoId) {
                            newQRValue = `https://www.tiktok.com/share/video/${videoId}`;
                        } else {
                            newQRValue = videoUrl;
                        }
                    }
                }
                break;
            }
            case 11: {
                const latitude = values.latitude?.trim();
                const longitude = values.longitude?.trim();
                const placeName = values.placeName?.trim();

                if (latitude && longitude) {
                    if (placeName) {
                        const encodedName = encodeURIComponent(placeName);
                        newQRValue = `https://www.google.com/maps?q=${latitude},${longitude}(${encodedName})`;
                    } else {
                        newQRValue = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
                    }
                }
                break;
            }
            case 12: {
                const ssid = values.ssid || '';
                const security = values.security === 'nopass' ? 'nopass' : values.security || '';
                const password = values.password || '';
                const hidden = values.hidden ? 'true' : 'false';
                const encodedSsid = encodeURIComponent(ssid).replace(/%20/g, '+');
                const encodedPassword = encodeURIComponent(password).replace(/%20/g, '+');

                newQRValue = `WIFI:S:${encodedSsid};T:${security};P:${encodedPassword};H:${hidden};;`;
                break;
            }
            case 13: {
                const summary = (values.eventTitle || '').trim();
                const location = (values.eventLocation || '').trim();
                const description = (values.eventDescription || '').trim();
                const startDate = (values.startDate || '').trim();
                const startTime = (values.startTime || '').trim();
                const endDate = (values.endDate || '').trim();
                const endTime = (values.endTime || '').trim();
                const allDay = Boolean(values.allDay);

                if (!summary && !startDate && !location && !description) {
                    newQRValue = '';
                    break;
                }

                const formatDisplayDate = (d?: string) => {
                    if (!d) return '';
                    const parts = d.split('-');
                    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
                    return d;
                };

                const lines: string[] = [];

                if (summary) {
                    lines.push(`Tiêu đề: ${summary}`);
                }

                if (location) {
                    lines.push(`Địa điểm: ${location}`);
                }

                if (startDate) {
                    const startD = formatDisplayDate(startDate);
                    const endD = endDate ? formatDisplayDate(endDate) : '';

                    let timeStr = '';
                    if (allDay) {
                        if (endD && endD !== startD) {
                            timeStr = `${startD} — Đến ${endD} (Cả ngày)`;
                        } else {
                            timeStr = `${startD} (Cả ngày)`;
                        }
                    } else {
                        if (!endD || endD === startD) {
                            if (startTime && endTime) {
                                timeStr = `${startD} (${startTime} - ${endTime})`;
                            } else if (startTime) {
                                timeStr = `${startD} lúc ${startTime}`;
                            } else {
                                timeStr = startD;
                            }
                        } else {
                            const startPart = startTime ? `${startD} lúc ${startTime}` : startD;
                            const endPart = endTime ? `${endD} lúc ${endTime}` : endD;
                            timeStr = `${startPart} — Đến ${endPart}`;
                        }
                    }
                    lines.push(`Thời gian: ${timeStr}`);
                }

                if (description) {
                    lines.push(`Ghi chú: ${description}`);
                }

                newQRValue = lines.join('\n');
                break;
            }
            case 14: {
                const cryptoType = values.cryptoType || 'bitcoin';
                const address = values.address?.trim() || '';
                if (!address) {
                    newQRValue = '';
                    break;
                }

                let uriScheme: string;
                if (cryptoType == 'bitcoin') {
                    uriScheme = 'bitcoin';
                } else if (cryptoType == 'ethereum') {
                    uriScheme = 'ethereum';
                } else {
                    newQRValue = '';
                    break;
                }
                let uri = `${uriScheme}:${address}`;
                const label = values.label?.trim();
                const message = values.message?.trim();
                const amount = values.amount?.trim();

                const params: string[] = [];
                if (label) {
                    params.push(`label=${encodeURIComponent(label)}`);
                }
                if (message) {
                    params.push(`message=${encodeURIComponent(message)}`);
                }
                if (amount) {
                    params.push(`amount=${encodeURIComponent(amount)}`);
                }
                if (params.length > 0) {
                    uri += '?' + params.join('&');
                }
                newQRValue = uri;
                break;
            }
        }

        return newQRValue;
    };

    useEffect(() => {
        const qrData = (location.state as LocationState)?.qrData;
        const templateStyling = (location.state as any)?.templateStyling;
        if (templateStyling) {
            setQrBgColor(templateStyling.qrBgColor || '#ffffff');
            setQrColor(templateStyling.qrColor || '#000000');
            setTempQrBgColor(templateStyling.qrBgColor || '#ffffff');
            setTempQrColor(templateStyling.qrColor || '#000000');

            if (templateStyling.logoImage) {
                const img = new Image();
                img.onload = () => {
                    const { width, height } = calculateLogoSize(img.width, img.height, 370);
                    const newLogo = {
                        url: templateStyling.logoImage,
                        width,
                        height
                    };
                    setLogoFile(newLogo);
                    setTempLogoFile(newLogo);
                };
                img.onerror = () => {
                    console.error('Failed to load logo image');
                    setLogoFile(null);
                    setTempLogoFile(null);
                };
                img.src = templateStyling.logoImage;
            } else {
                setLogoFile(null);
                setTempLogoFile(null);
            }

            window.history.replaceState({}, document.title);
            return;
        }

        if (qrData) {
            setQrId(qrData.id);
            setUserId(qrData.userId);
            setQrName(qrData.name);
            let formatValues = JSON.parse(qrData.format);
            const tabIndex = typeToTab[qrData.type] ?? 0;

            if (tabIndex === 0 && formatValues.content && !formatValues.url) {
                formatValues.url = formatValues.content;
            }
            setQrBgColor(formatValues.bgColor || '#ffffff');
            setQrColor(formatValues.fgColor || '#000000');
            setTempQrBgColor(formatValues.bgColor || '#ffffff');
            setTempQrColor(formatValues.fgColor || '#000000');
            if (formatValues.logoBase64 && formatValues.logoWidth && formatValues.logoHeight) {
                const newLogo = {
                    url: formatValues.logoBase64,
                    width: formatValues.logoWidth,
                    height: formatValues.logoHeight
                };
                setLogoFile(newLogo);
                setTempLogoFile(newLogo);
            } else {
                setLogoFile(null);
                setTempLogoFile(null);
            }

            setValues(formatValues);
            setTab(tabIndex);

            const newQRValue = generateQRValue(tabIndex, formatValues);
            setQrValue(newQRValue);
        }
    }, [location.state]);

    useEffect(() => {
        if (selectedTemplate) {
            setQrBgColor(selectedTemplate.qrBgColor);
            setQrColor(selectedTemplate.qrColor);
            setTempQrBgColor(selectedTemplate.qrBgColor);
            setTempQrColor(selectedTemplate.qrColor);

            if (selectedTemplate.logoImage) {
                const img = new Image();
                img.onload = () => {
                    const { width, height } = calculateLogoSize(img.width, img.height, 370);
                    const newLogo = {
                        url: selectedTemplate.logoImage!,
                        width,
                        height
                    };
                    setLogoFile(newLogo);
                    setTempLogoFile(newLogo);
                };
                img.onerror = () => {
                    console.error('Failed to load logo from context');
                    setLogoFile(null);
                    setTempLogoFile(null);
                };
                img.src = selectedTemplate.logoImage;
            } else {
                setLogoFile(null);
                setTempLogoFile(null);
            }

            clearTemplate();
        }
    }, [selectedTemplate, clearTemplate]);

    const handleGenerateQR = async () => {
        const newQRValue = generateQRValue(tab, values);
        setQrValue(newQRValue);

    
        setQrColor(tempQrColor);
        setQrBgColor(tempQrBgColor);
        setLogoFile(tempLogoFile);

        if (newQRValue) {
            const canvas = document.querySelector('canvas') as HTMLCanvasElement;
            if (!canvas) return;

            const base64Img = canvas.toDataURL('image/png');

            const typeMap: Record<number, string> = {
                0: 'url',
                1: 'text',
                2: 'email',
                3: 'phone',
                4: 'sms',
                5: 'vcard',
                6: 'mecard',
                7: 'facebook',
                8: 'twitter',
                9: 'youtube',
                10: 'tiktok',
                11: 'location',
                12: 'wifi',
                13: 'event',
                14: 'bitcoin'
            };
            const type = typeMap[tab] || 'unknown';

            const filteredFormat = {
                ...values,
                bgColor: tempQrBgColor,
                fgColor: tempQrColor,
                logoBase64: tempLogoFile?.url || '',
                logoWidth: tempLogoFile?.width || 500,
                logoHeight: tempLogoFile?.height || 500
            };

            const payload = {
                url: base64Img,
                name: qrName || 'QR không tên',
                format: JSON.stringify(filteredFormat),
                type,
                date: new Date().toISOString()
            };

            try {
                if (qrId) {
                    const payloadUpdate = {
                        ...payload,
                        id: qrId,
                        userId: Number(userId)
                    };
                    await qrApi.updateQR(payloadUpdate);
                    enqueueSnackbar('Cập nhật QR thành công!', { variant: 'success' });
                } else {
                    try {
                        await qrApi.createQR(payload);
                    } catch (historyErr) {
                        console.warn('Lưu lịch sử không khả dụng (chế độ ẩn đăng nhập):', historyErr);
                    }
                    enqueueSnackbar('Tạo QR thành công!', { variant: 'success' });
                }
            } catch (err) {
                enqueueSnackbar('Tạo QR thành công!', { variant: 'success' });
                console.error(err);
            }
        }
    };
    const handleQualityChange = (_: Event, val: number | number[]) => {
        const newQuality = val as number;
        setQuality(newQuality);
        if (newQuality > 1800) {
            enqueueSnackbar('Chất lượng cao có thể làm chậm quá trình tải!', { variant: 'warning' });
        }
    };
    const handleDownloadPNG = () => {
        const canvas = document.querySelector('canvas') as HTMLCanvasElement;
        if (!canvas) {
            enqueueSnackbar('Không tìm thấy mã QR để tải!', { variant: 'error' });
            return;
        }

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = quality;
        tempCanvas.height = quality;
        const ctx = tempCanvas.getContext('2d');

        if (ctx) {
            const scale = quality / 370;
            ctx.scale(scale, scale);
            ctx.drawImage(canvas, 0, 0);
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            const dataUrl = tempCanvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `${qrName || 'qrcode'}.png`;
            link.click();
        }
    };

    // Hàm tải SVG
    const handleDownloadSVG = () => {
        const canvas = document.querySelector('canvas') as HTMLCanvasElement;
        if (!canvas) {
            enqueueSnackbar('Không tìm thấy mã QR để tải!', { variant: 'error' });
            return;
        }

        // Lấy dữ liệu SVG từ QRCodeCanvas (cần cấu hình thêm nếu thư viện hỗ trợ)
        // Lưu ý: qrcode.react không cung cấp SVG trực tiếp từ canvas, cần sử dụng API của thư viện
        // Dưới đây là cách đơn giản bằng cách tạo SVG thủ công (cần tối ưu)
        const svgData = `
            <svg width="${quality}" height="${quality}" xmlns="http://www.w3.org/2000/svg">
            <foreignObject width="100%" height="100%">
                <div xmlns="http://www.w3.org/1999/xhtml">
                <img src="${canvas.toDataURL('image/png')}" width="${quality}" height="${quality}" />
                </div>
            </foreignObject>
            </svg>
        `;
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${qrName || 'qrcode'}.svg`;
        link.click();
    };

    // Hàm tải PDF
    const handleDownloadPDF = () => {
        const canvas = document.querySelector('canvas') as HTMLCanvasElement;
        if (!canvas) {
            enqueueSnackbar('Không tìm thấy mã QR để tải!', { variant: 'error' });
            return;
        }

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = quality;
        tempCanvas.height = quality;
        const ctx = tempCanvas.getContext('2d');

        if (ctx) {
            const scale = quality / 370;
            ctx.scale(scale, scale);
            ctx.drawImage(canvas, 0, 0);
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            const imgData = tempCanvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [quality, quality]
            });
            pdf.addImage(imgData, 'PNG', 0, 0, quality, quality);
            pdf.save(`${qrName || 'qrcode'}.pdf`);
        }
    };

    const handleDownloadEPS = () => {
        enqueueSnackbar('Định dạng EPS hiện chưa được hỗ trợ!', { variant: 'warning' });
        // Để hỗ trợ EPS, cần tích hợp thư viện như eps-converter hoặc API bên thứ ba
    };

    const calculateLogoSize = (originalWidth: number, originalHeight: number, qrSize: number) => {
        const maxLogoSize = Math.floor(qrSize * 0.15);
        let newWidth = originalWidth;
        let newHeight = originalHeight;
        if (originalWidth > maxLogoSize || originalHeight > maxLogoSize) {
            const widthRatio = maxLogoSize / originalWidth;
            const heightRatio = maxLogoSize / originalHeight;
            const scale = Math.min(widthRatio, heightRatio);
            newWidth = Math.floor(originalWidth * scale);
            newHeight = Math.floor(originalHeight * scale);
        }

        return { width: newWidth, height: newHeight };
    };

    // Map tab index -> Form
    const formMap: Record<number, JSX.Element> = {
        0: <URLForm values={values} onChange={setValues} />,
        1: <TextForm values={values} onChange={setValues} />,
        2: <EmailForm values={values} onChange={setValues} />,
        3: <PhoneForm values={values} onChange={setValues} />,
        4: <SMSForm values={values} onChange={setValues} />,
        5: <VCard values={values} onChange={setValues} />,
        6: <MeCard values={values} onChange={setValues} />,
        7: <FacebookForm values={values} onChange={setValues} />,
        8: <TwitterForm values={values} onChange={setValues} />,
        9: <YoutubeForm values={values} onChange={setValues} />,
        10: <TiktokForm values={values} onChange={setValues} />,
        11: <LocationForm values={values} onChange={setValues} />,
        12: <WifiForm values={values} onChange={setValues} />,
        13: <EventForm values={values} onChange={setValues} />,
        14: <BitcoinForm values={values} onChange={setValues} />
    };

    const renderForm = () => formMap[tab] ?? formMap[0];

    const Logo = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="211" height="41" viewBox="0 0 211 41" fill="none">
                <mask id="mask0_630_3201" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="147" height="41">
                    <path d="M146.673 0.235352H0V40.2354H146.673V0.235352Z" fill="white" />
                </mask>
                <g mask="url(#mask0_630_3201)">
                    <path d="M8.56735 0.235352H0V11.6204H2.85578V3.08162H11.4231V0.235352H8.56735Z" fill="#00A64F" />
                    <path d="M8.56735 40.2352H0V28.8501H2.85578V37.3841H11.4231V40.2304H8.56735V40.2352Z" fill="#00A64F" />
                    <path d="M138.101 0.235352H146.668V11.6204H143.812V3.08162H135.245V0.235352H138.101Z" fill="#00A64F" />
                    <path d="M138.101 40.2352H146.668V28.8501H143.812V37.3841H135.245V40.2304H138.101V40.2352Z" fill="#00A64F" />
                    <path
                        d="M13.5695 10.2307H6.66806C6.62046 9.98794 6.58238 9.71664 6.55858 9.42155C6.53479 9.12645 6.52051 8.84563 6.52051 8.57433C6.52051 8.30303 6.53479 8.02697 6.55858 7.74615C6.58238 7.46534 6.62046 7.1988 6.66806 6.95605H24.2406C24.2882 7.20356 24.3263 7.45582 24.3501 7.72712C24.3739 7.99842 24.3882 8.26496 24.3882 8.53626C24.3882 8.80755 24.3739 9.09313 24.3501 9.40251C24.3263 9.70713 24.2882 9.98318 24.2406 10.2307H17.3392V33.4054C16.7728 33.4768 16.1588 33.5148 15.4924 33.5148C14.8261 33.5148 14.1645 33.4768 13.5743 33.4054V10.2307H13.5695Z"
                        fill="#414042"
                    />
                    <path
                        d="M27.4534 7.35586C27.9864 7.30827 28.4719 7.26067 28.9051 7.21308C29.3382 7.16548 29.7713 7.12264 30.1949 7.08457C30.6185 7.04649 31.0612 7.01793 31.5181 6.99413C31.9798 6.97033 32.4843 6.95605 33.0412 6.95605C34.2739 6.95605 35.4972 7.07981 36.7061 7.31779C37.9151 7.56053 38.9955 7.97938 39.9379 8.58385C40.8803 9.18833 41.6466 10.0022 42.2416 11.0255C42.8365 12.0489 43.1316 13.3482 43.1316 14.9142C43.1316 15.8566 42.9745 16.7133 42.6604 17.4844C42.3463 18.2554 41.9465 18.9456 41.461 19.5453C40.9755 20.1498 40.4281 20.6733 39.8094 21.1207C39.1954 21.5681 38.5909 21.9346 38.0102 22.225L37.5771 22.4439L45.164 33.4054C44.5119 33.4768 43.7694 33.5148 42.9508 33.5148C42.2987 33.5148 41.6419 33.4768 40.9898 33.4054L32.6414 21.3587V21.2159L32.9317 21.1445C33.5838 20.978 34.2739 20.7495 35.0022 20.4592C35.7304 20.1688 36.4015 19.788 37.0155 19.3168C37.6295 18.8456 38.1483 18.2792 38.5576 17.6176C38.9669 16.9561 39.1716 16.1517 39.1716 15.2093C39.1716 13.472 38.6576 12.1821 37.6295 11.3397C36.6014 10.4972 35.2163 10.0736 33.4696 10.0736C33.0555 10.0736 32.6795 10.0879 32.3272 10.1117C31.975 10.1355 31.5847 10.1736 31.1468 10.2212V33.4196L30.2568 33.4863C29.9284 33.5101 29.619 33.5244 29.3287 33.5244C29.0383 33.5244 28.7242 33.5196 28.3863 33.5053C28.0483 33.491 27.7342 33.4625 27.4438 33.4149V7.35586H27.4534Z"
                        fill="#414042"
                    />
                    <path
                        d="M60.9376 7.1036C60.5996 7.05601 60.2427 7.01793 59.8762 6.99413C59.5097 6.97033 59.1575 6.95605 58.8148 6.95605C58.4245 6.95605 58.0437 6.97033 57.6772 6.99413C57.3107 7.01793 56.968 7.05601 56.6491 7.1036L48.0723 33.3673C48.3436 33.4149 48.6434 33.453 48.9718 33.4768C49.3003 33.5006 49.6334 33.5148 49.9809 33.5148C50.295 33.5148 50.6187 33.5006 50.9328 33.4768H50.9709C51.523 33.4339 51.9847 33.0436 52.1418 32.5153L53.265 28.7314L53.6886 27.3035H53.6982L55.1165 22.5819L58.672 10.6448L62.2607 22.5819L62.3417 22.8437L63.6934 27.3035L64.4073 29.6595L65.2736 32.5201C65.4307 33.0484 65.9019 33.4339 66.454 33.472H66.4635C66.7967 33.4958 67.1203 33.5101 67.4345 33.5101C67.7772 33.5101 68.1294 33.4958 68.4959 33.472C68.8624 33.4482 69.1908 33.4101 69.4859 33.3625L60.9423 7.09884L60.9376 7.1036Z"
                        fill="#414042"
                    />
                    <path
                        d="M84.8975 19.6117L78.6053 33.4051C78.1293 33.4527 77.6771 33.486 77.2583 33.5003L83.5981 19.6117L78.2959 6.96533C78.7481 6.98437 79.1955 7.01293 79.6381 7.06528L84.9023 19.6117H84.8975Z"
                        fill="#414042"
                    />
                    <path
                        d="M84.8978 19.6119L90.162 7.06553C90.4333 7.04173 90.6903 7.01793 90.933 6.99413C91.1758 6.97033 91.4376 6.95605 91.7041 6.95605H92.6989C92.9702 6.95605 93.2034 6.96557 93.3985 6.97509C93.5937 6.98937 93.8269 7.01793 94.0982 7.06553L88.577 19.5025L95.1644 33.4054C94.4266 33.4768 93.7555 33.5148 93.1415 33.5148C92.5989 33.5148 91.9516 33.4768 91.1901 33.4054L84.8931 19.6119H84.8978Z"
                        fill="#414042"
                    />
                    <path
                        d="M82.6512 19.6121L76.3589 33.4055C76.0638 33.434 75.783 33.4578 75.507 33.4769C75.288 33.4959 75.0834 33.5054 74.8787 33.5102H74.8597C74.7073 33.5102 74.555 33.5197 74.4075 33.5197C73.7935 33.5197 73.1176 33.4816 72.3799 33.4102L78.9339 19.6168L73.4127 7.07041C73.7792 7.02281 74.1219 6.9895 74.4408 6.97998C74.7597 6.9657 75.0929 6.96094 75.4356 6.96094C75.5831 6.96094 75.7307 6.96094 75.8735 6.97046H75.9306C76.1019 6.97998 76.2733 6.98474 76.4446 6.99425H76.4541C76.7683 7.01329 77.0776 7.03709 77.3823 7.07517L82.6464 19.6216L82.6512 19.6121Z"
                        fill="#00A64F"
                    />
                    <path
                        d="M97.8912 6.95605H112.532C112.603 7.4463 112.641 7.99366 112.641 8.57909C112.641 8.85039 112.632 9.13121 112.622 9.43107C112.608 9.72616 112.579 9.99746 112.527 10.245H101.666V17.8556H110.338C110.385 18.1031 110.423 18.3649 110.447 18.6505C110.471 18.9313 110.485 19.2121 110.485 19.4834C110.485 19.7547 110.471 20.0355 110.447 20.3354C110.423 20.6305 110.385 20.9018 110.338 21.1493H101.666V30.2354H112.822C112.894 30.7257 112.932 31.2683 112.932 31.8585C112.932 32.1298 112.922 32.4106 112.913 32.7105C112.898 33.0056 112.87 33.2769 112.817 33.5244H97.877V6.95605H97.8817H97.8912Z"
                        fill="#414042"
                    />
                    <path
                        d="M116.84 7.1036C117.135 7.05601 117.468 7.01793 117.849 6.99413C118.23 6.97033 118.587 6.95605 118.929 6.95605C119.272 6.95605 119.648 6.97033 120.048 6.99413C120.452 7.01793 120.786 7.05601 121.057 7.1036L127.873 23.5434L134.727 7.1036C134.969 7.05601 135.279 7.01793 135.645 6.99413C136.012 6.97033 136.369 6.95605 136.707 6.95605C137.025 6.95605 137.378 6.97033 137.768 6.99413C138.158 7.01793 138.491 7.05601 138.758 7.1036L140.005 33.3673C139.71 33.4149 139.415 33.453 139.105 33.4768C138.801 33.5006 138.487 33.5148 138.173 33.5148C137.858 33.5148 137.544 33.5006 137.24 33.4768C136.935 33.453 136.649 33.4149 136.378 33.3673L135.536 12.9484L129.086 27.927C128.596 27.9984 128.096 28.0365 127.582 28.0365C127.116 28.0365 126.654 27.9984 126.188 27.927L119.957 12.839L119.115 33.3673C118.848 33.4149 118.563 33.453 118.272 33.4768C117.977 33.5006 117.697 33.5148 117.43 33.5148C117.111 33.5148 116.806 33.5006 116.511 33.4768C116.216 33.453 115.935 33.4149 115.669 33.3673L116.845 7.1036H116.84Z"
                        fill="#414042"
                    />
                </g>
                <path
                    d="M211 33.6105H206.038L198.366 21.9301H196.915H191.037V33.6105H186.876V5.63086H196.915H201.114C203.71 5.63086 205.834 6.2925 207.489 7.61577C209.143 8.9136 209.97 10.9621 209.97 13.7614C209.97 16.1789 209.333 18.0366 208.061 19.3344C206.789 20.6068 205.096 21.4084 202.984 21.7392L211 33.6105ZM191.037 9.29532V18.2274H198.747C200.172 18.2274 201.356 18.1511 202.297 17.9984C203.264 17.8457 204.079 17.4386 204.74 16.7769C205.427 16.1153 205.771 15.1101 205.771 13.7614C205.771 12.4126 205.427 11.4075 204.74 10.7458C204.079 10.0842 203.264 9.67703 202.297 9.52434C201.356 9.37166 200.172 9.29532 198.747 9.29532H191.037Z"
                    fill="#00A64F"
                />
                <path
                    d="M179.605 34.9089C178.74 34.6035 177.951 34.1836 177.239 33.6492C176.526 33.1148 175.763 32.4532 174.949 31.6643C172.709 33.2675 169.974 34.0691 166.742 34.0691C163.841 34.0691 161.36 33.4456 159.298 32.1987C157.237 30.9518 155.672 29.2341 154.603 27.0456C153.534 24.8571 153 22.3759 153 19.6021C153 16.8283 153.534 14.3599 154.603 12.1969C155.672 10.0084 157.237 8.29067 159.298 7.04374C161.385 5.79681 163.866 5.17334 166.742 5.17334C169.617 5.17334 172.086 5.79681 174.147 7.04374C176.208 8.29067 177.773 10.0084 178.842 12.1969C179.911 14.3599 180.445 16.8283 180.445 19.6021C180.445 23.1903 179.567 26.2567 177.811 28.8015C178.524 29.4631 179.224 30.0357 179.911 30.5192C180.598 30.9772 181.361 31.3335 182.201 31.588L179.605 34.9089ZM157.428 19.6021C157.428 21.5107 157.759 23.2793 158.42 24.908C159.082 26.5112 160.1 27.809 161.474 28.8015C162.874 29.7939 164.63 30.2901 166.742 30.2901C168.752 30.2901 170.495 29.7939 171.971 28.8015C170.902 27.9362 169.821 27.4018 168.727 27.1982L171.208 24.1827C172.378 24.4881 173.498 25.0479 174.567 25.8622C175.534 24.0809 176.017 21.9942 176.017 19.6021C176.017 17.719 175.687 15.9759 175.025 14.3727C174.389 12.744 173.371 11.4335 171.971 10.441C170.572 9.44854 168.828 8.95231 166.742 8.95231C164.63 8.95231 162.874 9.44854 161.474 10.441C160.1 11.4335 159.082 12.744 158.42 14.3727C157.759 15.9759 157.428 17.719 157.428 19.6021Z"
                    fill="#00A64F"
                />
            </svg>
        );
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(to bottom, #f0f8f3, #d6ebdd, #b2dbb9, #7fcf95, #4caf50)',
                p: 3
            }}
        >
            {/* Tabs */}
            <Paper
                elevation={0}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 3,
                    borderRadius: 2,
                    background: 'transparent'
                }}
            >
                <Tabs
                    value={tab}
                    onChange={(_, v) => setTab(v)}
                    textColor="inherit"
                    TabIndicatorProps={{ style: { background: 'green' } }}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="URL" />
                    <Tab label="Văn bản" />
                    <Tab label="Email" />
                    <Tab label="Điện thoại" />
                    <Tab label="Tin nhắn" />
                    <Tab label="VCard" />
                    <Tab label="MeCard" />
                    <Tab label="Facebook" />
                    <Tab label="Twitter" />
                    <Tab label="Youtube" />
                    <Tab label="Tiktok" />
                    <Tab label="Vị trí" />
                    <Tab label="Wifi" />
                    <Tab label="Sự kiện" />
                    <Tab label="Bitcoin" />
                </Tabs>
            </Paper>

            {/* Nội dung chính */}
            <Grid container justifyContent="center">
                <Grid item xs={12} md={9} sx={{ maxWidth: '1400px', margin: 'auto' }}>
                    <Paper
                        elevation={0}
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            borderRadius: 3,
                            overflow: 'hidden',
                            bgcolor: '#fff'
                        }}
                    >
                        {/* Form nhập liệu */}
                        <Box
                            flex={7}
                            sx={{
                                p: 3,
                                borderRight: { md: '1px solid #eee' },
                                display: 'flex',
                                flexDirection: 'column',
                                bgcolor: '#F9F9F9'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRadius: '12px',
                                    bgcolor: '#fff',
                                    mb: 2,
                                    p: 1
                                }}
                            >
                                {/* Icon */}
                                <Box
                                    sx={{
                                        border: 'none',
                                        outline: 'none',
                                        fontSize: '16px',
                                        marginLeft: '10px',
                                        color: '#4C4C4C',
                                        background: 'transparent'
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                        <rect width="40" height="40" rx="10" fill="#00A64F" />
                                        <path
                                            d="M19 10H17C12 10 10 12 10 17V23C10 28 12 30 17 30H23C28 30 30 28 30 23V21"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M24.0399 11.0198L16.1599 18.8998C15.8599 19.1998 15.5599 19.7898 15.4999 20.2198L15.0699 23.2298C14.9099 24.3198 15.6799 25.0798 16.7699 24.9298L19.7799 24.4998C20.1999 24.4398 20.7899 24.1398 21.0999 23.8398L28.9799 15.9598C30.3399 14.5998 30.9799 13.0198 28.9799 11.0198C26.9799 9.01976 25.3999 9.65976 24.0399 11.0198Z"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M22.9099 12.1499C23.5799 14.5399 25.4499 16.4099 27.8499 17.0899"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </Box>

                                {/* Input custom */}
                                <input
                                    type="text"
                                    placeholder="Nhập tên QR"
                                    value={qrName}
                                    onChange={(e) => setQrName(e.target.value)}
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                        flex: 1,
                                        fontSize: '16px',
                                        marginLeft: '10px',
                                        color: '#4C4C4C',
                                        background: 'transparent'
                                    }}
                                />
                            </Box>
                            {renderForm()}

                            {/* Accordion Chọn màu */}
                            <Accordion sx={{ mb: 2 }} expanded={expanded === 'color'} onChange={handleChange('color')}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography
                                        sx={{
                                            color: expanded === 'color' ? '#00A64F' : '#4C4C4C',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            fontSize: '18px',
                                            fontWeight: expanded === 'color' ? 600 : 500
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                            <rect width="40" height="40" rx="10" fill="#00A64F" />
                                            <path
                                                d="M18 24C18 22.34 18 21 21 21H25C28 21 28 20 28 18V16C28 14 28 13 25 13H24"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M20 10H16C15.35 11.95 15.35 14.05 16 16H20C20.65 14.05 20.65 11.95 20 10Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M16 10H15C13 10 12 11 12 13C12 15 13 16 15 16H16C15 14 15 12 16 10Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M21 10H20C21 12 21 14 20 16H21C23 16 24 15 24 13C24 11 23 10 21 10Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M17.5 30H18.5C20 30 20 29 20 28.5V25.5C20 25 20 24 18.5 24H17.5C16 24 16 25 16 25.5V28.5C16 29 16 30 17.5 30Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>{' '}
                                        CHỌN MÀU
                                    </Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Box display="flex" gap={2}>
                                        <ColorPicker title="Màu QR" color={tempQrColor} setColor={setTempQrColor} />
                                        <ColorPicker title="Màu nền" color={tempQrBgColor} setColor={setTempQrBgColor} />
                                    </Box>
                                </AccordionDetails>
                            </Accordion>

                            {/* Accordion Tải logo */}
                            <Accordion expanded={expanded === 'logo'} onChange={handleChange('logo')} sx={{ mb: 2 }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography
                                        sx={{
                                            color: expanded === 'logo' ? '#00A64F' : '#4C4C4C',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            fontSize: '18px',
                                            fontWeight: expanded === 'logo' ? 600 : 500
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                            <rect width="40" height="40" rx="10" fill="#00A64F" />
                                            <path
                                                d="M17 18C18.1046 18 19 17.1046 19 16C19 14.8954 18.1046 14 17 14C15.8954 14 15 14.8954 15 16C15 17.1046 15.8954 18 17 18Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M21 10H17C12 10 10 12 10 17V23C10 28 12 30 17 30H23C28 30 30 28 30 23V18"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path d="M23.75 13H29.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M26.5 15.75V10.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                            <path
                                                d="M10.6699 26.9501L15.5999 23.6401C16.3899 23.1101 17.5299 23.1701 18.2399 23.7801L18.5699 24.0701C19.3499 24.7401 20.6099 24.7401 21.3899 24.0701L25.5499 20.5001C26.3299 19.8301 27.5899 19.8301 28.3699 20.5001L29.9999 21.9001"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        TẢI LÊN LOGO
                                    </Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 2 }}>
                                        <Box
                                            sx={{
                                                width: 100,
                                                height: 100,
                                                borderRadius: 2,
                                                bgcolor: '#F5F5F5',
                                                border: '1px solid #E0E0E0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: 0.5,
                                                position: 'relative'
                                            }}
                                        >
                                            {tempLogoFile ? (
                                                <>
                                                    <img 
                                                        src={tempLogoFile.url} 
                                                        alt="logo" 
                                                        style={{ width: '100%', height: 'auto', maxHeight: '100%' }} 
                                                    />
                                                    <Button
                                                        size="small"
                                                        onClick={() => {
                                                            setTempLogoFile(null); 
                                                            setValues((prev) => ({
                                                                ...prev,
                                                                logoBase64: '',
                                                                logoWidth: 0,
                                                                logoHeight: 0
                                                            }));
                                                        }}
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 70,
                                                            left: 124,
                                                            width: 100,
                                                            height: 30,
                                                            borderRadius: 2,
                                                            bgcolor: '#3f51b5',
                                                            color: '#fff',
                                                            border: '1px solid #E0E0E0',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            padding: 0.5
                                                        }}
                                                    >
                                                        Xóa ảnh
                                                    </Button>
                                                </>
                                            ) : (
                                                <img
                                                    src={UploadImage}
                                                    alt="placeholder"
                                                    width={100}
                                                    height={100}
                                                    style={{ opacity: 0.5 }}
                                                />
                                            )}
                                        </Box>

                                        {/* Nút chọn file */}
                                        <Box>
                                            <Button
                                                variant="contained"
                                                component="label"
                                                sx={{
                                                    backgroundColor: '#00A64F',
                                                    textTransform: 'none',
                                                    borderRadius: '8px',
                                                    px: 3,
                                                    mb: 1
                                                }}
                                            >
                                                Chọn ảnh
                                                <input
                                                    hidden
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const files = e.target.files;
                                                        if (!files || files.length === 0) return;
                                                        const file = files[0];

                                                        if (file.size > MAX_SIZE) {
                                                            enqueueSnackbar('File quá lớn! Vui lòng chọn file dưới 2MB.', { variant: 'error' });
                                                            e.target.value = '';
                                                            return;
                                                        }

                                                        if (!ALLOWED_TYPES.includes(file.type)) {
                                                            enqueueSnackbar('Định dạng file không hợp lệ! Vui lòng chọn JPG hoặc PNG.', { variant: 'error' });
                                                            e.target.value = '';
                                                            return;
                                                        }

                                                        const reader = new FileReader();
                                                        reader.onload = function (ev) {
                                                            if (typeof ev.target?.result === 'string') {
                                                                const img = new Image();
                                                                img.onload = function () {
                                                                    const { width: scaledWidth, height: scaledHeight } = calculateLogoSize(img.width, img.height, 370);
                                                                    const newLogo = {
                                                                        url: ev.target?.result as string,
                                                                        width: scaledWidth,
                                                                        height: scaledHeight
                                                                    };
                                                                    setTempLogoFile(newLogo); 
                                                        
                                                                    setValues((prev) => ({
                                                                        ...prev,
                                                                        logoBase64: newLogo.url || '',
                                                                        logoWidth: newLogo.width || 0,
                                                                        logoHeight: newLogo.height || 0
                                                                    }));
                                                                };
                                                                img.src = ev.target.result;
                                                            } else {
                                                                setTempLogoFile(null);
                                                                setValues((prev) => ({
                                                                    ...prev,
                                                                    logoBase64: '',
                                                                    logoWidth: 0,
                                                                    logoHeight: 0
                                                                }));
                                                            }
                                                            e.target.value = '';
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }}
                                                />
                                            </Button>
                                            <Typography variant="body2" color="text.secondary">
                                                {!tempLogoFile 
                                                    ? `Bạn có thể tải lên logo riêng của mình dưới dạng file .png, .jpg, .gif hoặc .svg (dung lượng tối đa 2MB).` 
                                                    : ''
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Box>

                        {/* Preview QR */}
                        <Box
                            flex={5}
                            sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <QRCodeCanvas
                                value={qrValue}
                                size={370}
                                bgColor={qrBgColor}
                                fgColor={qrColor}
                                level="H"
                                imageSettings={{
                                    src: logoFile?.url || '',
                                    height: 60,
                                    width: logoFile?.width && logoFile?.height ? 60 * Math.round(logoFile.width / logoFile.height) : 60,
                                    excavate: true
                                }}
                            />

                            {/* Slider chất lượng */}
                            <Box sx={{ width: '100%', px: 4, my: 2 }}>
                                <Slider
                                    value={quality}
                                    min={500}
                                    max={2000}
                                    step={100}
                                    onChange={handleQualityChange}
                                    sx={{
                                        color: 'green'
                                    }}
                                />
                                <Typography align="center" fontWeight="bold" sx={{ color: 'green' }}>
                                    {quality} × {quality} Px
                                </Typography>
                                <Box display="flex" justifyContent="space-between" fontSize="14px" color="text.secondary">
                                    <span>Chất lượng thấp</span>
                                    <span>Chất lượng cao</span>
                                </Box>
                            </Box>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    backgroundColor: '#00A64F',
                                    color: '#fff',
                                    textTransform: 'none',
                                    padding: '14px 22px',
                                    mb: 2,
                                    borderRadius: '8px'
                                }}
                                onClick={handleGenerateQR}
                            >
                                {qrId ? 'Cập nhật Mã QR' : 'Tạo Mã QR'}
                            </Button>

                            {/* Nút tải file */}
                            <Box display="flex" gap={2}>
                                {['.PNG', '.SVG', '.PDF', '.EPS'].map((ext) => {
                                    let handleClick;
                                    switch (ext) {
                                        case '.PNG':
                                            handleClick = handleDownloadPNG;
                                            break;
                                        case '.SVG':
                                            handleClick = handleDownloadSVG;
                                            break;
                                        case '.PDF':
                                            handleClick = handleDownloadPDF;
                                            break;
                                        case '.EPS':
                                            handleClick = handleDownloadEPS;
                                            break;
                                        default:
                                            handleClick = () => {};
                                    }
                                    return (
                                        <Button
                                            key={ext}
                                            variant="outlined"
                                            sx={{
                                                textTransform: 'none',
                                                borderRadius: '8px',
                                                minWidth: '72px'
                                            }}
                                            onClick={handleClick}
                                            disabled={!qrValue || qrValue.trim() === ''}
                                        >
                                            {ext}
                                        </Button>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            {/* <Box sx={{ mt: 4 }}>
                <ContactUs />
            </Box> */}
            <Grid container justifyContent="center" sx={{ mt: 5, mb: 3 }}>
                <Grid item xs={12} md={9}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 2, md: 4 },
                            borderRadius: 3,
                            backgroundColor: '#fff'
                        }}
                    >
                        <Grid container spacing={4} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <div>
                                    <Logo />
                                </div>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#414042',
                                        maxWidth: 544,
                                        fontSize: { xs: '28px', md: '28px' },
                                        mt: 2,
                                        mb: 2,
                                        textAlign: { xs: 'left', md: 'left' }
                                    }}
                                >
                                    Nền Tảng Tạo Mã QR Chuyên Nghiệp, Miễn Phí & Bảo Mật Hàng Đầu
                                </Typography>
                                <Typography
                                    sx={{
                                        maxWidth: 620,
                                        mx: { xs: 'auto', md: 0 },
                                        mb: 1,
                                        fontSize: 16,
                                        fontWeight: 500,
                                        lineHeight: 1.6,
                                        color: '#363F3E',
                                        textAlign: { xs: 'left', md: 'left' }
                                    }}
                                >
                                    Tạo mã QR code chỉ trong vài giây - đơn giản, nhanh chóng và hiệu quả.
                                </Typography>
                                <Typography
                                    sx={{
                                        maxWidth: 620,
                                        mx: { xs: 'auto', md: 0 },
                                        mb: 1,
                                        color: '#363F3E',
                                        fontWeight: 500,
                                        lineHeight: 1.6,
                                        fontSize: 16,
                                        textAlign: { xs: 'left', md: 'left' }
                                    }}
                                >
                                    SmartQR là công cụ tạo mã QR code miễn phí, cung cấp giải pháp tùy chỉnh mã QR chuyên nghiệp với đầy
                                    đủ tính năng từ cơ bản đến nâng cao. Chỉ với vài thao tác, bạn đã có ngay những mã QR ấn tượng với màu
                                    sắc, hình dạng và logo thương hiệu cá nhân. Dù bạn là doanh nghiệp, marketer hay cá nhân, SmartQR đều
                                    mang đến trải nghiệm kết nối thế giới thực và số hóa mượt mà.
                                </Typography>
                                <Typography
                                    sx={{
                                        maxWidth: 620,
                                        mx: { xs: 'auto', md: 0 },
                                        mb: 1,
                                        color: '#363F3E',
                                        fontWeight: 500,
                                        lineHeight: 1.6,
                                        fontSize: 16,
                                        textAlign: { xs: 'left', md: 'left' }
                                    }}
                                >
                                    Trải nghiệm ngay công cụ tạo mã QR online miễn phí từ SmartQR - giải pháp QR dành cho mọi đối tượng.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                                <img
                                    src={phone}
                                    alt="QR demo"
                                    style={{
                                        width: '100%',
                                        maxWidth: '100%',
                                        height: 'auto'
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} sx={{ mt: { xs: 3, md: 5 } }}>
                            {[
                                {
                                    icon: item1,
                                    title: 'Tuỳ chỉnh mã QR linh hoạt',
                                    text: 'Thay đổi màu sắc, hình dạng, chèn logo thương hiệu...',
                                    content: [
                                        'Thay đổi màu sắc, hình dạng, khung viền theo phong cách riêng',
                                        'Chèn logo thương hiệu để tăng độ nhận diện',
                                        'Xuất file chất lượng cao (SVG, PNG, PDF) phục vụ in ấn và quảng cáo'
                                    ]
                                },
                                {
                                    icon: item2,
                                    title: 'Hỗ trợ đa dạng loại mã QR',
                                    content: [
                                        'QR cho website, mạng xã hội (Facebook, TikTok, Instagram,...)',
                                        'QR vCard, email, WiFi, số điện thoại, thanh toán',
                                        'Tính năng theo dõi lượt quét mã QR - tối ưu chiến dịch marketing'
                                    ]
                                },
                                {
                                    icon: item3,
                                    title: 'Giao diện trực quan, bảo mật tuyệt đối',
                                    content: [
                                        'Không cần kỹ năng thiết kế - tạo mã QR chuyên nghiệp chỉ với vài cú nhấp chuột',
                                        'SmartQR cam kết không lưu trữ thông tin riêng tư',
                                        'Dữ liệu được mã hóa, chỉ bạn có quyền truy cập'
                                    ]
                                },
                                {
                                    icon: item4,
                                    title: 'Ứng dụng mã QR trong thực tế',
                                    content: [
                                        'Marketing: tích hợp QR vào banner, poster, sản phẩm',
                                        'Sự kiện & Giáo dục: chia sẻ tài liệu, form đăng ký, vé điện tử',
                                        'Cá nhân: portfolio, CV, danh thiếp điện tử'
                                    ]
                                }
                            ].map((item, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            p: 3,
                                            height: '100%',
                                            alignItems: 'left',
                                            textAlign: 'left',
                                            border: 'none',
                                            boxShadow: '0px 0px 0px 0px'
                                        }}
                                    >
                                        <Typography sx={{ fontSize: '36px', mb: 1, textAlign: 'left' }}>
                                            <img src={item.icon} alt={item.icon} />
                                        </Typography>
                                        <Typography sx={{ fontWeight: 600, fontSize: '22px', color: '#414042', fontFamily: 'Inter' }}>
                                            {item.title}
                                        </Typography>
                                        {item.content && (
                                            <Box
                                                component="ul"
                                                sx={{ textAlign: 'left', color: '#363F3E !important', fontSize: '14px', fontWeight: 500 }}
                                            >
                                                {item.content.map((line, i) => (
                                                    <Typography
                                                        key={i}
                                                        component="li"
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={[
                                                            {
                                                                textAlign: 'left',
                                                                color: '#363F3E',
                                                                fontSize: '14px',
                                                                fontWeight: 500
                                                            },
                                                            {
                                                                color: '#363F3E !important'
                                                            }
                                                        ]}
                                                    >
                                                        {line}
                                                    </Typography>
                                                ))}
                                            </Box>
                                        )}
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Footer />
        </Box>
    );
};

export default MainContent;
