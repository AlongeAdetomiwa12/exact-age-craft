import * as React from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  // Kept for compatibility with next-themes API, but not used directly
  attribute?: string;
  defaultTheme?: Theme;
  enableSystem?: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "system",
}) => {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);

  const applyTheme = React.useCallback((value: Theme) => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    const systemPrefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const resolvedTheme =
      value === "system" ? (systemPrefersDark ? "dark" : "light") : value;

    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const storedTheme = window.localStorage.getItem("theme") as Theme | null;
    const initialTheme = storedTheme ?? defaultTheme;

    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, [defaultTheme, applyTheme]);

  const setTheme = React.useCallback(
    (value: Theme) => {
      setThemeState(value);

      if (typeof window !== "undefined") {
        window.localStorage.setItem("theme", value);
      }

      applyTheme(value);
    },
    [applyTheme]
  );

  const value = React.useMemo(
    () => ({ theme, setTheme }),
    [theme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
