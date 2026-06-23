import { THEMES } from '../config/themes'
import { getTheme } from '../utils/getTheme'
import { TYPE_CONFIG } from '../config/types'
import { toSections } from '../utils/toSections'
import {
  Users, ClipboardList, CheckCircle, Zap, MessageSquare, Sun, Hotel, Car, Wallet,
  Lightbulb, Info, Target, Flag, CheckSquare, AlertTriangle, BookOpen, Brain,
  FileText, Star, Quote, HelpCircle, ShoppingCart, Tag, List, ArrowRight,
  Sparkles, Heart, RefreshCw, Sunrise, Clock
} from 'lucide-react'

const ICON_MAP = {
  Users, ClipboardList, CheckCircle, Zap, MessageSquare, Sun, Hotel, Car, Wallet,
  Lightbulb, Info, Target, Flag, CheckSquare, AlertTriangle, BookOpen, Brain,
  FileText, Star, Quote, HelpCircle, ShoppingCart, Tag, List, ArrowRight,
  Sparkles, Heart, RefreshCw, Sunrise, Clock,
}

function getIcon(name) {
  const I = ICON_MAP[name]
  return I ? <I size={15} /> : null
}

// ── 섹션 렌더러들 ──────────────────────────────────────────────────────────
function SectionWrapper({ s, t, children }) {
  return (
    <div className={t.card}>
      <div className={`flex items-center gap-2 mb-3 ${t.icon}`}>
        {getIcon(s.icon)}
        <h3 className={t.title}>{s.title}</h3>
      </div>
      {children}
    </div>
  )
}

function ListSection({ s, t }) {
  return (
    <SectionWrapper s={s} t={t}>
      <ul className="space-y-2">
        {s.items.map((item, i) => (
          <li key={i} className={`flex items-start gap-2 ${t.text}`}>
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${t.bullet}`} />
            {item}
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}

function NumberedSection({ s, t }) {
  return (
    <SectionWrapper s={s} t={t}>
      <ul className="space-y-2">
        {s.items.map((item, i) => (
          <li key={i} className={`flex items-start gap-3 ${t.text}`}>
            <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 opacity-80 ${t.bullet} text-white`}>{i + 1}</span>
            {item}
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}

function ChecklistSection({ s, t, isDone }) {
  return (
    <SectionWrapper s={s} t={t}>
      <ul className="space-y-2">
        {s.items.map((item, i) => (
          <li key={i} className={`flex items-start gap-3 ${isDone ? 'opacity-60' : ''} ${t.text}`}>
            <span className={`${t.checkBox} ${isDone ? 'bg-current' : ''}`} />
            <span className={isDone ? 'line-through' : ''}>{item}</span>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}

function ChipsSection({ s, t }) {
  return (
    <SectionWrapper s={s} t={t}>
      <div className="flex flex-wrap gap-2">
        {s.items.map((item, i) => (
          <span key={i} className={t.chip}>{item}</span>
        ))}
      </div>
    </SectionWrapper>
  )
}

function TimelineSection({ s, t }) {
  return (
    <SectionWrapper s={s} t={t}>
      <div className="space-y-1">
        {s.items.map((item, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className={t.timelineDot}>{i + 1}</span>
              {i < s.items.length - 1 && <div className={`min-h-3 ${t.timelineLine}`} />}
            </div>
            <div className="pb-3 flex-1">
              <p className={`font-semibold ${t.text}`}>{item.label}</p>
              {item.sub?.map((sub, j) => (
                <p key={j} className={`text-xs mt-1 opacity-80 ${t.text}`}>· {sub}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}

function TextSection({ s, t }) {
  return (
    <SectionWrapper s={s} t={t}>
      <p className={`leading-relaxed ${t.text}`}>{s.content}</p>
    </SectionWrapper>
  )
}

function TagsSection({ s, t, theme }) {
  return (
    <SectionWrapper s={s} t={t}>
      <div className="flex flex-wrap gap-2">
        {s.items.map((tag, i) => (
          <span key={i} className={theme.tagBg}>#{tag}</span>
        ))}
      </div>
    </SectionWrapper>
  )
}

function QuotesSection({ s, t }) {
  return (
    <SectionWrapper s={s} t={t}>
      <div className="space-y-3">
        {s.items.map((q, i) => (
          <blockquote key={i} className={`border-l-2 pl-3 italic text-sm ${t.text} border-current opacity-70`}>
            "{q}"
          </blockquote>
        ))}
      </div>
    </SectionWrapper>
  )
}

function KeyValueSection({ s, t }) {
  return (
    <SectionWrapper s={s} t={t}>
      <dl className="space-y-1.5">
        {s.items.map(([key, val], i) => (
          <div key={i} className="flex gap-2 text-sm">
            <dt className={`font-semibold flex-shrink-0 ${t.title}`}>{key}</dt>
            <dd className={t.text}>{val}</dd>
          </div>
        ))}
      </dl>
    </SectionWrapper>
  )
}

function ShopListSection({ s, t }) {
  return (
    <SectionWrapper s={s} t={t}>
      <ul className="divide-y divide-current divide-opacity-10">
        {s.items.map((item, i) => (
          <li key={i} className={`flex items-center justify-between py-2 ${t.text}`}>
            <div className="flex items-center gap-2">
              <span className={t.checkBox} />
              <span className={item.done ? 'line-through opacity-50' : ''}>{item.name}</span>
            </div>
            {item.price && <span className="text-xs opacity-60 font-medium">{item.price}원</span>}
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}

// ── 헤더 ──────────────────────────────────────────────────────────────────
function Header({ type, data, theme }) {
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.meeting
  const Icon = config.icon

  // 부제 정보 수집
  const meta = []
  if (data.date) meta.push(data.date)
  if (data.destination) meta.push(data.destination)
  if (data.duration) meta.push(data.duration)
  if (data.author) meta.push(data.author)
  if (data.mood) meta.push(data.mood)
  if (data.timeline) meta.push(data.timeline)

  return (
    <div className={theme.headerBg}>
      <div className={`flex items-center gap-2 mb-2 ${theme.headerLabel}`}>
        <Icon size={14} />
        <span>{config.label}</span>
      </div>
      <h1 className={theme.headerTitle}>{data.title}</h1>
      {meta.length > 0 && (
        <div className={`flex flex-wrap gap-3 mt-3 ${theme.headerMeta}`}>
          {meta.map((m, i) => <span key={i}>{m}</span>)}
        </div>
      )}
    </div>
  )
}

// ── 메인 컴포넌트 ──────────────────────────────────────────────────────────
export default function UniversalView({ type, data, themeId }) {
  const theme = getTheme(themeId)
  const sections = toSections(type, data)

  return (
    <div className={theme.wrapper}>
      <Header type={type} data={data} theme={theme} />

      {sections.map((s, i) => {
        const t = theme.sections[i % theme.sections.length]

        switch (s.type) {
          case 'list':      return <ListSection      key={i} s={s} t={t} />
          case 'numbered':  return <NumberedSection  key={i} s={s} t={t} />
          case 'checklist': return <ChecklistSection key={i} s={s} t={t} />
          case 'done':      return <ChecklistSection key={i} s={s} t={t} isDone />
          case 'chips':     return <ChipsSection     key={i} s={s} t={t} />
          case 'timeline':  return <TimelineSection  key={i} s={s} t={t} />
          case 'text':      return <TextSection      key={i} s={s} t={t} />
          case 'tags':      return <TagsSection      key={i} s={s} t={t} theme={theme} />
          case 'quotes':    return <QuotesSection    key={i} s={s} t={t} />
          case 'keyvalue':  return <KeyValueSection  key={i} s={s} t={t} />
          case 'shoplist':  return <ShopListSection  key={i} s={s} t={t} />
          default:          return <ListSection      key={i} s={s} t={t} />
        }
      })}
    </div>
  )
}
