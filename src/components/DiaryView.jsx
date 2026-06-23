import { BookHeart, Calendar, Smile, Heart, Star, RefreshCw, Sunrise } from 'lucide-react'

const MOOD_EMOJI = { '좋음': '😊', '나쁨': '😞', '보통': '😐', '최고': '🤩', '피곤': '😴', '행복': '😄', '슬픔': '😢', '화남': '😤', 'good': '😊', 'bad': '😞', 'great': '🤩' }

export default function DiaryView({ data }) {
  const moodEmoji = data.mood ? (MOOD_EMOJI[data.mood.trim()] || '😊') : null

  return (
    <div className="animate-slide-up space-y-4">
      <div className="bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-2 opacity-80 text-sm">
          <BookHeart size={14} />
          <span>일기 · 회고</span>
        </div>
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <div className="flex flex-wrap gap-4 mt-3 text-fuchsia-100 text-sm">
          {data.date && <div className="flex items-center gap-1.5"><Calendar size={13} />{data.date}</div>}
          {data.mood && <div className="flex items-center gap-1.5"><Smile size={13} />{moodEmoji} {data.mood}</div>}
        </div>
      </div>

      {data.highlight && (
        <div className="bg-fuchsia-50 border border-fuchsia-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2 text-fuchsia-700">
            <Star size={16} />
            <h3 className="font-semibold">오늘의 하이라이트</h3>
          </div>
          <p className="text-sm text-fuchsia-800 leading-relaxed">{data.highlight}</p>
        </div>
      )}

      {data.gratitude?.length > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-rose-700">
            <Heart size={16} />
            <h3 className="font-semibold">감사한 것들</h3>
          </div>
          <ul className="space-y-2">
            {data.gratitude.map((g, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-rose-800">
                <Heart size={12} className="mt-1 flex-shrink-0 fill-rose-300 text-rose-300" />
                {g}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.reflection?.length > 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-slate-700">
            <RefreshCw size={16} />
            <h3 className="font-semibold">회고 & 반성</h3>
          </div>
          <ul className="space-y-2">
            {data.reflection.map((r, i) => (
              <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.tomorrow?.length > 0 && (
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-sky-700">
            <Sunrise size={16} />
            <h3 className="font-semibold">내일 목표</h3>
          </div>
          <ul className="space-y-2">
            {data.tomorrow.map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-sky-800">
                <span className="flex-shrink-0 w-4 h-4 rounded border-2 border-sky-300 mt-0.5" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
