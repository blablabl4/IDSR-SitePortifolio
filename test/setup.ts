import '@testing-library/jest-dom/vitest';

// --- JSDOM Polyfills for animation/layout APIs ---

// IntersectionObserver: used by useInView hook → AnimatedSection
// Immediately triggers callback with isIntersecting: true so elements render in tests
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '0px';
  readonly thresholds: ReadonlyArray<number> = [0];

  constructor(
    private callback: IntersectionObserverCallback,
    _options?: IntersectionObserverInit,
  ) {
    // auto-trigger on next tick so observed elements appear "in view"
    setTimeout(() => {
      this.callback(
        [{ isIntersecting: true, intersectionRatio: 1 } as IntersectionObserverEntry],
        this,
      );
    }, 0);
  }

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

// ResizeObserver: used by Framer Motion layout animations
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

// matchMedia: used by responsive hooks and Framer Motion
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
