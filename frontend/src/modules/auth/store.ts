import { create } from 'zustand';

type ModalView = 'login' | 'register' | 'forgotPassword';

interface AuthModalStore {
  isOpen: boolean;
  currentView: ModalView;
  openModal: (view?: ModalView) => void;
  closeModal: () => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
  isOpen: false,
  currentView: 'login',
  openModal: (view: ModalView = 'login') => set({ isOpen: true, currentView: view }),
  closeModal: () => set({ isOpen: false })
})); 