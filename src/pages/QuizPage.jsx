import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react'
import { THEMES } from '../config/themes'
import { useTheme } from '../context/ThemeContext'
import UniversalView from '../components/UniversalView'

const QUESTIONS = [
  {
    id: 'style',
    question: '정보를 볼 때 어떤 방식이 편한가요?',
    emoji: '👀',
    options: [
      { value: 'A', label: '색으로 한눈에', desc: '섹션마다 색이 달라서 빠르게 구분하고 싶어요' },
      { value: 'B', label: '텍스트로 집중해서', desc: '군더더기 없이 내용만 깔끔하게 보고 싶어요' },
      { value: 'C', label: '어두운 화면이 편해요', desc: '밤에 자주 사용하고 눈 피로가 걱정돼요' },
      { value: 'D', label: '부드럽고 예쁘게', desc: '보기만 해도 기분 좋은 색감이 좋아요' },
    ]
  },
  {
    id: 'mood',
    question: '선호하는 문서 분위기는?',
    emoji: '🎨',
    options: [
      { value: 'A', label: '밝고 활기찬', desc: '다양한 색상, 생동감 있는 디자인' },
      { value: 'B', label: '차분하고 깔끔한', desc: '여백이 많고 심플한 디자인' },
      { value: 'C', label: '세련되고 모던한', desc: '다크 톤, 네온 포인트 디자인' },
      { value: 'D', label: '따뜻하고 감성적인', desc: '파스텔, 둥근 모서리 디자인' },
    ]
  },
  {
    id: 'usage',
    question: '주로 어떤 용도로 사용할 예정인가요?',
    emoji: '📋',
    options: [
      { value: 'E', label: '업무·비즈니스', desc: '회의록, 프로젝트 관리, 보고서' },
      { value: 'A', label: '일상 메모', desc: '할 일, 쇼핑, 여행 계획' },
      { value: 'D', label: '개인 일기·감성', desc: '일기, 독서 노트, 아이디어' },
      { value: 'B', label: '학습·공부', desc: '강의 노트, 독서 요약, 개념 정리' },
    ]
  },
  {
    id: 'time',
    question: '주로 언제 사용하나요?',
    emoji: '⏰',
    options: [
      { value: 'A', label: '낮 (밝은 환경)', desc: '주로 밝은 곳에서 사용해요' },
      { value: 'C', label: '밤 (어두운 환경)', desc: '주로 밤에 어두운 곳에서 사용해요' },
      { value: 'B', label: '언제나 상관없음', desc: '시간에 구애받지 않아요' },
      { value: 'D', label: '여가 시간에', desc: '휴식할 때나 취미 활동 중에 써요' },
    ]
  },
  {
    id: 'priority',
    question: '디자인에서 가장 중요한 것은?',
    emoji: '⭐',
    options: [
      { value: 'A', label: '정보 구분이 명확한 것', desc: '섹션별 색상으로 쉽게 찾고 싶어요' },
      { value: 'B', label: '읽기 편한 것', desc: '글자가 잘 읽히는 심플한 디자인' },
      { value: 'C', label: '멋있어 보이는 것', desc: '세련되고 트렌디한 느낌' },
      { value: 'D', label: '귀엽고 예쁜 것', desc: '사용할 때마다 기분이 좋아지는 디자인' },
    ]
  },
]

// 답변 → 테마 매핑
function calcResult(answers) {
  const count = { A: 0, B: 0, C: 0, D: 0, E: 0 }
  answers.forEach(a => { count[a] = (count[a] || 0) + 1 })
  const top = Object.entries(count).sort((a, b) => b[1] - a[1])[0][0]
  const map = { A: 'classic', B: 'minimal', C: 'dark', D: 'pastel', E: 'business' }
  return map[top] || 'classic'
}

const SAMPLE = {
  type: 'meeting',
  data: {
    title: '마케팅팀 주간 회의',
    date: '2024.06.22',
    attendees: ['김민준', '이서연', '박지호'],
    agenda: ['Q3 캠페인 방향 검토', '소셜미디어 현황'],
    decisions: ['릴스 주 3회 제작 확정'],
    actionItems: ['콘텐츠 캘린더 작성 (6/25)'],
    notes: ['인플루언서 ROI 15% 향상'],
  }
}

export default function QuizPage() {
  const navigate = useNavigate()
  const { setThemeId } = useTheme()
  const [step, setStep] = useState(0) // 0~4: 질문, 5: 결과
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)

  function handleAnswer(value) {
    const next = [...answers, value]
    setAnswers(next)
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      const r = calcResult(next)
      setResult(r)
      setStep(5)
    }
  }

  function handleApply() {
    setThemeId(result)
    navigate('/new')
  }

  function handleReset() {
    setStep(0)
    setAnswers([])
    setResult(null)
  }

  const q = QUESTIONS[step]
  const resultTheme = result ? THEMES[result] : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => step > 0 && step < 5 ? setStep(step - 1) : navigate('/templates')}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-800 text-sm font-medium">
            <ArrowLeft size={16} />
            {step > 0 && step < 5 ? '이전' : '뒤로'}
          </button>
          <span className="font-semibold text-slate-800">성향 분석</span>
          <div className="w-16 text-right text-xs text-slate-400">
            {step < 5 ? `${step + 1} / ${QUESTIONS.length}` : '완료'}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {step < 5 ? (
          <div className="animate-slide-up">
            {/* 진행 바 */}
            <div className="mb-8">
              <div className="h-1.5 bg-slate-200 rounded-full">
                <div className="h-1.5 bg-violet-500 rounded-full transition-all duration-500"
                  style={{ width: `${((step) / QUESTIONS.length) * 100}%` }} />
              </div>
            </div>

            {/* 질문 */}
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">{q.emoji}</div>
              <h2 className="text-xl font-bold text-slate-800 leading-snug">{q.question}</h2>
            </div>

            {/* 선택지 */}
            <div className="space-y-3">
              {q.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className="w-full text-left bg-white border-2 border-slate-200 hover:border-violet-400 hover:bg-violet-50 rounded-2xl p-4 transition-all duration-150 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-violet-100 flex items-center justify-center text-sm font-bold text-slate-500 group-hover:text-violet-600 transition-colors flex-shrink-0">
                      {opt.value}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{opt.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{opt.desc}</p>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-slate-300 group-hover:text-violet-400 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          // 결과 화면
          <div className="animate-slide-up">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{resultTheme?.emoji}</div>
              <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                <Check size={14} />
                분석 완료
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                당신에게 딱 맞는 디자인은<br />
                <span className="text-violet-600">"{resultTheme?.name}"</span> 입니다!
              </h2>
              <p className="text-slate-500 mt-2 text-sm">{resultTheme?.desc}</p>
            </div>

            {/* 추천 디자인 미리보기 */}
            <div className={`rounded-2xl overflow-hidden mb-6 ${resultTheme?.pageBg || 'bg-white'}`}>
              <div className="px-4 pt-4 pb-2 bg-white/80 border-b border-slate-100">
                <p className="text-xs text-slate-500 font-medium">미리보기</p>
              </div>
              <div className="p-4">
                <UniversalView type={SAMPLE.type} data={SAMPLE.data} themeId={result} />
              </div>
            </div>

            {/* 버튼 */}
            <div className="space-y-3">
              <button onClick={handleApply}
                className="w-full bg-violet-600 text-white py-3.5 rounded-2xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
                <Check size={18} />
                이 디자인으로 메모 작성하기
              </button>
              <button onClick={() => navigate('/templates')}
                className="w-full bg-white border border-slate-200 text-slate-700 py-3 rounded-2xl font-medium hover:bg-slate-50 transition-colors text-sm">
                다른 디자인 직접 고르기
              </button>
              <button onClick={handleReset}
                className="w-full text-slate-400 hover:text-slate-600 py-2 text-sm flex items-center justify-center gap-1.5 transition-colors">
                <RotateCcw size={13} />
                다시 검사하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
