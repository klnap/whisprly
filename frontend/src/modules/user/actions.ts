'use server'

// import { User } from '@/modules/auth/types';
// import { cookies } from 'next/headers';
// import { apiClient } from '@/lib/api';
// import { ENDPOINTS } from './config';

// export async function getProfile() {
//   try {
//     const response = await apiClient(ENDPOINTS.PROFILE, {
//       method: 'GET',
//     }) as { data: { user: User } };
    
//     return response.data.user
    
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     if (error instanceof Error) {
//       throw error;
//     } else {
//       throw new Error('An unexpected error occurred while fetching user profile');
//     }
//   }
// }

// export async function updateProfile(userData: Partial<User>) {
//   try {
//     const response = await apiClient(ENDPOINTS.UPDATE_PROFILE, {
//       method: 'PUT',
//       body: JSON.stringify(userData),
//     }) as { data: { user: User } };
    
//     return response.data.user;
//   } catch (error) {
//     console.error('Error updating user profile:', error);
//     if (error instanceof Error) {
//       throw error;
//     } else {
//       throw new Error('An unexpected error occurred while updating user profile');
//     }
//   }
// }


// export async function changeAvatar(formData: FormData) {
//   try {
//     const response = await apiClient(ENDPOINTS.CHANGE_AVATAR, {
//       method: 'POST',
//       body: formData,
//       // Nie ustawiamy Content-Type, aby przeglądarka mogła ustawić odpowiedni boundary dla multipart/form-data
//     }) as { data: { user: User } };

//     return response.data.user;
//   } catch (error) {
//     console.error('Error changing avatar:', error);
//     if (error instanceof Error) {
//       throw error;
//     } else {
//       throw new Error('An unexpected error occurred while changing avatar');
//     }
//   }
// }

