import { APP_CODE, CAPT_KEY } from '@/constants';
import { Contact } from '@/types';
import { axiosClient } from './axios-client';

export const contactApi = {
    sendContact
};

function sendContact(contact: Contact) {
    return axiosClient.post('/pub/contacts', { ...contact, code: APP_CODE, captkey: CAPT_KEY });
}
