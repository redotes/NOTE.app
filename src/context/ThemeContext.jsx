import { createContext, useContext, useState, useEffect } from 'react'
import { DEFAULT_THEME } from '../config/themes'
import { getCustomThemes, saveCustomThemes } from '../utils/getTheme'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => localStorage.getItem('sm_theme') || DEFAULT_THEME)
  const [customThemes, setCustomThemes] = useState(() => getCustomThemes())

  useEffect(() => { localStorage.setItem('sm_theme', themeId) }, [themeId])

  function addCustomTheme(theme) {
    const updated = [...customThemes.filter(t => t.id !== theme.id), theme]
    setCustomThemes(updated)
    saveCustomThemes(updated)
  }

  function removeCustomTheme(id) {
    const updated = customThemes.filter(t => t.id !== id)
    setCustomThemes(updated)
    saveCustomThemes(updated)
  }

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, customThemes, addCustomTheme, removeCustomTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
