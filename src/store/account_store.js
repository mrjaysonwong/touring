import { create } from 'zustand';

export const useCurrencyStore = create((set) => ({
  edit: false,
  save: false,
  error: false,
  message: null,
  value: '',
  setClick: () => set({ edit: true, save: false, error: false }),
  showApiError: (err) => set({error: true, message: `${err}`}),
}));

export const useSiteLanguageStore = create((set) => ({
  edit: false,
  save: false,
  error: false,
  message: null,
  value: '',
  setClick: () => set({ edit: true, save: false, error: false }),
  showApiError: (err) => set({error: true, message: `${err}`}),
}));



