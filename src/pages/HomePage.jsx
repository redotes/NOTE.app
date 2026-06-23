import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Loader2, StickyNote, Palette } from 'lucide-react'
import MemoCard from '../components/MemoCard'
import { getMemos, deleteMemo } from '../utils/firestore'
import { TYPE_CONFIG } from '../config/types'
import { THEMES } from '../config/themes'
import { useTheme } from '../context/ThemeContext'

export default function HomePage() {
  const navigate = useNavigate()
  const { themeId } = useTheme()
  const [memos, setMemos] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState('')

  useEffect(() => { loadMemos() }, [])

  async function loadMemos() {
    try {
      setLoading(true)
      const data = await getMemos()
      setMemos(data)
    } catch {
      setError('메모를 불러오지 못했습니다. Firebase 설정을 확인해주세요.')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('이 메모를 삭제할까요?')) return
    try {
      await deleteMemo(id)
      setMemos(memos.filter(m => m.id !== id))
    } catch {
      alert('삭제에 실패했습니다.')
    }
  }

  const filtered = memos.filter(m => {
    const matchType = filter === 'all' || m.type === filter
    const matchSearch = !search || m.title?.includes(search) || m.rawText?.includes(search)
    return matchType && matchSearch
  })

  const theme = THEMES[themeId]

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${theme?.previewColors[0] || '#7c3aed'}, ${theme?.previewColors[1] || '#2563eb'})` }}>
              <StickyNote size={16} className="text-white" />
            </div>
            <span className="font-bold text-slate-800 text-lg">SmartMemo</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate('/templates')}
              className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 bg-white text-slate-600 rounded-xl text-sm font-medium hover:border-violet-300 hover:text-violet-600 transition-colors">
              <Palette size={14} />
              디자인
            </button>
            <button onClick={() => navigate('/new')}
              className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors">
              <Plus size={16} />
              새 메모
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* 검색 */}
        <div className="mb-4 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="메모 검색..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" />
        </div>

        {/* 카테고리 필터 */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          <button onClick={() => setFilter('all')}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-violet-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-violet-300'}`}>
            전체
            {memos.length > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${filter === 'all' ? 'bg-white/20 text-white' : 'bg-violet-100 text-violet-700'}`}>
                {memos.length}
              </span>
            )}
          </button>
          {Object.entries(TYPE_CONFIG).map(([t, cfg]) => {
            const Icon = cfg.icon
            const count = memos.filter(m => m.type === t).length
            return (
              <button key={t} onClick={() => setFilter(t)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === t ? 'bg-violet-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-violet-300'}`}>
                <Icon size={13} />{cfg.label}
                {count > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${filter === t ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* 에러 */}
        {error && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 mb-4 text-sm">
            ⚠️ {error} — <button onClick={loadMemos} className="underline">다시 시도</button>
          </div>
        )}

        {/* 목록 */}
        {loading ? (
          <div className="flex justify-center items-center py-20 text-slate-400">
            <Loader2 size={24} className="animate-spin mr-2" />불러오는 중...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <StickyNote size={28} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">메모가 없습니다</p>
            <p className="text-slate-400 text-sm mt-1">새 메모를 작성해보세요</p>
            <button onClick={() => navigate('/new')}
              className="mt-4 inline-flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors">
              <Plus size={14} />첫 메모 작성
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-400 mb-3">{filtered.length}개의 메모</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map(memo => (
                <MemoCard key={memo.id} memo={memo}
                  onView={id => navigate(`/memo/${id}`)}
                  onDelete={handleDelete} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
