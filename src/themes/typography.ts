import { Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface TypographyVariants {
        text22FontWeight400: React.CSSProperties;
        text24FontWeight400: React.CSSProperties;
        text24FontWeight500: React.CSSProperties;
        text26FontWeight500: React.CSSProperties;
        text30FontWeight600: React.CSSProperties;
        text36FontWeight600: React.CSSProperties;
        text40FontWeight600: React.CSSProperties;
        h6: React.CSSProperties;
        h5: React.CSSProperties;
        h4: React.CSSProperties;
        h3: React.CSSProperties;
        h2: React.CSSProperties;
        h1: React.CSSProperties;
        subtitle1: React.CSSProperties;
        subtitle2: React.CSSProperties;
        caption: React.CSSProperties;
        body1: React.CSSProperties;
        body2: React.CSSProperties;
        button: React.CSSProperties;
    }
    interface TypographyVariantsOptions {
        text22FontWeight400: React.CSSProperties;
        text24FontWeight400: React.CSSProperties;
        text24FontWeight500: React.CSSProperties;
        text26FontWeight500: React.CSSProperties;
        text30FontWeight600: React.CSSProperties;
        text36FontWeight600: React.CSSProperties;
        text40FontWeight600: React.CSSProperties;
        h6: React.CSSProperties;
        h5: React.CSSProperties;
        h4: React.CSSProperties;
        h3: React.CSSProperties;
        h2: React.CSSProperties;
        h1: React.CSSProperties;
        subtitle1: React.CSSProperties;
        subtitle2: React.CSSProperties;
        caption: React.CSSProperties;
        body1: React.CSSProperties;
        body2: React.CSSProperties;
        button: React.CSSProperties;
    }
}
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        text22FontWeight400: true;
        text24FontWeight400: true;
        text24FontWeight500: true;
        text26FontWeight500: true;
        text30FontWeight600: true;
        text36FontWeight600: true;
        text40FontWeight600: true;
        h6: true;
        h5: true;
        h4: true;
        h3: true;
        h2: true;
        h1: true;
        subtitle1: true;
        subtitle2: true;
        caption: true;
        body1: true;
        body2: true;
        button: true;
    }
}

const FONT_REGULAR = 400;
const FONT_MEDIUM = 500;
const FONT_SEMIBOLD = 600;
const FONT_BOLD = 700;

const Typography = (theme: Theme, fontFamily: string) => ({
    fontFamily,
    h6: {
        fontWeight: FONT_MEDIUM,
        color: theme.palette.grey[600],
        fontSize: '0.75rem'
    },
    h5: {
        fontSize: '0.875rem',
        color: theme.palette.grey[600],
        fontWeight: FONT_MEDIUM
    },
    h4: {
        fontSize: '1rem',
        color: theme.palette.grey[600],
        fontWeight: FONT_SEMIBOLD
    },
    h3: {
        fontSize: '1.25rem',
        color: theme.palette.grey[600],
        fontWeight: FONT_SEMIBOLD
    },
    h2: {
        fontSize: '1.5rem',
        color: theme.palette.grey[600],
        fontWeight: FONT_BOLD
    },
    h1: {
        fontSize: '2.125rem',
        color: theme.palette.grey[600],
        fontWeight: FONT_BOLD
    },
    subtitle1: {
        fontSize: '0.875rem',
        fontWeight: FONT_MEDIUM,
        color: theme.palette.text.dark
    },
    subtitle2: {
        fontSize: '0.75rem',
        fontWeight: FONT_REGULAR,
        color: theme.palette.text.secondary
    },
    caption: {
        fontSize: '0.75rem',
        color: theme.palette.text.secondary,
        fontWeight: FONT_REGULAR
    },
    body1: {
        fontSize: '0.875rem',
        fontWeight: FONT_REGULAR,
        lineHeight: '1.334em'
    },
    body2: {
        letterSpacing: '0em',
        fontWeight: FONT_REGULAR,
        lineHeight: '1.5em',
        color: theme.palette.text.primary
    },
    button: {
        textTransform: 'capitalize'
    },
    text22FontWeight400: {
        fontSize: '22px',
        fontWeight: FONT_REGULAR,
        lineHeight: 1.5,
        color: '#364152'
    },
    text24FontWeight400: {
        fontSize: 24,
        fontWeight: FONT_REGULAR,
        lineHeight: 1.5,
        color: '#364152'
    },
    text24FontWeight500: {
        fontSize: 24,
        fontWeight: FONT_MEDIUM,
        lineHeight: 1.5,
        color: '#364152'
    },
    text26FontWeight500: {
        fontSize: 26,
        fontWeight: FONT_MEDIUM,
        lineHeight: 1.5,
        color: '#364152'
    },
    text30FontWeight600: {
      fontSize: 30,
      fontWeight: FONT_SEMIBOLD,
      lineHeight: 1.5,
      color: '#212121'
    },
    text36FontWeight600: {
      fontSize: 36,
      fontWeight: FONT_SEMIBOLD,
      lineHeight: 1.5,
      color: '#212121'
    },
    text40FontWeight600: {
        fontSize: 40,
        fontWeight: FONT_SEMIBOLD,
        lineHeight: 1.5,
        color: '#212121'
    },
});

export default Typography;
