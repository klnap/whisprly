'use client';

import Button from "@/components/shared/Button";
import { useState } from "react";
import { toast } from 'sonner';

export default function ResetPasswordButton() {

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
  
    const handleResetPassword = async () => {
      setIsLoading(true);
      setMessage('');
      
      try {
        // Tutaj będzie wywołanie API do wysłania emaila z resetem hasła
        // Na razie symulujemy opóźnienie
        toast.success('Link do zmiany hasła został wysłany na Twój adres email.');
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMessage('Link do zmiany hasła został wysłany na Twój adres email.');
      } catch (error) {
        setMessage('Wystąpił błąd. Spróbuj ponownie później.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    return (
        <Button 
        onClick={handleResetPassword} 
        isLoading={isLoading}
        variant="outline" 
        className="border-white text-red-500 hover:bg-white hover:bg-opacity-10 w-full"
      >
        Change password
      </Button>
      
      )
    
}


