import { Plane, MapPin, Clock, Hotel, Car, Wallet, Lightbulb, Sun } from 'lucide-react'

export default function TravelView({ data }) {
  return (
    <div className="animate-slide-up space-y-4">
      {/* 헤더 */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-2 opacity-80 text-sm">
          <Plane size={14} />
          <span>여행 계획</span>
        </div>
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <div className="flex flex-wrap gap-4 mt-3 text-emerald-100 text-sm">
          {data.destination && (
            <div className="flex items-center gap-1.5">
              <MapPin size={14} />
              {data.destination}
            </div>
          )}
          {data.duration && (
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              {data.duration}
            </div>
          )}
        </div>
      </div>

      {/* 일차별 일정 */}
      {data.days?.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4 text-slate-700">
            <Sun size={16} />
            <h3 className="font-semibold">일차별 일정</h3>
          </div>
          <div className="space-y-4">
            {data.days.map((day, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  {i < data.days.length - 1 && <div className="w-0.5 flex-1 bg-emerald-100 mt-1" />}
                </div>
                <div className="pb-4 flex-1">
                  <p className="font-semibold text-slate-800 text-sm mb-2">{day.label}</p>
                  <ul className="space-y-1.5">
                    {day.activities.map((act, j) => (
                      <li key={j} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                        {act}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 숙박 */}
        {data.hotels?.length > 0 && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3 text-indigo-700">
              <Hotel size={16} />
              <h3 className="font-semibold text-sm">숙박</h3>
            </div>
            <ul className="space-y-2">
              {data.hotels.map((h, i) => (
                <li key={i} className="text-sm text-indigo-800 flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 교통 */}
        {data.transportation?.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3 text-amber-700">
              <Car size={16} />
              <h3 className="font-semibold text-sm">교통</h3>
            </div>
            <ul className="space-y-2">
              {data.transportation.map((t, i) => (
                <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 예산 */}
      {data.budget && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2 text-rose-700">
            <Wallet size={16} />
            <h3 className="font-semibold text-sm">예산</h3>
          </div>
          <p className="text-sm text-rose-800">{data.budget}</p>
        </div>
      )}

      {/* 팁/메모 */}
      {data.tips?.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-yellow-700">
            <Lightbulb size={16} />
            <h3 className="font-semibold text-sm">여행 팁 & 메모</h3>
          </div>
          <ul className="space-y-2">
            {data.tips.map((tip, i) => (
              <li key={i} className="text-sm text-yellow-800 flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
