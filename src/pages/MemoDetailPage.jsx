import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Trash2, Loader2, Copy, Check, Home } from 'lucide-react'
import { getMemo, deleteMemo } from '../utils/storage'
import { TYPE_CONFIG } from '../config/types'
import { THEMES } from '../config/themes'
import { useTheme } from '../context/ThemeContext'
import UniversalView from '../components/UniversalView'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export default function MemoDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { themeId: globalTheme } = useTheme()
  const [memo, setMemo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => { loadMemo() }, [id])

  async function loadMemo() {
    try {
      const data = await getMemo(id)
      setMemo(data)
    } catch {
      alert('메모를 불러오지 못했습니다.')
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm('이 메모를 삭제할까요?')) return
    await deleteMemo(id)
    navigate('/')
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(memo.rawText || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400">
      <Loader2 size={24} className="animate-spin mr-2" />불러오는 중...
    </div>
  )
  if (!memo) return null

  // 저장된 테마 우선, 없으면 현재 전역 테마
  const activeThemeId = memo.themeId || globalTheme
  const theme = THEMES[activeThemeId] || THEMES.classic
  const config = TYPE_CONFIG[memo.type] || TYPE_CONFIG.meeting
  const Icon = config.icon
  const createdAt = memo.createdAt
    ? format(memo.createdAt?.toDate ? memo.createdAt.toDate() : new Date(memo.createdAt), 'yyyy년 M월 d일 HH:mm', { locale: ko })
    : ''

  return (
    <div className={`min-h-screen ${theme.pageBg}`}>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-800 text-sm font-medium">
            <ArrowLeft size={16} />목록
          </button>
          <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${config.color}`}>
            <Icon size={12} />{config.label}
          </div>
          <div className="flex gap-1">
            <button onClick={handleCopy} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
              {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
            </button>
            <button onClick={handleDelete} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
              <Trash2 size={15} />
            </button>
            <button onClick={() => navigate('/')} className="p-2 rounded-lg hover:bg-violet-50 text-slate-400 hover:text-violet-600 transition-colors" title="홈으로">
              <Home size={15} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {createdAt && <p className="text-xs text-slate-400 mb-4">{createdAt} 작성 · {theme.name} 디자인</p>}
        {memo.parsedData
          ? <UniversalView type={memo.type} data={memo.parsedData} themeId={activeThemeId} />
          : (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <pre className="text-sm text-slate-700 whitespace-pre-wrap">{memo.rawText}</pre>
            </div>
          )
        }
      </div>
    </div>
  )
}
