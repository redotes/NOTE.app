import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Palette, Type, Layout, Pencil, Eraser, RotateCcw, Upload, Eye, Home } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { THEMES } from '../config/themes'
import UniversalView from '../components/UniversalView'

const COLOR_PRESETS = [
  '#7c3aed','#2563eb','#059669','#d97706','#dc2626',
  '#6366f1','#ec4899','#14b8a6','#f59e0b','#64748b',
  '#a78bfa','#93c5fd','#6ee7b7','#fcd34d','#fca5a5',
  '#1e1b4b','#0f172a','#134e4a','#431407','#450a0a',
  '#ffffff','#f1f5f9','#e2e8f0','#94a3b8','#1e293b',
]

const FONT_OPTIONS = [
  { id: 'sans', label: '기본 (산세리프)', cls: 'font-sans', preview: '안녕하세요 Hello 123' },
  { id: 'serif', label: '세리프', cls: 'font-serif', preview: '안녕하세요 Hello 123' },
  { id: 'mono', label: '모노스페이스', cls: 'font-mono', preview: 'Hello World 123' },
]

const EMOJI_OPTIONS = ['✨','🎨','💎','🌟','🔥','💜','🌸','🌊','🍀','⚡','🦋','🌙','🎯','🏆','🦄','🎭']

const SAMPLE = {
  type: 'meeting',
  data: {
    title: '마케팅팀 주간 회의',
    date: '2024.06.22',
    attendees: ['김민준', '이서연'],
    decisions: ['릴스 주 3회 제작 확정'],
    actionItems: ['콘텐츠 캘린더 작성 (6/25)'],
    notes: ['인플루언서 ROI 15% 향상'],
  }
}

function CustomMiniCard({ name, emoji, colors, coverImage }) {
  const bg = `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`
  return (
    <div className="w-full h-44 rounded-xl overflow-hidden relative select-none" style={{ background: bg }}>
      {coverImage && (
        <img src={coverImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
      )}
      <div className="absolute inset-x-3 top-3 h-9 rounded-lg flex items-center gap-2 px-3"
        style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
        <div className="w-3 h-3 rounded-full bg-white opacity-50" />
        <div className="h-2 rounded bg-white opacity-50 w-32" />
      </div>
      {[0,1,2].map(i => (
        <div key={i} className="absolute inset-x-3 h-7 rounded-lg flex items-center gap-2 px-2"
          style={{ top: `${56 + i * 32}px`, backgroundColor: `${colors[(i+2) % colors.length]}50`, border: `1px solid ${colors[(i+2) % colors.length]}70` }}>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[(i+2) % colors.length], opacity: 0.8 }} />
          <div className="h-1.5 rounded flex-1 opacity-50" style={{ backgroundColor: colors[(i+2) % colors.length] }} />
        </div>
      ))}
      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
        <span className="text-white text-xs font-bold opacity-80 tracking-wide">{name}</span>
        <span className="text-lg">{emoji}</span>
      </div>
    </div>
  )
}

export default function DesignBuilderPage() {
  const navigate = useNavigate()
  const { addCustomTheme, setThemeId } = useTheme()

  const [name, setName] = useState('나의 디자인')
  const [emoji, setEmoji] = useState('✨')
  const [desc, setDesc] = useState('')
  const [baseLayout, setBaseLayout] = useState('classic')
  const [font, setFont] = useState('sans')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const [colors, setColors] = useState(['#7c3aed','#2563eb','#059669','#d97706','#64748b'])
  const [activeColorIdx, setActiveColorIdx] = useState(0)

  const canvasRef = useRef(null)
  const [drawing, setDrawing] = useState(false)
  const [tool, setTool] = useState('pencil')
  const [brushSize, setBrushSize] = useState(5)
  const [brushColor, setBrushColor] = useState('#7c3aed')
  const [hasDrawing, setHasDrawing] = useState(false)
  const [canvasMode, setCanvasMode] = useState('draw')
  const [uploadedImage, setUploadedImage] = useState(null)
  const lastPos = useRef(null)

  const [tab, setTab] = useState('colors')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#f8fafc'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const src = e.touches ? e.touches[0] : e
    return { x: (src.clientX - rect.left) * scaleX, y: (src.clientY - rect.top) * scaleY }
  }

  const startDraw = useCallback((e) => {
    e.preventDefault()
    setDrawing(true)
    lastPos.current = getPos(e, canvasRef.current)
  }, [])

  const draw = useCallback((e) => {
    e.preventDefault()
    if (!drawing) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e, canvas)
    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = tool === 'eraser' ? '#f8fafc' : brushColor
    ctx.lineWidth = tool === 'eraser' ? brushSize * 4 : brushSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    lastPos.current = pos
    setHasDrawing(true)
  }, [drawing, tool, brushColor, brushSize])

  const stopDraw = useCallback(() => { setDrawing(false); lastPos.current = null }, [])

  function clearCanvas() {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#f8fafc'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    setHasDrawing(false)
    setUploadedImage(null)
  }

  function handleImageUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#f8fafc'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height)
        const x = (canvas.width - img.width * scale) / 2
        const y = (canvas.height - img.height * scale) / 2
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
        setHasDrawing(true)
        setUploadedImage(ev.target.result)
      }
      img.src = ev.target.result
    }
    reader.readAsDataURL(file)
  }

  function handleSave() {
    const coverImage = hasDrawing ? canvasRef.current.toDataURL('image/png') : null
    const id = `custom_${Date.now()}`
    addCustomTheme({ id, name, emoji, desc: desc || `${name} 스타일`, baseLayout, font, previewColors: colors, coverImage, createdAt: Date.now() })
    setThemeId(id)
    navigate('/templates')
  }

  const TABS = [
    { id: 'colors', icon: <Palette size={13} />, label: '색상' },
    { id: 'font', icon: <Type size={13} />, label: '문체' },
    { id: 'layout', icon: <Layout size={13} />, label: '레이아웃' },
    { id: 'canvas', icon: <Pencil size={13} />, label: '그림판' },
    { id: 'preview', icon: <Eye size={13} />, label: '미리보기' },
  ]

  const coverDataUrl = hasDrawing ? canvasRef.current?.toDataURL('image/png') : null

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-slate-600 hover:text-slate-800 text-sm font-medium">
            <ArrowLeft size={16} />뒤로
          </button>
          <span className="font-semibold text-slate-800">나만의 디자인 만들기</span>
          <div className="flex items-center gap-1">
            <button onClick={handleSave}
              className="flex items-center gap-2 bg-violet-600 text-white px-3 py-1.5 rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors">
              <Save size={14} />저장
            </button>
            <button onClick={() => navigate('/')} className="p-2 rounded-xl text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors" title="홈으로">
              <Home size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">

        {/* 기본 정보 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">기본 정보</p>
          <div className="flex gap-3">
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="w-14 h-14 rounded-xl border-2 border-slate-200 flex items-center justify-center text-3xl hover:border-violet-400 transition-colors"
              >{emoji}</button>
              {showEmojiPicker && (
                <div className="absolute top-16 left-0 z-30 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 grid grid-cols-8 gap-1">
                  {EMOJI_OPTIONS.map(e => (
                    <button key={e} onClick={() => { setEmoji(e); setShowEmojiPicker(false) }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-violet-50 text-xl transition-colors">{e}</button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <input value={name} onChange={e => setName(e.target.value)} placeholder="디자인 이름"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500" />
              <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="설명 (선택사항)"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
          </div>
        </div>

        {/* 탭 */}
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium transition-all ${
                tab === t.id ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        {/* 색상 탭 */}
        {tab === 'colors' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">팔레트 (5가지 색상)</p>

            <div className="flex gap-2">
              {colors.map((c, i) => (
                <button key={i} onClick={() => setActiveColorIdx(i)}
                  className={`flex-1 rounded-xl border-2 transition-all ${activeColorIdx === i ? 'border-violet-500 scale-105 shadow-md' : 'border-white shadow-sm hover:scale-102'}`}
                  style={{ backgroundColor: c, height: 48 }}
                />
              ))}
            </div>
            <p className="text-xs text-slate-400">색상 {activeColorIdx + 1} 편집 중</p>

            <div className="flex items-center gap-3">
              <input type="color" value={colors[activeColorIdx]}
                onChange={e => { const n = [...colors]; n[activeColorIdx] = e.target.value; setColors(n) }}
                className="w-12 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5 flex-shrink-0" />
              <input type="text" value={colors[activeColorIdx]}
                onChange={e => { if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) { const n = [...colors]; n[activeColorIdx] = e.target.value; setColors(n) } }}
                className="w-28 px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-violet-500" />
              <span className="text-xs text-slate-400">또는 아래 프리셋 선택</span>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-2">프리셋</p>
              <div className="flex flex-wrap gap-2">
                {COLOR_PRESETS.map(c => (
                  <button key={c} onClick={() => { const n = [...colors]; n[activeColorIdx] = c; setColors(n) }}
                    className="w-7 h-7 rounded-lg border-2 border-white shadow-sm hover:scale-110 transition-transform"
                    style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>

            <div className="h-14 rounded-xl" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2]})` }} />
          </div>
        )}

        {/* 문체 탭 */}
        {tab === 'font' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">글꼴 스타일</p>
            <div className="space-y-3">
              {FONT_OPTIONS.map(f => (
                <button key={f.id} onClick={() => setFont(f.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                    font === f.id ? 'border-violet-500 bg-violet-50' : 'border-slate-200 hover:border-slate-300'
                  }`}>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{f.label}</p>
                    {font === f.id && <p className="text-xs text-violet-600 mt-0.5">현재 선택</p>}
                  </div>
                  <span className={`text-base text-slate-500 ${f.cls}`}>{f.preview}</span>
                </button>
              ))}
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-400 mb-2">미리보기</p>
              <p className={`text-slate-700 leading-relaxed text-sm ${font === 'serif' ? 'font-serif' : font === 'mono' ? 'font-mono' : 'font-sans'}`}>
                오늘 회의에서 Q3 캠페인 방향을 결정했습니다.<br />
                <span className="text-slate-400">The quick brown fox jumps over the lazy dog.</span>
              </p>
            </div>
          </div>
        )}

        {/* 레이아웃 탭 */}
        {tab === 'layout' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">기본 레이아웃</p>
            <p className="text-xs text-slate-400">메모가 어떻게 배치될지 결정합니다</p>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(THEMES).map(([id, theme]) => (
                <button key={id} onClick={() => setBaseLayout(id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    baseLayout === id ? 'border-violet-500 bg-violet-50 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                  }`}>
                  <span className="text-2xl">{theme.emoji}</span>
                  <p className="text-sm font-semibold text-slate-800 mt-1.5">{theme.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{theme.desc}</p>
                  {baseLayout === id && <p className="text-xs text-violet-600 font-medium mt-1.5">✓ 선택됨</p>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 그림판 탭 */}
        {tab === 'canvas' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">커버 이미지</p>
              <div className="flex gap-0.5 bg-slate-100 rounded-lg p-0.5">
                {[{id:'draw',label:'그리기'},{id:'upload',label:'이미지 올리기'}].map(m => (
                  <button key={m.id} onClick={() => setCanvasMode(m.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${canvasMode === m.id ? 'bg-white shadow-sm text-violet-700' : 'text-slate-500'}`}>
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {canvasMode === 'draw' && (
              <>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex gap-0.5 bg-slate-100 rounded-lg p-0.5">
                    <button onClick={() => setTool('pencil')} className={`p-2 rounded-md transition-all ${tool === 'pencil' ? 'bg-white shadow-sm text-violet-700' : 'text-slate-500'}`}><Pencil size={14} /></button>
                    <button onClick={() => setTool('eraser')} className={`p-2 rounded-md transition-all ${tool === 'eraser' ? 'bg-white shadow-sm text-violet-700' : 'text-slate-500'}`}><Eraser size={14} /></button>
                  </div>

                  <input type="color" value={brushColor} onChange={e => setBrushColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5" />

                  <div className="flex gap-1.5">
                    {colors.map((c, i) => (
                      <button key={i} onClick={() => { setBrushColor(c); setTool('pencil') }}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                        style={{ backgroundColor: c }} />
                    ))}
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <input type="range" min="1" max="24" value={brushSize} onChange={e => setBrushSize(Number(e.target.value))}
                      className="w-20 accent-violet-600" />
                    <span className="text-xs text-slate-400 w-5 text-right">{brushSize}</span>
                  </div>

                  <button onClick={clearCanvas} className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-500 hover:text-red-500 border border-slate-200 rounded-lg transition-colors">
                    <RotateCcw size={12} />초기화
                  </button>
                </div>

                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                  <canvas ref={canvasRef} width={600} height={280} className="w-full touch-none block"
                    style={{ cursor: tool === 'eraser' ? 'cell' : 'crosshair' }}
                    onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
                    onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={stopDraw}
                  />
                </div>
                <p className="text-xs text-slate-400 text-center">자유롭게 그려서 커버 이미지를 만들어보세요</p>
              </>
            )}

            {canvasMode === 'upload' && (
              <div className="space-y-4">
                <label className="flex flex-col items-center justify-center h-52 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-violet-400 hover:bg-violet-50 transition-all">
                  <Upload size={28} className="text-slate-300 mb-3" />
                  <p className="text-sm font-medium text-slate-600">클릭하여 이미지 업로드</p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG, GIF, WebP</p>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
                {uploadedImage && (
                  <>
                    <div className="rounded-xl overflow-hidden border border-slate-200">
                      <img src={uploadedImage} alt="업로드된 이미지" className="w-full object-contain max-h-52" />
                    </div>
                    <button onClick={clearCanvas} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-500 transition-colors mx-auto">
                      <RotateCcw size={12} />이미지 제거
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* 미리보기 탭 */}
        {tab === 'preview' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">카드 미리보기</p>
              <CustomMiniCard name={name} emoji={emoji} colors={colors} coverImage={coverDataUrl} />
              <div className="text-center mt-4">
                <p className="font-semibold text-slate-800">{emoji} {name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{desc || '나만의 커스텀 디자인'}</p>
                <p className="text-xs text-violet-500 mt-1">레이아웃: {THEMES[baseLayout]?.name} 기반</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <p className="text-xs text-slate-400 mb-3 font-medium">메모 렌더링 미리보기 ({THEMES[baseLayout]?.name})</p>
              <UniversalView type={SAMPLE.type} data={SAMPLE.data} themeId={baseLayout} />
            </div>
          </div>
        )}

        {/* 저장 버튼 */}
        <button onClick={handleSave}
          className="w-full bg-violet-600 text-white py-4 rounded-2xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-violet-200">
          <Save size={18} />나만의 디자인 저장하기
        </button>
      </div>
    </div>
  )
}
