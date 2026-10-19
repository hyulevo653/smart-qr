import { toast } from 'react-hot-toast';

export function showSuccessMessage(message: string, options?: any) {
    toast.dismiss();
    toast.success(message, options);
}

// show error message
export function showErrorMessage(message: string) {
    toast.dismiss();
    toast.error(message);
}
