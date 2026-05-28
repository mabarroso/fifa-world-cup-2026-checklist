import { createContext, useContext, useEffect, useCallback, useState, type ReactNode } from 'react';

type ThemeSetting = 'auto' | 'dark' | 'light';
type ActualTheme = 'dark' | 'light';

interface ThemeContextValue {
  themeSetting: ThemeSetting;
  actualTheme: ActualTheme;
  toggleTheme: () => void;
  setThemeSetting: (setting: ThemeSetting) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeSetting, setThemeSetting] = useState<ThemeSetting>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as ThemeSetting) || 'auto';
    }
    return 'auto';
  });

  const getActualTheme = useCallback((): ActualTheme => {
    if (themeSetting === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return themeSetting;
  }, [themeSetting]);

  const [actualTheme, setActualTheme] = useState<ActualTheme>(getActualTheme);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (themeSetting === 'auto') {
        setActualTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    setActualTheme(getActualTheme());

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, [themeSetting, getActualTheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', actualTheme);
    localStorage.setItem('theme', themeSetting);
  }, [actualTheme, themeSetting]);

  const toggleTheme = () => {
    setThemeSetting((prev) => {
      if (prev === 'auto') return 'light';
      if (prev === 'light') return 'dark';
      return 'auto';
    });
  };

  return (
    <ThemeContext.Provider value={{ themeSetting, actualTheme, toggleTheme, setThemeSetting }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
