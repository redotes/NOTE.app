// localStorage 기반 메모 저장소 (즉시 동작, Firebase 없이도 OK)
const KEY = 'sm_memos'

function getAll() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}
function setAll(memos) {
  localStorage.setItem(KEY, JSON.stringify(memos))
}

export async function saveMemo(memo) {
  const memos = getAll()
  const id = `memo_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
  const now = Date.now()
  memos.unshift({ ...memo, id, createdAt: now, updatedAt: now })
  setAll(memos)
  return id
}

export async function getMemos() {
  return getAll()
}

export async function getMemo(id) {
  return getAll().find(m => m.id === id) || null
}

export async function updateMemo(id, data) {
  const memos = getAll()
  const idx = memos.findIndex(m => m.id === id)
  if (idx !== -1) {
    memos[idx] = { ...memos[idx], ...data, updatedAt: Date.now() }
    setAll(memos)
  }
}

export async function deleteMemo(id) {
  setAll(getAll().filter(m => m.id !== id))
}
