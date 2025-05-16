'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/shared/Button';
import { resendEmailVerification } from '../actions';
import { toast } from '@/components/shared/Toast';
// Klucz do przechowywania danych w localStorage
const COOLDOWN_KEY = 'emailVerificationCooldown'; 
const COOLDOWN_TIME = 60; 

export default function ResendEmailVerificationSection() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cooldown, setCooldown] = useState<number | null>(null); // Początkowo null, aby unikać migania
    const [isInitialized, setIsInitialized] = useState(false);

    // Inicjalizacja stanu cooldownu z localStorage
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const expiryTimestampStr = localStorage.getItem(COOLDOWN_KEY);
        
        let initialCooldown = COOLDOWN_TIME;
        
        if (expiryTimestampStr) {
            const expiryTimestamp = parseInt(expiryTimestampStr);
            const now = Date.now();
            
            if (expiryTimestamp > now) {
                initialCooldown = Math.ceil((expiryTimestamp - now) / 1000);
            } else {
                initialCooldown = 0;
            }
        }
        
        setCooldown(initialCooldown);
        setIsInitialized(true);
    }, []);

    // Efekt do odliczania cooldownu
    useEffect(() => {
        if (!isInitialized || cooldown === null || cooldown <= 0) return;
        
        const timer = setInterval(() => {
            setCooldown((prev: number | null) => {
                if (prev === null) return null;
                
                const newValue = prev <= 1 ? 0 : prev - 1;
                
                if (newValue === 0) {
                    localStorage.removeItem(COOLDOWN_KEY);
                    clearInterval(timer);
                } else {
           
                    const newExpiryTimestamp = Date.now() + newValue * 1000;
                    localStorage.setItem(COOLDOWN_KEY, newExpiryTimestamp.toString());
                }
                
                return newValue;
            });
        }, 1000);
    
        return () => clearInterval(timer);
    }, [cooldown, isInitialized]);

    const handleResendEmailVerification = async () => {
        if (cooldown !== null && cooldown > 0) return;

        setIsLoading(true);
        setError(null); 

        try {
            const expiryTimestamp = Date.now() + COOLDOWN_TIME * 1000;
            localStorage.setItem(COOLDOWN_KEY, expiryTimestamp.toString());
            setCooldown(COOLDOWN_TIME);
            
            const response = await resendEmailVerification();

            if (response && response.status === 'success') {
                toast.success({
                    title: 'Email wysłany',
                    description: response.message || 'Link weryfikacyjny został wysłany ponownie'
                });
            } else {
                toast.error({
                    title: 'Błąd',
                    description: response?.message || 'Nie udało się wysłać emaila weryfikacyjnego'
                });
            }
        } catch (error: any) {
            setError(error?.message || 'Wystąpił błąd');
            toast.error({
                title: 'Błąd',
                description: error?.message || 'Wystąpił błąd podczas wysyłania emaila'
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Dopóki nie zainicjujemy stanu, pokazujemy ładowanie
    if (!isInitialized || cooldown === null) {
        return (
            <div className='flex flex-col text-gray-600 items-center justify-center text-center space-y-6 max-w-[600px]'>
                <div className='space-y-4'>
                    <p className='text-lg text-black font-medium'>Didn't receive the email?</p>
                    <p>No worries! First check your spam folder. If you still can't find it, you'll be able to request a new verification link in a moment.</p>
                </div>
                
                <Button 
                    fullWidth 
                    disabled={true}
                    isLoading={true}
                >
                    Loading...
                </Button>
            </div>
        );
    }

    const isDisabled = cooldown > 0;

    return (
        <div className='flex flex-col text-gray-600 items-center justify-center text-center space-y-6 max-w-[600px]'>
            <div className='space-y-4'>
                <p className='text-lg text-black font-medium'>Didn't receive the email?</p>
                <p>No worries! First check your spam folder. If you still can't find it, you'll be able to request a new verification link in a moment.</p>
            </div>

            <Button 
                fullWidth 
                disabled={isDisabled}
                onClick={handleResendEmailVerification}
                isLoading={isLoading}
            >
                {cooldown > 0 ? (
                    <span>
                        Wait <span className="inline-block w-6 text-center">{cooldown}</span> seconds before resending
                    </span>
                ) : 'Resend Email Verification'}
            </Button>
        </div>
    );
}
