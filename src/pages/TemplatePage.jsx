import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Wand2, ChevronRight, Plus, Sparkles, Trash2 } from 'lucide-react'
import { THEMES } from '../config/themes'
import { useTheme } from '../context/ThemeContext'
import UniversalView from '../components/UniversalView'

const SAMPLE = {
  type: 'meeting',
  data: {
    title: '마케팅팀 주간 회의',
    date: '2024.06.22',
    attendees: ['김민준', '이서연', '박지호'],
    agenda: ['Q3 캠페인 방향 검토', '소셜미디어 운영 현황'],
    decisions: ['릴스 주 3회 제작 확정', '유튜브 쇼츠 8월 시작'],
    actionItems: ['콘텐츠 캘린더 작성 (6/25)', '크리에이터 리스트 업 (6/28)'],
    notes: ['인플루언서 ROI 15% 향상'],
  }
}

function MiniPreview({ themeId }) {
  const theme = THEMES[themeId]
  const colors = theme.previewColors
  return (
    <div className="w-full h-44 rounded-xl overflow-hidden relative select-none"
      style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
      <div className="absolute inset-x-3 top-3 h-9 rounded-lg flex items-center gap-2 px-3"
        style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
        <div className="w-3 h-3 rounded-full bg-white opacity-50" />
        <div className="h-2 rounded bg-white opacity-50 w-32" />
      </div>
      {[0,1,2].map(i => (
        <div key={i} className="absolute inset-x-3 h-7 rounded-lg flex items-center gap-2 px-2"
          style={{ top: `${56 + i * 32}px`, backgroundColor: `${colors[i+2]||colors[2]}50`, border: `1px solid ${colors[i+2]||colors[2]}70` }}>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[i+2]||colors[2], opacity: 0.8 }} />
          <div className="h-1.5 rounded flex-1 opacity-50" style={{ backgroundColor: colors[i+2]||colors[2] }} />
          <div className="h-1.5 rounded w-12 opacity-30" style={{ backgroundColor: colors[i+2]||colors[2] }} />
        </div>
      ))}
      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
        <span className="text-white text-xs font-bold opacity-70 tracking-wide">{theme.name}</span>
        <span className="text-lg">{theme.emoji}</span>
      </div>
    </div>
  )
}

function CustomMiniPreview({ theme }) {
  const colors = theme.previewColors
  return (
    <div className="w-full h-44 rounded-xl overflow-hidden relative select-none"
      style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
      {theme.coverImage && (
        <img src={theme.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
      )}
      <div className="absolute inset-x-3 top-3 h-9 rounded-lg flex items-center gap-2 px-3"
        style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
        <div className="w-3 h-3 rounded-full bg-white opacity-50" />
        <div className="h-2 rounded bg-white opacity-50 w-32" />
      </div>
      {[0,1,2].map(i => (
        <div key={i} className="absolute inset-x-3 h-7 rounded-lg flex items-center gap-2 px-2"
          style={{ top: `${56 + i * 32}px`, backgroundColor: `${colors[(i+2)%colors.length]}50`, border: `1px solid ${colors[(i+2)%colors.length]}70` }}>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[(i+2)%colors.length], opacity: 0.8 }} />
          <div className="h-1.5 rounded flex-1 opacity-50" style={{ backgroundColor: colors[(i+2)%colors.length] }} />
        </div>
      ))}
      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
        <span className="text-white text-xs font-bold opacity-80">{theme.name}</span>
        <span className="text-lg">{theme.emoji}</span>
      </div>
      <div className="absolute top-2 left-2 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-medium">커스텀</div>
    </div>
  )
}

function TemplateCard({ themeId, selected, onSelect, onPreview }) {
  const theme = THEMES[themeId]
  return (
    <div onClick={() => onSelect(themeId)}
      className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
        selected ? 'border-violet-500 shadow-lg shadow-violet-100' : 'border-slate-200 hover:border-violet-300'
      }`}>
      <MiniPreview themeId={themeId} />
      {selected && (
        <div className="absolute top-2 right-2 w-7 h-7 bg-violet-600 rounded-full flex items-center justify-center shadow-lg">
          <Check size={14} className="text-white" />
        </div>
      )}
      <div className="p-4 bg-white">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 text-sm">{theme.emoji} {theme.name}</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{theme.desc}</p>
          </div>
          <button onClick={e => { e.stopPropagation(); onPreview(themeId) }}
            className="flex-shrink-0 text-xs text-violet-600 hover:underline font-medium pt-0.5">
            미리보기
          </button>
        </div>
        {selected && <p className="mt-2 text-xs text-violet-600 font-medium flex items-center gap-1"><Check size={11} /> 선택됨</p>}
      </div>
    </div>
  )
}

function CustomTemplateCard({ theme, selected, onSelect, onDelete, onPreview }) {
  return (
    <div onClick={() => onSelect(theme.id)}
      className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
        selected ? 'border-violet-500 shadow-lg shadow-violet-100' : 'border-slate-200 hover:border-violet-300'
      }`}>
      <CustomMiniPreview theme={theme} />
      {selected && (
        <div className="absolute top-2 right-2 w-7 h-7 bg-violet-600 rounded-full flex items-center justify-center shadow-lg">
          <Check size={14} className="text-white" />
        </div>
      )}
      <div className="p-4 bg-white">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 text-sm">{theme.emoji} {theme.name}</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{theme.desc || '나만의 커스텀 디자인'}</p>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <button onClick={e => { e.stopPropagation(); onPreview(theme) }}
              className="text-xs text-violet-600 hover:underline font-medium">미리보기</button>
            <button onClick={e => { e.stopPropagation(); onDelete(theme.id) }}
              className="p-0.5 text-slate-300 hover:text-red-400 transition-colors ml-1">
              <Trash2 size={12} />
            </button>
          </div>
        </div>
        {selected && <p className="mt-2 text-xs text-violet-600 font-medium flex items-center gap-1"><Check size={11} /> 선택됨</p>}
      </div>
    </div>
  )
}

function AddDesignCard({ onClick }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }}
      className="relative rounded-2xl border-2 border-dashed border-slate-300 hover:border-violet-400 cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-violet-50/30 group"
    >
      <div className="h-44 flex flex-col items-center justify-center gap-3">
        <div className="w-14 h-14 rounded-full border-2 border-dashed border-slate-300 group-hover:border-violet-400 flex items-center justify-center transition-colors">
          <Plus size={22} className="text-slate-300 group-hover:text-violet-500 transition-colors" />
        </div>
        <p className="text-sm text-slate-400 group-hover:text-violet-500 font-medium transition-colors">나만의 디자인</p>
      </div>
      <div className="p-4 bg-white rounded-b-2xl border-t border-dashed border-slate-200">
        <p className="text-xs text-slate-400 group-hover:text-violet-500 transition-colors font-medium">+ 새 디자인 만들기</p>
        <p className="text-xs text-slate-300 mt-0.5">색상, 그림판, 레이아웃 설정</p>
      </div>

      {hovered && (
        <div
          className="absolute z-10 pointer-events-none"
          style={{ left: mousePos.x + 14, top: mousePos.y - 36 }}
        >
          <div className="bg-violet-700 text-white text-xs px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1.5">
            <Sparkles size={11} />
            나만의 디자인 만들기
          </div>
        </div>
      )}
    </div>
  )
}

function PreviewModal({ themeId, customTheme, onClose, onSelect }) {
  const isCustom = !!customTheme
  const theme = isCustom ? THEMES[customTheme.baseLayout] || THEMES.classic : THEMES[themeId]
  const displayName = isCustom ? `${customTheme.emoji} ${customTheme.name}` : `${theme.emoji} ${theme.name}`
  const selectId = isCustom ? customTheme.id : themeId

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 overflow-y-auto" onClick={onClose}>
      <div className={`w-full max-w-md rounded-2xl overflow-hidden my-8 ${theme.pageBg}`} onClick={e => e.stopPropagation()}>
        <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <span className="font-semibold text-slate-800">{displayName}</span>
          <div className="flex gap-2">
            <button onClick={() => { onSelect(selectId); onClose() }}
              className="text-xs bg-violet-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-violet-700">
              이 디자인 선택
            </button>
            <button onClick={onClose} className="text-xs text-slate-500 hover:text-slate-700 px-2 py-1.5">닫기</button>
          </div>
        </div>
        <div className="p-4">
          <UniversalView type={SAMPLE.type} data={SAMPLE.data} themeId={isCustom ? customTheme.baseLayout : themeId} />
        </div>
      </div>
    </div>
  )
}

export default function TemplatePage() {
  const navigate = useNavigate()
  const { themeId, setThemeId, customThemes, removeCustomTheme } = useTheme()
  const [previewTheme, setPreviewTheme] = useState(null)
  const [previewCustom, setPreviewCustom] = useState(null)

  function openPreview(tid) { setPreviewTheme(tid); setPreviewCustom(null) }
  function openCustomPreview(ct) { setPreviewCustom(ct); setPreviewTheme(null) }
  function closePreview() { setPreviewTheme(null); setPreviewCustom(null) }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-slate-600 hover:text-slate-800 text-sm font-medium">
            <ArrowLeft size={16} />뒤로
          </button>
          <span className="font-semibold text-slate-800">디자인 선택</span>
          <button onClick={() => navigate('/new')}
            className="flex items-center gap-1.5 bg-violet-600 text-white px-3 py-1.5 rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors">
            작성하기<ChevronRight size={14} />
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* 퀴즈 배너 */}
        <div onClick={() => navigate('/quiz')}
          className="mb-6 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-2xl p-5 flex items-center justify-between cursor-pointer hover:opacity-95 transition-opacity">
          <div>
            <p className="font-bold">내 성향에 맞는 디자인 찾기</p>
            <p className="text-violet-200 text-sm mt-0.5">5가지 질문으로 딱 맞는 스타일 추천 받기</p>
          </div>
          <div className="flex items-center gap-1.5 bg-white/20 px-3 py-2 rounded-xl text-sm font-medium flex-shrink-0 ml-4">
            <Wand2 size={14} />시작
          </div>
        </div>

        {/* 기본 디자인 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-slate-700">디자인 고르기</h2>
          <span className="text-xs text-slate-400">현재: {THEMES[themeId]?.name || customThemes.find(t => t.id === themeId)?.name}</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.keys(THEMES).map(id => (
            <TemplateCard key={id} themeId={id} selected={themeId === id} onSelect={setThemeId} onPreview={openPreview} />
          ))}

          {/* 커스텀 테마들 */}
          {customThemes.map(ct => (
            <CustomTemplateCard key={ct.id} theme={ct} selected={themeId === ct.id}
              onSelect={setThemeId}
              onDelete={id => { removeCustomTheme(id); if (themeId === id) setThemeId('classic') }}
              onPreview={openCustomPreview}
            />
          ))}

          {/* + 나만의 디자인 만들기 */}
          <AddDesignCard onClick={() => navigate('/design-builder')} />
        </div>
      </div>

      {(previewTheme || previewCustom) && (
        <PreviewModal
          themeId={previewTheme}
          customTheme={previewCustom}
          onClose={closePreview}
          onSelect={setThemeId}
        />
      )}
    </div>
  )
}
