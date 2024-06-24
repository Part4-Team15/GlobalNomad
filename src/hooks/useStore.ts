import { create } from 'zustand';

interface ToggleState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const useStore = create<ToggleState>((set) => ({
  darkMode: true,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));

export default useStore;
