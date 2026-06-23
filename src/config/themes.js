export const THEMES = {
  classic: {
    id: 'classic',
    name: '클래식',
    desc: '색상 카드로 섹션을 구분하는 직관적인 디자인',
    emoji: '🎨',
    previewColors: ['#6d28d9', '#2563eb', '#f59e0b', '#10b981', '#ef4444'],

    // wrapper
    wrapper: 'space-y-4',
    pageBg: 'bg-slate-50',

    // header card
    headerBg: 'bg-gradient-to-br from-violet-600 to-blue-700 text-white rounded-2xl p-6',
    headerLabel: 'opacity-80 text-sm',
    headerTitle: 'text-2xl font-bold',
    headerMeta: 'text-violet-200 text-sm',

    // sections (cycled)
    sections: [
      { card: 'bg-blue-50 border border-blue-200 rounded-2xl p-5', title: 'text-blue-700 font-semibold text-sm', text: 'text-blue-800 text-sm', bullet: 'bg-blue-400', icon: 'text-blue-600' },
      { card: 'bg-amber-50 border border-amber-200 rounded-2xl p-5', title: 'text-amber-700 font-semibold text-sm', text: 'text-amber-800 text-sm', bullet: 'bg-amber-400', icon: 'text-amber-600' },
      { card: 'bg-emerald-50 border border-emerald-200 rounded-2xl p-5', title: 'text-emerald-700 font-semibold text-sm', text: 'text-emerald-800 text-sm', bullet: 'bg-emerald-400', icon: 'text-emerald-600' },
      { card: 'bg-rose-50 border border-rose-200 rounded-2xl p-5', title: 'text-rose-700 font-semibold text-sm', text: 'text-rose-800 text-sm', bullet: 'bg-rose-400', icon: 'text-rose-600' },
      { card: 'bg-violet-50 border border-violet-200 rounded-2xl p-5', title: 'text-violet-700 font-semibold text-sm', text: 'text-violet-800 text-sm', bullet: 'bg-violet-400', icon: 'text-violet-600' },
      { card: 'bg-slate-50 border border-slate-200 rounded-2xl p-5', title: 'text-slate-600 font-semibold text-sm', text: 'text-slate-700 text-sm', bullet: 'bg-slate-400', icon: 'text-slate-500' },
    ],
    tagBg: 'bg-violet-100 text-violet-700 rounded-full px-3 py-1 text-xs font-medium',
    checkBox: 'w-4 h-4 rounded border-2 border-slate-300 flex-shrink-0 mt-0.5',
    chip: 'px-3 py-1 bg-white border border-blue-200 text-blue-700 rounded-full text-sm font-medium',
    timelineDot: 'w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0',
    timelineLine: 'w-0.5 bg-violet-200 mt-1 flex-1',
  },

  minimal: {
    id: 'minimal',
    name: '미니멀',
    desc: '텍스트와 여백으로 집중력을 높이는 간결한 디자인',
    emoji: '◻️',
    previewColors: ['#111827', '#374151', '#6b7280', '#9ca3af', '#e5e7eb'],

    wrapper: 'space-y-3',
    pageBg: 'bg-white',

    headerBg: 'bg-gray-950 text-white rounded-xl p-6',
    headerLabel: 'opacity-50 text-xs tracking-widest font-mono uppercase',
    headerTitle: 'text-2xl font-bold tracking-tight mt-1',
    headerMeta: 'text-gray-400 text-sm',

    sections: [
      { card: 'bg-white border border-gray-200 rounded-xl p-5', title: 'text-gray-900 font-semibold text-xs tracking-widest uppercase', text: 'text-gray-600 text-sm', bullet: 'bg-gray-900', icon: 'text-gray-700' },
      { card: 'bg-white border border-gray-200 rounded-xl p-5', title: 'text-gray-900 font-semibold text-xs tracking-widest uppercase', text: 'text-gray-600 text-sm', bullet: 'bg-gray-700', icon: 'text-gray-600' },
      { card: 'bg-white border border-gray-200 rounded-xl p-5', title: 'text-gray-900 font-semibold text-xs tracking-widest uppercase', text: 'text-gray-600 text-sm', bullet: 'bg-gray-500', icon: 'text-gray-500' },
      { card: 'bg-white border border-gray-200 rounded-xl p-5', title: 'text-gray-900 font-semibold text-xs tracking-widest uppercase', text: 'text-gray-600 text-sm', bullet: 'bg-gray-400', icon: 'text-gray-400' },
      { card: 'bg-white border border-gray-200 rounded-xl p-5', title: 'text-gray-900 font-semibold text-xs tracking-widest uppercase', text: 'text-gray-600 text-sm', bullet: 'bg-gray-600', icon: 'text-gray-600' },
      { card: 'bg-white border border-gray-200 rounded-xl p-5', title: 'text-gray-900 font-semibold text-xs tracking-widest uppercase', text: 'text-gray-600 text-sm', bullet: 'bg-gray-300', icon: 'text-gray-400' },
    ],
    tagBg: 'bg-gray-100 text-gray-700 rounded px-2 py-0.5 text-xs font-mono',
    checkBox: 'w-4 h-4 rounded border-2 border-gray-400 flex-shrink-0 mt-0.5',
    chip: 'px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium',
    timelineDot: 'w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0',
    timelineLine: 'w-0.5 bg-gray-200 mt-1 flex-1',
  },

  dark: {
    id: 'dark',
    name: '다크 모드',
    desc: '눈이 편안한 어두운 배경에 네온 포인트 컬러 디자인',
    emoji: '🌙',
    previewColors: ['#0f172a', '#1e293b', '#22d3ee', '#a78bfa', '#34d399'],

    wrapper: 'space-y-4',
    pageBg: 'bg-slate-950',

    headerBg: 'bg-slate-800 border border-slate-700 text-white rounded-2xl p-6',
    headerLabel: 'opacity-50 text-xs tracking-widest font-mono uppercase',
    headerTitle: 'text-2xl font-bold mt-1',
    headerMeta: 'text-slate-400 text-sm',

    sections: [
      { card: 'bg-slate-900 border border-cyan-500/30 rounded-2xl p-5', title: 'text-cyan-400 font-semibold text-sm', text: 'text-slate-300 text-sm', bullet: 'bg-cyan-400', icon: 'text-cyan-400' },
      { card: 'bg-slate-900 border border-violet-500/30 rounded-2xl p-5', title: 'text-violet-400 font-semibold text-sm', text: 'text-slate-300 text-sm', bullet: 'bg-violet-400', icon: 'text-violet-400' },
      { card: 'bg-slate-900 border border-emerald-500/30 rounded-2xl p-5', title: 'text-emerald-400 font-semibold text-sm', text: 'text-slate-300 text-sm', bullet: 'bg-emerald-400', icon: 'text-emerald-400' },
      { card: 'bg-slate-900 border border-rose-500/30 rounded-2xl p-5', title: 'text-rose-400 font-semibold text-sm', text: 'text-slate-300 text-sm', bullet: 'bg-rose-400', icon: 'text-rose-400' },
      { card: 'bg-slate-900 border border-amber-500/30 rounded-2xl p-5', title: 'text-amber-400 font-semibold text-sm', text: 'text-slate-300 text-sm', bullet: 'bg-amber-400', icon: 'text-amber-400' },
      { card: 'bg-slate-900 border border-slate-600 rounded-2xl p-5', title: 'text-slate-400 font-semibold text-sm', text: 'text-slate-300 text-sm', bullet: 'bg-slate-500', icon: 'text-slate-400' },
    ],
    tagBg: 'bg-slate-800 text-cyan-400 border border-cyan-800 rounded px-2 py-0.5 text-xs font-mono',
    checkBox: 'w-4 h-4 rounded border-2 border-cyan-600 flex-shrink-0 mt-0.5',
    chip: 'px-3 py-1 bg-slate-800 border border-cyan-700 text-cyan-300 rounded-full text-sm font-medium',
    timelineDot: 'w-8 h-8 rounded-full bg-cyan-500 text-slate-900 flex items-center justify-center text-xs font-bold flex-shrink-0',
    timelineLine: 'w-0.5 bg-slate-700 mt-1 flex-1',
  },

  pastel: {
    id: 'pastel',
    name: '파스텔',
    desc: '부드러운 색감으로 따뜻한 느낌을 주는 감성적인 디자인',
    emoji: '🌸',
    previewColors: ['#f9a8d4', '#c4b5fd', '#93c5fd', '#6ee7b7', '#fde68a'],

    wrapper: 'space-y-4',
    pageBg: 'bg-pink-50',

    headerBg: 'bg-gradient-to-br from-pink-400 to-purple-400 text-white rounded-3xl p-6',
    headerLabel: 'opacity-80 text-sm',
    headerTitle: 'text-2xl font-bold',
    headerMeta: 'text-pink-100 text-sm',

    sections: [
      { card: 'bg-pink-50 border-2 border-pink-200 rounded-3xl p-5', title: 'text-pink-600 font-semibold text-sm', text: 'text-pink-900 text-sm', bullet: 'bg-pink-300', icon: 'text-pink-500' },
      { card: 'bg-purple-50 border-2 border-purple-200 rounded-3xl p-5', title: 'text-purple-600 font-semibold text-sm', text: 'text-purple-900 text-sm', bullet: 'bg-purple-300', icon: 'text-purple-500' },
      { card: 'bg-sky-50 border-2 border-sky-200 rounded-3xl p-5', title: 'text-sky-600 font-semibold text-sm', text: 'text-sky-900 text-sm', bullet: 'bg-sky-300', icon: 'text-sky-500' },
      { card: 'bg-green-50 border-2 border-green-200 rounded-3xl p-5', title: 'text-green-600 font-semibold text-sm', text: 'text-green-900 text-sm', bullet: 'bg-green-300', icon: 'text-green-500' },
      { card: 'bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-5', title: 'text-yellow-600 font-semibold text-sm', text: 'text-yellow-900 text-sm', bullet: 'bg-yellow-300', icon: 'text-yellow-500' },
      { card: 'bg-orange-50 border-2 border-orange-200 rounded-3xl p-5', title: 'text-orange-600 font-semibold text-sm', text: 'text-orange-900 text-sm', bullet: 'bg-orange-300', icon: 'text-orange-500' },
    ],
    tagBg: 'bg-purple-100 text-purple-600 rounded-full px-3 py-1 text-xs font-medium',
    checkBox: 'w-4 h-4 rounded-full border-2 border-pink-300 flex-shrink-0 mt-0.5',
    chip: 'px-3 py-1 bg-white border-2 border-pink-200 text-pink-600 rounded-full text-sm font-medium',
    timelineDot: 'w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 text-white flex items-center justify-center text-xs font-bold flex-shrink-0',
    timelineLine: 'w-0.5 bg-pink-200 mt-1 flex-1',
  },

  business: {
    id: 'business',
    name: '비즈니스',
    desc: '신뢰감을 주는 전문적인 문서 스타일 디자인',
    emoji: '💼',
    previewColors: ['#1e3a5f', '#2d5282', '#2b6cb0', '#4299e1', '#bee3f8'],

    wrapper: 'space-y-3',
    pageBg: 'bg-gray-50',

    headerBg: 'bg-gradient-to-r from-blue-900 to-slate-800 text-white rounded-xl p-6',
    headerLabel: 'opacity-70 text-xs tracking-widest uppercase font-semibold',
    headerTitle: 'text-2xl font-bold mt-1',
    headerMeta: 'text-blue-200 text-sm',

    sections: [
      { card: 'bg-white border-l-4 border-l-blue-800 border border-slate-200 rounded-r-xl p-5', title: 'text-blue-900 font-bold text-xs tracking-widest uppercase', text: 'text-slate-700 text-sm', bullet: 'bg-blue-800', icon: 'text-blue-700' },
      { card: 'bg-white border-l-4 border-l-slate-600 border border-slate-200 rounded-r-xl p-5', title: 'text-slate-700 font-bold text-xs tracking-widest uppercase', text: 'text-slate-700 text-sm', bullet: 'bg-slate-600', icon: 'text-slate-600' },
      { card: 'bg-white border-l-4 border-l-blue-600 border border-slate-200 rounded-r-xl p-5', title: 'text-blue-700 font-bold text-xs tracking-widest uppercase', text: 'text-slate-700 text-sm', bullet: 'bg-blue-600', icon: 'text-blue-600' },
      { card: 'bg-white border-l-4 border-l-slate-500 border border-slate-200 rounded-r-xl p-5', title: 'text-slate-600 font-bold text-xs tracking-widest uppercase', text: 'text-slate-700 text-sm', bullet: 'bg-slate-500', icon: 'text-slate-500' },
      { card: 'bg-white border-l-4 border-l-blue-400 border border-slate-200 rounded-r-xl p-5', title: 'text-blue-600 font-bold text-xs tracking-widest uppercase', text: 'text-slate-700 text-sm', bullet: 'bg-blue-400', icon: 'text-blue-500' },
      { card: 'bg-white border-l-4 border-l-slate-400 border border-slate-200 rounded-r-xl p-5', title: 'text-slate-500 font-bold text-xs tracking-widest uppercase', text: 'text-slate-600 text-sm', bullet: 'bg-slate-400', icon: 'text-slate-400' },
    ],
    tagBg: 'bg-blue-900 text-blue-100 rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wide',
    checkBox: 'w-4 h-4 rounded border-2 border-blue-700 flex-shrink-0 mt-0.5',
    chip: 'px-3 py-1 bg-blue-50 border border-blue-200 text-blue-800 rounded text-sm font-medium',
    timelineDot: 'w-8 h-8 rounded bg-blue-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0',
    timelineLine: 'w-0.5 bg-blue-200 mt-1 flex-1',
  },
}

export const DEFAULT_THEME = 'classic'
