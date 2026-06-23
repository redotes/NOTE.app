import { THEMES } from '../config/themes'

export function getTheme(themeId) {
  if (THEMES[themeId]) return THEMES[themeId]
  try {
    const customs = JSON.parse(localStorage.getItem('sm_custom_themes') || '[]')
    const custom = customs.find(t => t.id === themeId)
    if (custom) return THEMES[custom.baseLayout] || THEMES.classic
  } catch {}
  return THEMES.classic
}

export function getCustomThemes() {
  try { return JSON.parse(localStorage.getItem('sm_custom_themes') || '[]') } catch { return [] }
}

export function saveCustomThemes(themes) {
  localStorage.setItem('sm_custom_themes', JSON.stringify(themes))
}
