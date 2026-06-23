import { Lightbulb, Sparkles, List, ArrowRight, Tag } from 'lucide-react'

export default function IdeaView({ data }) {
  return (
    <div className="animate-slide-up space-y-4">
      <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-2 opacity-80 text-sm">
          <Lightbulb size={14} />
          <span>아이디어 노트</span>
        </div>
        <h1 className="text-2xl font-bold">{data.title}</h1>
        {data.summary && <p className="mt-2 text-amber-100 text-sm leading-relaxed">{data.summary}</p>}
      </div>

      {data.inspirations?.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-yellow-700">
            <Sparkles size={16} />
            <h3 className="font-semibold">영감 & 배경</h3>
          </div>
          <ul className="space-y-2">
            {data.inspirations.map((item, i) => (
              <li key={i} className="text-sm text-yellow-800 flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.details?.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-slate-700">
            <List size={16} />
            <h3 className="font-semibold">아이디어 상세</h3>
          </div>
          <ul className="space-y-2">
            {data.details.map((item, i) => (
              <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.nextSteps?.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-orange-700">
            <ArrowRight size={16} />
            <h3 className="font-semibold">다음 실행 단계</h3>
          </div>
          <ul className="space-y-2">
            {data.nextSteps.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-orange-800">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-200 text-orange-700 flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.tags?.length > 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3 text-slate-500">
            <Tag size={14} />
            <span className="text-sm font-medium">태그</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">#{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
