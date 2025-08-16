import { create } from 'zustand';

interface StoreState {
  isMobile: boolean;
  theme: 'light' | 'dark';
  animationSpeed: number;
  isPerfAnalytics: boolean;
  setIsMobile: (isMobile: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setAnimationSpeed: (animationSpeed: number) => void;
  togglePerfAnalytics: () => void;
}

const useStore = create<StoreState>((set, get) => ({
  isMobile: window.innerWidth < 768,
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  animationSpeed: 1,
  isPerfAnalytics: false,
  setIsMobile: (isMobile) => set({ isMobile }),
  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    set({ theme });
  },
  setAnimationSpeed: (animationSpeed) => set({ animationSpeed }),
  togglePerfAnalytics: () => set({ isPerfAnalytics: !get().isPerfAnalytics }),
}));

// Set initial isMobile and set it onChange resize screen
const handleResize = () => {
  useStore.setState({ isMobile: window.innerWidth < 768 });
};

window.addEventListener('resize', handleResize);

export default useStore;