import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import HomePage from './pages/HomePage'
import NewMemoPage from './pages/NewMemoPage'
import MemoDetailPage from './pages/MemoDetailPage'
import TemplatePage from './pages/TemplatePage'
import QuizPage from './pages/QuizPage'
import DesignBuilderPage from './pages/DesignBuilderPage'

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<NewMemoPage />} />
        <Route path="/memo/:id" element={<MemoDetailPage />} />
        <Route path="/templates" element={<TemplatePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/design-builder" element={<DesignBuilderPage />} />
      </Routes>
    </ThemeProvider>
  )
}
