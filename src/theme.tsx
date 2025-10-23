import React, { createContext, useContext } from 'react';

export type RheostatTheme = {
  themeColor: string;
  grey: string;
};

export const defaultTheme: RheostatTheme = {
  themeColor: 'palevioletred',
  grey: '#d8d8d8',
};

export const RheostatThemeContext = createContext<RheostatTheme>(defaultTheme);

export const useRheostatTheme = () => useContext(RheostatThemeContext);

type RheostatThemeProviderProps = {
  theme?: Partial<RheostatTheme>;
  children: React.ReactNode;
};

const RheostatThemeProvider = (props: RheostatThemeProviderProps) => {
  const { theme, children } = props;
  const mergedTheme: RheostatTheme = { ...defaultTheme, ...(theme || {}) };
  return (
    <RheostatThemeContext.Provider value={mergedTheme}>
      {children}
    </RheostatThemeContext.Provider>
  );
};

export default RheostatThemeProvider;
