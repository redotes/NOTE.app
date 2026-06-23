import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'

export default function PageHeader({ title, backLabel = '뒤로', onBack, right, showHome = true }) {
  const navigate = useNavigate()
  const handleBack = onBack || (() => navigate(-1))

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-slate-600 hover:text-slate-800 text-sm font-medium"
        >
          <ArrowLeft size={16} />{backLabel}
        </button>

        <span className="font-semibold text-slate-800">{title}</span>

        <div className="flex items-center gap-2">
          {right}
          {showHome && (
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-xl text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
              title="홈으로"
            >
              <Home size={16} />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
