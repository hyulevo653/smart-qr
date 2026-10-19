import { Box, Container, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import agri from '@/assets/images/agri.png';
import emarket from '@/assets/images/emarket.png';
import smeaccel from '@/assets/images/smeaccel.png';
import empl from '@/assets/images/emPl.png';
import emteller from '@/assets/images/emteller.png';
import acecrm from '@/assets/images/acecrm.png';
import instantview from '@/assets/images/instantview.png';
import emedia from '@/assets/images/emedia.png';
import ContactUs from '@/pages/ContactUs';

const FooterWrapper = styled('footer')({
  padding: '24px 0 0 0 ',
});

export default function Footer() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <FooterWrapper>
      <Container maxWidth={false} sx={{ maxWidth: '1400px', backgroundColor: '#fff', borderRadius: '20px' }}>
        <Box sx={{ pt: 1, display: 'flex', justifyContent: isSmall ? 'space-evenly' : 'center' }}>
          <ContactUs />
        </Box>

        {/* Logo đối tác */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: isSmall ? 'flex-start' : 'space-evenly',
            pt: 1,
            pb: 2,
            gap: 2,
            mt: 4,
          }}
        >
          {[agri, emarket, smeaccel, empl, emteller, acecrm, instantview, emedia].map(
            (logo, idx) => (
              <Box
                key={idx}
                component="img"
                src={logo}
                alt="partner logo"
                sx={{ height: 38, objectFit: 'contain', opacity: 0.85, filter: 'grayscale(20%)' }}
              />
            )
          )}
        </Box>

        {/* Dòng bản quyền */}
        <Box
          sx={{
            borderTop: '1px solid #f0f0f0',
            py: 2,
            textAlign: 'center',
            mt: 2
          }}
        >
          <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '13px' }}>
            © 2026 SmartQR. Bản quyền thuộc về Công ty Cổ phần Công nghệ SmartQR Việt Nam. Tất cả quyền được bảo lưu.
          </Typography>
        </Box>
      </Container>
    </FooterWrapper>
  );
}

