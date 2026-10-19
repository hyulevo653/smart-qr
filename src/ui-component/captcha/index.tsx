import { APP_CODE, AUTH_GATE_API, CAPT_KEY } from '@/constants';
import { ButtonBase, Stack } from '@mui/material';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { IconContext } from 'react-icons';
import { TbRefreshDot } from 'react-icons/tb';

const random = () => crypto.randomUUID();

export default forwardRef<{ refresh?: () => void }>(function Captcha(_, ref) {
    const [r, setR] = useState(random());
    function refresh() {
        setR(random());
    }
    useEffect(() => {
        const timer = setTimeout(refresh, 2 * 60 * 1000);
        return () => clearTimeout(timer);
    }, [r]);
    useImperativeHandle(ref, () => ({ refresh }), []);
    return (
        <Stack direction="row" gap={1} height={50} alignItems="center">
            <img
                style={{ height: '100%', borderRadius: 8 }}
                src={`${AUTH_GATE_API}/captcha/generator/${APP_CODE}/${CAPT_KEY}?ran=${r}`}
                alt="captcha"
            />
            <ButtonBase disableRipple type="button" onClick={refresh}>
                <IconContext.Provider value={{ size: '24px' }}>
                    <TbRefreshDot />
                </IconContext.Provider>
            </ButtonBase>
        </Stack>
    );
});
