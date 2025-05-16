import api from '@/lib/axios';
import { config } from './config';
import { redirect } from 'next/navigation';

export const verifyEmail = async (email: string) => {
    try {
        const response = await api.post(config.endpoints.verifyEmail, { email });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const checkEmailVerification = async (email: string) => {
    try {

        if(!email) {
            return redirect('/verify-email');
        }

    } catch (error) {
        throw error;
    }
}

export const resendEmailVerification = async (email: string) => {
    try {
        const response = await api.post(config.endpoints.resendEmailVerification, { email });
        return response.data;
    } catch (error) {
        throw error;
    }
}



