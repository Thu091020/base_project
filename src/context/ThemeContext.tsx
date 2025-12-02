import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ThemeConfig } from 'antd';
import { ConfigProvider } from 'antd';

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const lightAntTheme: ThemeConfig = {
  token: {
    colorPrimary: '#8229E3',
    borderRadius: 8,
  },
};

const darkAntTheme: ThemeConfig = {
  token: {
    colorPrimary: '#8229E3',
    borderRadius: 8,
    colorBgBase: '#0F0F0F',
    colorTextBase: '#FFFFFF',
  },
  algorithm: undefined,
};

const STORAGE_KEY = 'app-theme-mode';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (stored === 'light' || stored === 'dark') {
      setMode(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(
    () => ({
      mode,
      toggleMode,
    }),
    [mode],
  );

  const theme = mode === 'dark' ? darkAntTheme : lightAntTheme;

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
};


