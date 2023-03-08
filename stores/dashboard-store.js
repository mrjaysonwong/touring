import { create } from 'zustand';

// For management dashboard
export const usersStore = create((set) => ({
  show: false,
  currentpath: '',
  toggle: () => set((state) => ({ show: !state.show })),
  handlePath: (path) => set((state) => ({ currentpath: path })),
}));

export const toursStore = create((set) => ({
  show: false,
  currentpath: '',
  toggle: () => set((state) => ({ show: !state.show })),
  handlePath: (path) => set((state) => ({ currentpath: path })),
}));

export const invoiceStore = create((set) => ({
  show: false,
  currentpath: '',
  toggle: () => set((state) => ({ show: !state.show })),
  handlePath: (path) => set((state) => ({ currentpath: path })),
}));
