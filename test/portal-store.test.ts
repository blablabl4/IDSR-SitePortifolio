import { describe, it, expect, beforeEach } from 'vitest';
import { usePortalStore } from '../src/lib/portal-store';

describe('Portal Store (Zustand)', () => {
  beforeEach(() => {
    usePortalStore.setState({
      portalState: 'closed',
      activeProjectId: null,
      audioEnabled: false,
    });
  });

  it('should initialize with closed portal state', () => {
    const state = usePortalStore.getState();
    expect(state.portalState).toBe('closed');
    expect(state.activeProjectId).toBeNull();
    expect(state.audioEnabled).toBe(false);
  });

  it('should transition to opening state when openPortal is called', () => {
    usePortalStore.getState().openPortal('nfparser', { x: 100, y: 200 });
    const state = usePortalStore.getState();
    expect(state.portalState).toBe('opening');
    expect(state.activeProjectId).toBe('nfparser');
    expect(state.transitionOrigin).toEqual({ x: 100, y: 200 });
  });

  it('should select project correctly', () => {
    usePortalStore.getState().selectProject('streamassist');
    expect(usePortalStore.getState().activeProjectId).toBe('streamassist');
  });

  it('should toggle audio state', () => {
    expect(usePortalStore.getState().audioEnabled).toBe(false);
    usePortalStore.getState().toggleAudio();
    expect(usePortalStore.getState().audioEnabled).toBe(true);
  });
});
