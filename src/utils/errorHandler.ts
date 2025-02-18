import axios from 'axios';

export const handleAxiosError = (error: any, defaultMessage: string): never => {
    if (axios.isAxiosError(error)) {
        console.error(`${defaultMessage}:`, error.message, error.response?.data);
    } else {
        console.error(`${defaultMessage}:`, error);
    }
    throw new Error(`${defaultMessage}. Please try again later.`);
};
