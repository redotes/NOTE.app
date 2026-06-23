import { ShoppingCart, Calendar, Wallet, Tag } from 'lucide-react'

function ShoppingItem({ item }) {
  return (
    <div className={`flex items-center justify-between py-2 px-3 rounded-xl text-sm ${item.done ? 'opacity-50' : 'hover:bg-slate-50'}`}>
      <div className="flex items-center gap-2">
        <span className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center text-xs ${item.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'}`}>
          {item.done && '✓'}
        </span>
        <span className={item.done ? 'line-through text-slate-400' : 'text-slate-700'}>{item.name}</span>
      </div>
      {item.price && <span className="text-slate-500 font-medium text-xs">{item.price}원</span>}
    </div>
  )
}

export default function ShoppingView({ data }) {
  const allItems = [...(data.items || []), ...(data.categories?.flatMap(c => c.items) || [])]
  const doneCount = allItems.filter(i => i.done).length

  return (
    <div className="animate-slide-up space-y-4">
      <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-2 opacity-80 text-sm">
          <ShoppingCart size={14} />
          <span>쇼핑 목록</span>
        </div>
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <div className="flex flex-wrap gap-4 mt-3 text-pink-100 text-sm">
          {data.date && <div className="flex items-center gap-1.5"><Calendar size={13} />{data.date}</div>}
          {data.budget && <div className="flex items-center gap-1.5"><Wallet size={13} />예산 {data.budget}</div>}
        </div>
        {allItems.length > 0 && (
          <div className="mt-3 bg-white/20 rounded-xl px-3 py-2 text-sm">
            {doneCount}/{allItems.length}개 완료
            <div className="mt-1 h-1.5 bg-white/30 rounded-full">
              <div className="h-1.5 bg-white rounded-full transition-all" style={{ width: `${allItems.length ? (doneCount / allItems.length) * 100 : 0}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* 카테고리별 */}
      {data.categories?.length > 0 && data.categories.map((cat, i) => (
        <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-slate-700">
            <Tag size={15} />
            <h3 className="font-semibold">{cat.name}</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {cat.items.map((item, j) => <ShoppingItem key={j} item={item} />)}
          </div>
        </div>
      ))}

      {/* 분류없는 아이템 */}
      {data.items?.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-slate-700">
            <ShoppingCart size={15} />
            <h3 className="font-semibold">목록</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {data.items.map((item, i) => <ShoppingItem key={i} item={item} />)}
          </div>
        </div>
      )}
    </div>
  )
}
