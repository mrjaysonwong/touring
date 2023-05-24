import { create } from 'zustand';

// For management dashboard
export const userStore = create((set) => ({
  show: false,
  currentPath: '',
  toggle: () => set((state) => ({ show: !state.show })),
  setCurrentPath: (path) => set((state) => ({ currentPath: path })),
}));

export const tourStore = create((set) => ({
  show: false,
  currentPath: '',
  toggle: () => set((state) => ({ show: !state.show })),
  setCurrentPath: (path) => set((state) => ({ currentPath: path })),
}));

export const invoiceStore = create((set) => ({
  show: false,
  currentPath: '',
  toggle: () => set((state) => ({ show: !state.show })),
  setCurrentPath: (path) => set((state) => ({ currentPath: path })),
}));
