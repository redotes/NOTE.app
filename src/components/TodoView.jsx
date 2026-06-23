import { CheckSquare, Zap, Sun, Clock, CheckCircle, Calendar } from 'lucide-react'

function TaskList({ title, items, icon: Icon, color, checkColor }) {
  if (!items?.length) return null
  return (
    <div className={`rounded-2xl border p-5 ${color}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon size={16} className="opacity-70" />
        <h3 className="font-semibold text-sm">{title}</h3>
        <span className="ml-auto text-xs opacity-60">{items.length}개</span>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <span className={`flex-shrink-0 w-4 h-4 rounded border-2 mt-0.5 ${checkColor}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function TodoView({ data }) {
  const total = [...(data.urgent || []), ...(data.today || []), ...(data.later || [])].length
  const done = (data.done || []).length

  return (
    <div className="animate-slide-up space-y-4">
      <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-2 opacity-70 text-sm">
          <CheckSquare size={14} />
          <span>할 일 목록</span>
        </div>
        <h1 className="text-2xl font-bold">{data.title}</h1>
        {data.date && (
          <div className="flex items-center gap-1.5 mt-2 text-slate-300 text-sm">
            <Calendar size={13} />{data.date}
          </div>
        )}
        {(total + done) > 0 && (
          <div className="mt-3 bg-white/10 rounded-xl px-3 py-2 text-sm">
            {done}/{total + done}개 완료
            <div className="mt-1 h-1.5 bg-white/20 rounded-full">
              <div className="h-1.5 bg-emerald-400 rounded-full transition-all" style={{ width: `${(total + done) ? (done / (total + done)) * 100 : 0}%` }} />
            </div>
          </div>
        )}
      </div>

      <TaskList title="긴급 · 중요" items={data.urgent} icon={Zap}
        color="bg-rose-50 border-rose-200 text-rose-800" checkColor="border-rose-400" />
      <TaskList title="오늘 할 일" items={data.today} icon={Sun}
        color="bg-amber-50 border-amber-200 text-amber-800" checkColor="border-amber-400" />
      <TaskList title="나중에" items={data.later} icon={Clock}
        color="bg-slate-50 border-slate-200 text-slate-700" checkColor="border-slate-300" />

      {data.done?.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-emerald-700">
            <CheckCircle size={16} />
            <h3 className="font-semibold text-sm">완료됨</h3>
          </div>
          <ul className="space-y-2">
            {data.done.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-emerald-700 opacity-70">
                <CheckCircle size={14} className="flex-shrink-0 mt-0.5 fill-emerald-400 text-white" />
                <span className="line-through">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
