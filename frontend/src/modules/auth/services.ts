import api from "@/lib/axios";
import { config } from "./config";
import { cookies } from "next/headers";
import { apiCall } from "@/lib/apiClient";


export const getCSRFToken = async () => {
  try {
    const response = await api.get(config.endpoints.csrfToken);
    console.log(response.data);
    return true;
  } catch (error: any) {
    console.error('Błąd podczas pobierania tokenu CSRF:', error);
    return false;
  }
};

/**
 * Logowanie użytkownika z automatycznym pobieraniem tokenu CSRF
 */
export const login = async (email: string, password: string) => {
  try {
    // Najpierw pobierz token CSRF
    await getCSRFToken();
    
    // Następnie wykonaj logowanie
    const response = await api.post(config.endpoints.login, { email, password });
    console.log(response);

    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
    return error.response;
  }
};

/**
 * Wylogowanie użytkownika z automatycznym pobieraniem tokenu CSRF
 */
export const logout = async () => {
  try {
    const response = await api.post(config.endpoints.logout);
        
    console.log(response);
    return response.data;
  } catch (error: any) {
    return error.response?.data;
  }
};

/**
 * Rejestracja nowego użytkownika z automatycznym pobieraniem tokenu CSRF
 */
export const register = async (name: string, email: string, password: string, password_confirmation: string) => {
  try {
    // Najpierw pobierz token CSRF
    await getCSRFToken();
    
    // Następnie wykonaj rejestrację
    const response = await api.post(config.endpoints.register, { 
      name, 
      email, 
      password, 
      password_confirmation 
    });
    console.log(response)

    return response.data;
  } catch (error: any) {
    console.log(error.response);
    return error.response?.data;
  }
};

/**
 * Funkcja sprawdzająca, czy cookie sesji jest ważne.
 * Do użycia w middleware tylko do sprawdzenia, czy cookie jest w poprawnym formacie.
 */


/**
 * Funkcja sprawdzająca, czy użytkownik ma uprawnienia weryfikacji adresu email.
 * Do użycia w middleware tylko do sprawdzenia formatu cookie weryfikacji.
 */
export function hasEmailVerificationCookie(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  return cookieValue === 'verified' || cookieValue === '1' || cookieValue === 'true';
}

/**
 * Funkcja do resetowania hasła z automatycznym pobieraniem tokenu CSRF
 */
export const forgotPassword = async (email: string) => {
  try {
    // Najpierw pobierz token CSRF
    await getCSRFToken();
    
    // Następnie wykonaj żądanie resetowania hasła
    const response = await api.post(config.endpoints.forgotPassword, { email });
    return response.data;
  } catch (error: any) {
    return error.response?.data;
  }
};

/**
 * Funkcja do resetowania hasła z tokenem i automatycznym pobieraniem tokenu CSRF
 */
export const resetPassword = async (token: string, email: string, password: string, password_confirmation: string) => {
  try {
    // Najpierw pobierz token CSRF
    await getCSRFToken();
    
    // Następnie wykonaj żądanie resetowania hasła
    const response = await api.post(config.endpoints.resetPassword, {
      token,
      email,
      password,
      password_confirmation
    });
    return response.data;
  } catch (error: any) {
    return error.response?.data;
  }
};

/**
 * Funkcja do weryfikacji adresu email
 */
export const verifyEmail = async (id: string, hash: string) => {
  try {
    const response = await api.get(`${config.endpoints.verifyEmail}/${id}/${hash}`);
    return response.data;
  } catch (error: any) {
    return error.response?.data;
  }
};

/**
 * Funkcja do ponownego wysłania linku weryfikacyjnego z automatycznym pobieraniem tokenu CSRF
 */
export const resendVerificationEmail = async () => {
  try {
    // Najpierw pobierz token CSRF
    await getCSRFToken();
    
    // Następnie wykonaj żądanie ponownego wysłania linku weryfikacyjnego
    const response = await api.post(config.endpoints.resendEmailVerification);
    return response.data;
  } catch (error: any) {
    return error.response?.data;
  }
};

/**
 * Pobranie profilu użytkownika
 */




