import { ConfigProps } from '@/types/config';

export const gridSpacing = 3;
export const drawerWidth = 260;
export const appDrawerWidth = 320;

export const BASE_PATH = '/';
export const DASHBOARD_PATH = '/dashboard';
export const HORIZONTAL_MAX_ITEM = 6;
export const LAYOUT_CONST = {
    VERTICAL_LAYOUT: 'vertical',
    HORIZONTAL_LAYOUT: 'horizontal',
    DEFAULT_DRAWER: 'default',
    MINI_DRAWER: 'mini-drawer'
};
export const config: ConfigProps = {
    layout: LAYOUT_CONST.VERTICAL_LAYOUT, // vertical, horizontal
    drawerType: LAYOUT_CONST.DEFAULT_DRAWER, // default, mini-drawer
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    navType: 'light', // light, dark
    presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
    locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    container: false
};
