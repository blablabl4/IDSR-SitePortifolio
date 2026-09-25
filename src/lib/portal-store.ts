import { create } from 'zustand';

export type PortalState = 'closed' | 'opening' | 'open' | 'closing';

export interface PortalStore {
  portalState: PortalState;
  activeProjectId: string | null;
  audioEnabled: boolean;
  transitionOrigin: { x: number; y: number };
  
  // Actions
  openPortal: (projectId?: string, origin?: { x: number; y: number }) => void;
  closePortal: () => void;
  setPortalState: (state: PortalState) => void;
  selectProject: (projectId: string | null) => void;
  toggleAudio: () => void;
}

export const usePortalStore = create<PortalStore>((set, get) => ({
  portalState: 'closed',
  activeProjectId: null,
  audioEnabled: false,
  transitionOrigin: { x: typeof window !== 'undefined' ? window.innerWidth - 60 : 100, y: 80 },

  openPortal: (projectId, origin) => {
    if (get().portalState === 'opening' || get().portalState === 'open') return;

    const defaultOrigin = typeof window !== 'undefined' 
      ? { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      : { x: 500, y: 500 };

    set({
      portalState: 'opening',
      activeProjectId: projectId ?? null,
      transitionOrigin: origin ?? defaultOrigin,
    });

    // Match the 1.2s GSAP timeline duration specified
    setTimeout(() => {
      set({ portalState: 'open' });
    }, 1200);
  },

  closePortal: () => {
    if (get().portalState === 'closing' || get().portalState === 'closed') return;

    set({ portalState: 'closing' });

    // 600ms reverse transition
    setTimeout(() => {
      set({ portalState: 'closed', activeProjectId: null });
    }, 600);
  },

  setPortalState: (state) => set({ portalState: state }),

  selectProject: (projectId) => set({ activeProjectId: projectId }),

  toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),
}));
