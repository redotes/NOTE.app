import { BookOpen, User, Brain, FileText, Quote, Star, HelpCircle } from 'lucide-react'

export default function StudyView({ data }) {
  return (
    <div className="animate-slide-up space-y-4">
      <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-2 opacity-80 text-sm">
          <BookOpen size={14} />
          <span>학습 · 독서 노트</span>
        </div>
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <div className="flex flex-wrap gap-4 mt-3 text-sky-100 text-sm">
          {data.author && <div className="flex items-center gap-1.5"><User size={13} />{data.author}</div>}
          {data.subject && <div className="flex items-center gap-1.5"><Brain size={13} />{data.subject}</div>}
        </div>
      </div>

      {data.keyConcepts?.length > 0 && (
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-sky-700">
            <Brain size={16} />
            <h3 className="font-semibold">핵심 개념</h3>
          </div>
          <ul className="space-y-2">
            {data.keyConcepts.map((c, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-sky-800">
                <span className="flex-shrink-0 w-5 h-5 rounded bg-sky-200 text-sky-700 flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.summary && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-slate-700">
            <FileText size={16} />
            <h3 className="font-semibold">요약</h3>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.takeaways?.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-emerald-700">
            <Star size={16} />
            <h3 className="font-semibold">인사이트 & 배운 점</h3>
          </div>
          <ul className="space-y-2">
            {data.takeaways.map((t, i) => (
              <li key={i} className="text-sm text-emerald-800 flex items-start gap-2">
                <Star size={12} className="mt-1 flex-shrink-0 fill-emerald-400 text-emerald-400" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.quotes?.length > 0 && (
        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-violet-700">
            <Quote size={16} />
            <h3 className="font-semibold">인용구</h3>
          </div>
          <div className="space-y-3">
            {data.quotes.map((q, i) => (
              <blockquote key={i} className="border-l-3 border-violet-400 pl-4 text-sm text-violet-800 italic">"{q}"</blockquote>
            ))}
          </div>
        </div>
      )}

      {data.questions?.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-amber-700">
            <HelpCircle size={16} />
            <h3 className="font-semibold">질문 & 의문점</h3>
          </div>
          <ul className="space-y-2">
            {data.questions.map((q, i) => (
              <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                <span className="mt-0.5 text-amber-500 font-bold flex-shrink-0">Q.</span>
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
