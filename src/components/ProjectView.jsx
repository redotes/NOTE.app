import { Target, Flag, CheckSquare, Users, AlertTriangle, Calendar, Info } from 'lucide-react'

function Chip({ children, color }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${color}`}>
      {children}
    </span>
  )
}

export default function ProjectView({ data }) {
  return (
    <div className="animate-slide-up space-y-4">
      {/* 헤더 */}
      <div className="bg-gradient-to-br from-violet-600 to-purple-700 text-white rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-2 opacity-80 text-sm">
          <Flag size={14} />
          <span>프로젝트 계획</span>
        </div>
        <h1 className="text-2xl font-bold">{data.title}</h1>
        {data.description && (
          <p className="mt-2 text-violet-200 text-sm leading-relaxed">{data.description}</p>
        )}
        {data.timeline && (
          <div className="flex items-center gap-1.5 mt-3 text-violet-200 text-sm">
            <Calendar size={14} />
            {data.timeline}
          </div>
        )}
      </div>

      {/* 목표 */}
      {data.goals?.length > 0 && (
        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-violet-700">
            <Target size={16} />
            <h3 className="font-semibold">프로젝트 목표</h3>
          </div>
          <ul className="space-y-2">
            {data.goals.map((g, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-violet-800">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-200 text-violet-700 flex items-center justify-center text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                {g}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 마일스톤 */}
      {data.milestones?.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4 text-slate-700">
            <Flag size={16} />
            <h3 className="font-semibold">마일스톤</h3>
          </div>
          <div className="relative">
            {data.milestones.map((m, i) => (
              <div key={i} className="flex gap-4 mb-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    M{i + 1}
                  </div>
                  {i < data.milestones.length - 1 && <div className="w-0.5 flex-1 bg-violet-200 mt-1 min-h-4" />}
                </div>
                <div className="pt-1.5 pb-2 flex-1">
                  <p className="text-sm text-slate-700">{m}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 태스크 */}
      {data.tasks?.length > 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-slate-700">
            <CheckSquare size={16} />
            <h3 className="font-semibold">태스크</h3>
          </div>
          <ul className="space-y-2">
            {data.tasks.map((task, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-700 p-2 rounded-lg hover:bg-white transition-colors">
                <span className="flex-shrink-0 w-4 h-4 rounded border-2 border-slate-300 mt-0.5" />
                {task}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 팀 */}
        {data.team?.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3 text-blue-700">
              <Users size={16} />
              <h3 className="font-semibold text-sm">팀 구성</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.team.map((member, i) => (
                <Chip key={i} color="bg-blue-100 text-blue-700">{member}</Chip>
              ))}
            </div>
          </div>
        )}

        {/* 리스크 */}
        {data.risks?.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3 text-amber-700">
              <AlertTriangle size={16} />
              <h3 className="font-semibold text-sm">리스크</h3>
            </div>
            <ul className="space-y-2">
              {data.risks.map((r, i) => (
                <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
