import { Calendar, Users, ClipboardList, CheckSquare, Zap, MessageSquare } from 'lucide-react'

function Section({ icon: Icon, title, items, color }) {
  if (!items || items.length === 0) return null
  return (
    <div className={`rounded-2xl border p-5 ${color}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon size={16} className="opacity-70" />
        <h3 className="font-semibold text-sm uppercase tracking-wide opacity-80">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-60 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function MeetingView({ data }) {
  return (
    <div className="animate-slide-up space-y-4">
      {/* 헤더 */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-2 opacity-80 text-sm">
          <ClipboardList size={14} />
          <span>회의록</span>
        </div>
        <h1 className="text-2xl font-bold leading-snug">{data.title}</h1>
        {data.date && (
          <div className="flex items-center gap-1.5 mt-3 text-blue-100 text-sm">
            <Calendar size={14} />
            {data.date}
          </div>
        )}
      </div>

      {/* 참석자 */}
      {data.attendees?.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-blue-700">
            <Users size={16} />
            <h3 className="font-semibold text-sm uppercase tracking-wide">참석자</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.attendees.map((a, i) => (
              <span key={i} className="px-3 py-1 bg-white border border-blue-200 text-blue-700 rounded-full text-sm font-medium">
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section icon={ClipboardList} title="안건" items={data.agenda} color="bg-amber-50 border-amber-200 text-amber-800" />
        <Section icon={CheckSquare} title="결정사항" items={data.decisions} color="bg-emerald-50 border-emerald-200 text-emerald-800" />
      </div>

      {/* 액션아이템 */}
      {data.actionItems?.length > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-rose-700">
            <Zap size={16} />
            <h3 className="font-semibold text-sm uppercase tracking-wide">액션 아이템</h3>
          </div>
          <ul className="space-y-2">
            {data.actionItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-rose-800">
                <span className="flex-shrink-0 w-5 h-5 rounded border-2 border-rose-300 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Section icon={MessageSquare} title="논의 내용" items={data.notes} color="bg-slate-50 border-slate-200 text-slate-700" />
    </div>
  )
}
