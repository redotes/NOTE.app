import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Trash2, Eye } from 'lucide-react'
import { TYPE_CONFIG } from '../config/types'

export default function MemoCard({ memo, onView, onDelete }) {
  const config = TYPE_CONFIG[memo.type] || TYPE_CONFIG.meeting
  const Icon = config.icon
  const createdAt = memo.createdAt
    ? format(memo.createdAt?.toDate ? memo.createdAt.toDate() : new Date(memo.createdAt), 'yyyy.MM.dd HH:mm', { locale: ko })
    : ''

  return (
    <div
      className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all duration-200 cursor-pointer animate-fade-in"
      onClick={() => onView(memo.id)}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
          <Icon size={12} />
          {config.label}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={e => { e.stopPropagation(); onView(memo.id) }}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600">
            <Eye size={15} />
          </button>
          <button onClick={e => { e.stopPropagation(); onDelete(memo.id) }}
            className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500">
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <h3 className="font-semibold text-slate-800 text-base leading-snug mb-2 line-clamp-2">
        {memo.title || '제목 없음'}
      </h3>
      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
        {memo.rawText?.slice(0, 120)}...
      </p>
      <p className="text-xs text-slate-400 mt-3">{createdAt}</p>
    </div>
  )
}
