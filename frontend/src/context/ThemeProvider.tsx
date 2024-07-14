import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

type Theme = "light" | "dark";

export interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  let storedTheme = (localStorage.getItem("theme") as Theme) || null;
  if (!storedTheme) {
    storedTheme = "light";
  }
  const [theme, setTheme] = useState<Theme>(storedTheme);
  const html = document.querySelector("html")?.classList!;

  useEffect(() => {
    html.add(theme);
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      html.add("dark");
      html.remove("light");
    } else {
      html.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within the ThemeProvider");
  }
  return context;
};

export default ThemeProvider;
