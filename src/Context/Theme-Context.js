import { useContext, createContext,useState,useEffect } from "react";


const ThemeContext = createContext();
const ThemeProvider = (props) => {
    const [themeObject, setThemeObject] = useState({ primary: "var(--light)", text: "var(--dark)" ,secondary: "var(--gray-700)" });
    const [theme, setTheme] = useState("dark");
    const themeHandler = (toggleTheme) => {
      setTheme(toggleTheme);
    }
    useEffect(() => {
        theme === "light" ? setThemeObject({ primary: "var(--light)", text: "var(--dark)", secondary: "var(--gray-200)" }) : setThemeObject({ primary: "var(--dark)", text: "var(--light)", secondary: "var(--gray-700)" })
    }, [theme])
    return (
        <ThemeContext.Provider value={{themeObject,theme,themeHandler}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

const useTheme = () => useContext(ThemeContext);
export { useTheme, ThemeProvider };