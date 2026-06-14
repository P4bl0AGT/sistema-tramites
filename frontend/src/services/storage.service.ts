export const storageKeys = {
  token: 'token',
  user: 'user',
  selectedTramite: 'tramites_selected',
  darkMode: 'muni-dark-mode',
  zoomLevel: 'muni-zoom-level',
} as const;

const hasStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage);

export const storageService = {
  get(key: string): string | null {
    if (!hasStorage()) return null;
    return window.localStorage.getItem(key);
  },

  set(key: string, value: string): void {
    if (!hasStorage()) return;
    window.localStorage.setItem(key, value);
  },

  remove(key: string): void {
    if (!hasStorage()) return;
    window.localStorage.removeItem(key);
  },

  getJson<T>(key: string): T | null {
    const raw = this.get(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      this.remove(key);
      return null;
    }
  },

  setJson<T>(key: string, value: T): void {
    this.set(key, JSON.stringify(value));
  },
};
