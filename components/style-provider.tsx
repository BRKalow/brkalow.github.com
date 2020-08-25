import React from 'react';

interface Theme {
  color: string;
  backgroundColor: string;
  headingColor: string;
}

const themes: Record<Themes, Partial<Theme>> = {
  initial: {
    color: '#31313f',
    backgroundColor: '#ffffff',
    headingColor: '#34343e'
  },
  dark: {
    color: 'white',
    backgroundColor: '#292932',
    headingColor: 'white'
  }
};

type Themes = 'initial' | 'dark';

export const ThemeContext = React.createContext<{
  theme: Partial<Theme>;
  name: Themes;
  setTheme: React.Dispatch<React.SetStateAction<Themes>>;
}>({
  theme: themes.initial,
  name: 'initial',
  setTheme: () => {}
});

const StyleProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = React.useState<Themes>('initial');
  const activeTheme = themes[theme];
  const themeContextValue = React.useMemo(
    () => ({ theme: { ...themes['initial'], ...themes[theme] }, name: theme, setTheme }),
    [theme, setTheme]
  );

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap');

        :root {
          overflow-x: hidden;
        }

        body {
          font-family: Open Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
            sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
          font-size: 0.9em;
          margin: 0;
          -webkit-font-smoothing: antialiased;
          padding: 5em;
          box-sizing: border-box;
          color: ${activeTheme.color};
          background-color: ${activeTheme.backgroundColor};
          transition: color 0.5s ease-out, background-color 0.5s ease-out;
        }

        @media (max-width: 667px) {
          body {
            padding: 2em;
          }
        }

        :root,
        body,
        main,
        #__next {
          height: 100%;
        }

        h1 {
          color: ${activeTheme.headingColor};
          transition: color 0.5s ease-out;
        }
      `}</style>
      <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>
    </>
  );
};

export default StyleProvider;