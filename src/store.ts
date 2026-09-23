import { create } from 'zustand';
import type { PanelId } from './content/config';

export const useRoom = create<{
  panel: PanelId | null; sound: boolean; reducedMotion: boolean;
  open: (panel: PanelId | null) => void; setSound: (sound: boolean) => void; toggleMotion: () => void;
}>((set) => ({
  panel: null, sound: false, reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  open: (panel) => set({ panel }), setSound: (sound) => set({ sound }),
  toggleMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
}));
