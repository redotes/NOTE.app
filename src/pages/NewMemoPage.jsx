import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Wand2, Save, Loader2, Palette } from 'lucide-react'
import { detectType, parseContent } from '../utils/parser'
import { saveMemo } from '../utils/firestore'
import { TYPE_CONFIG, EXAMPLE_TEXTS } from '../config/types'
import { THEMES } from '../config/themes'
import { useTheme } from '../context/ThemeContext'
import UniversalView from '../components/UniversalView'

export default function NewMemoPage() {
  const navigate = useNavigate()
  const { themeId } = useTheme()
  const [text, setText] = useState('')
  const [type, setType] = useState('')
  const [parsed, setParsed] = useState(null)
  const [step, setStep] = useState('input')
  const [saving, setSaving] = useState(false)
  const [parsing, setParsing] = useState(false)

  function handleParse() {
    if (!text.trim()) return
    setParsing(true)
    setTimeout(() => {
      const detectedType = type || detectType(text)
      const parsedData = parseContent(text, detectedType)
      setType(detectedType)
      setParsed(parsedData)
      setStep('preview')
      setParsing(false)
    }, 500)
  }

  async function handleSave() {
    if (!parsed) return
    setSaving(true)
    try {
      const id = await saveMemo({ title: parsed.title, type, themeId, rawText: text, parsedData: parsed })
      navigate(`/memo/${id}`)
    } catch {
      alert('저장에 실패했습니다. Firebase 설정을 확인해주세요.')
      setSaving(false)
    }
  }

  const currentTheme = THEMES[themeId]

  return (
    <div className={`min-h-screen ${step === 'preview' ? (currentTheme?.pageBg || 'bg-slate-50') : 'bg-slate-50'}`}>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => step === 'preview' ? setStep('input') : navigate('/')}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-800 text-sm font-medium"
          >
            <ArrowLeft size={16} />
            {step === 'preview' ? '수정하기' : '뒤로'}
          </button>

          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/templates')}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-violet-600 transition-colors">
              <Palette size={13} />
              {currentTheme?.name}
            </button>
          </div>

          {step === 'preview' ? (
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-violet-700 disabled:opacity-50 transition-colors">
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              저장
            </button>
          ) : (
            <button onClick={handleParse} disabled={!text.trim() || parsing}
              className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-violet-700 disabled:opacity-50 transition-colors">
              {parsing ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
              정리하기
            </button>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {step === 'input' ? (
          <div className="space-y-5">
            {/* 카테고리 선택 */}
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">카테고리 <span className="text-slate-400 font-normal">(선택 안 하면 자동 감지)</span></p>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(TYPE_CONFIG).map(([t, cfg]) => {
                  const Icon = cfg.icon
                  return (
                    <button key={t} onClick={() => setType(type === t ? '' : t)}
                      className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl text-xs font-medium transition-all border ${
                        type === t ? `${cfg.color} border-current shadow-sm scale-105` : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                      }`}>
                      <Icon size={18} />
                      {cfg.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 예시 */}
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">예시 불러오기</p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {Object.entries(EXAMPLE_TEXTS).map(([t]) => (
                  <button key={t} onClick={() => { setText(EXAMPLE_TEXTS[t]); setType(t) }}
                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs text-slate-600 transition-colors">
                    {TYPE_CONFIG[t].label}
                  </button>
                ))}
              </div>
            </div>

            {/* 현재 디자인 표시 */}
            <div className="flex items-center gap-2 p-3 bg-violet-50 border border-violet-200 rounded-xl text-sm">
              <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: `linear-gradient(135deg, ${currentTheme?.previewColors[0]}, ${currentTheme?.previewColors[1]})` }} />
              <span className="text-violet-700 font-medium">{currentTheme?.name} 디자인으로 정리됩니다</span>
              <button onClick={() => navigate('/templates')} className="ml-auto text-xs text-violet-500 hover:text-violet-700 underline">변경</button>
            </div>

            {/* 텍스트 입력 */}
            <div>
              <textarea value={text} onChange={e => setText(e.target.value)}
                placeholder={`내용을 자유롭게 입력하세요.\n양식을 지키지 않아도 자동으로 정리해드립니다!\n\n예시:\n• 회의록 - 참석자, 안건, 결정사항, 액션아이템\n• 여행 계획 - 목적지, 일차별 일정, 숙박, 교통\n• 프로젝트 - 목표, 마일스톤, 태스크, 팀\n• 아이디어 - 영감, 상세 내용, 다음 단계\n• 학습·독서 - 핵심 개념, 요약, 인사이트\n• 쇼핑 목록 - 카테고리별 품목, 예산\n• 할 일 - 긴급/오늘/나중에\n• 일기·회고 - 하이라이트, 감사, 반성, 내일 목표`}
                className="w-full h-80 p-4 bg-white border border-slate-200 rounded-2xl text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
              />
              <p className="text-xs text-slate-400 mt-2 text-right">{text.length}자</p>
            </div>
          </div>
        ) : (
          <div>
            {/* 적용 디자인 안내 */}
            {currentTheme && (
              <div className={`border rounded-xl p-3 mb-4 text-sm flex items-center justify-between ${currentTheme.sections[0]?.card.includes('slate-900') ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-violet-50 border-violet-200 text-violet-700'}`}>
                <div className="flex items-center gap-2">
                  <Wand2 size={14} />
                  <span><strong>{currentTheme.name}</strong> 디자인으로 정리되었습니다</span>
                </div>
                <button onClick={() => navigate('/templates')} className="text-xs underline opacity-70">변경</button>
              </div>
            )}
            {parsed && <UniversalView type={type} data={parsed} themeId={themeId} />}
          </div>
        )}
      </div>
    </div>
  )
}
