import { useState, useEffect } from 'react'
import { createContext, ReactNode } from 'react'

type Theme = 'light' | 'dark'


type ThemeContextProviderProps = {
  children: ReactNode
}

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storageTheme = localStorage.getItem("@Letmeask: theme");

    if (storageTheme === null) {
      return 'light'
    }

    return storageTheme as Theme
  })

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    localStorage.setItem("@Letmeask: theme", theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}