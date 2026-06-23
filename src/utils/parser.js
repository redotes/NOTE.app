export function detectType(text) {
  const lower = text.toLowerCase()

  const scores = {
    meeting: ['회의', '참석', '안건', '결정사항', '액션아이템', 'meeting', '논의', '주제', '발표', '보고'].filter(k => lower.includes(k)).length,
    travel:  ['여행', '일정', '호텔', '항공', '관광', '숙박', '교통', 'travel', '방문', '투어', '체크인'].filter(k => lower.includes(k)).length,
    project: ['프로젝트', '기획', '마일스톤', '스프린트', '개발', '출시', 'project', '태스크', '담당자', '리소스'].filter(k => lower.includes(k)).length,
    idea:    ['아이디어', '영감', '발상', '브레인', '구상', 'idea', '인사이트', '떠올', '생각', '창의'].filter(k => lower.includes(k)).length,
    study:   ['독서', '학습', '책', '공부', '강의', '개념', '요약', '핵심', '저자', '챕터', 'chapter', 'book'].filter(k => lower.includes(k)).length,
    shopping:['쇼핑', '구매', '장보기', '마트', '구입', '주문', '장바구니', '가격', '할인', '목록'].filter(k => lower.includes(k)).length,
    todo:    ['할일', '할 일', 'todo', 'to-do', '체크리스트', '완료', '우선순위', '마감', '긴급', '작업'].filter(k => lower.includes(k)).length,
    diary:   ['오늘', '일기', '회고', '느낌', '감사', '기분', '하루', '반성', '회상', 'diary', '오늘의'].filter(k => lower.includes(k)).length,
  }

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
}

export function parseContent(text, type) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  const parsers = { meeting: parseMeeting, travel: parseTravel, project: parseProject, idea: parseIdea, study: parseStudy, shopping: parseShopping, todo: parseTodo, diary: parseDiary }
  return (parsers[type] || parseGeneral)(lines, text)
}

// ── 회의록 ──────────────────────────────────────────────────────────────────
function parseMeeting(lines) {
  const r = { title: '', date: '', attendees: [], agenda: [], decisions: [], actionItems: [], notes: [] }
  let section = 'notes'
  for (const line of lines) {
    const lo = line.toLowerCase()
    if (!r.title && line.length < 60 && !line.startsWith('-')) { r.title = line; continue }
    const dm = line.match(/(\d{4}[.\-/]\d{1,2}[.\-/]\d{1,2})|(\d{1,2}월\s*\d{1,2}일)/)
    if (dm && !r.date) { r.date = dm[0]; continue }
    if (lo.includes('참석') || lo.includes('attendee')) { section = 'attendees'; continue }
    if (lo.includes('안건') || lo.includes('agenda'))   { section = 'agenda'; continue }
    if (lo.includes('결정') || lo.includes('decision')) { section = 'decisions'; continue }
    if (lo.includes('액션') || lo.includes('action') || lo.includes('할일') || lo.includes('todo')) { section = 'actionItems'; continue }
    if (lo.includes('논의') || lo.includes('내용') || lo.includes('note')) { section = 'notes'; continue }
    const clean = line.replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '')
    if (clean) r[section].push(clean)
  }
  if (!r.title) r.title = '회의록'
  return r
}

// ── 여행 계획 ────────────────────────────────────────────────────────────────
function parseTravel(lines) {
  const r = { title: '', destination: '', duration: '', days: [], hotels: [], transportation: [], budget: '', tips: [] }
  let currentDay = null
  for (const line of lines) {
    const lo = line.toLowerCase()
    if (!r.title && line.length < 60) { r.title = line; continue }
    if (lo.includes('목적지') || lo.includes('여행지')) { r.destination = line.replace(/^[^:：]*([:：])\s*/, ''); continue }
    const dm = line.match(/(\d+박\s*\d+일)|(\d+\s*days?)|(\d{1,2}[.\-/]\d{1,2}\s*[~\-]\s*\d{1,2}[.\-/]\d{1,2})/)
    if (dm && !r.duration) { r.duration = dm[0]; continue }
    const dayM = line.match(/(\d+일차|day\s*\d+)/i)
    if (dayM) { currentDay = { label: line, activities: [] }; r.days.push(currentDay); continue }
    if (lo.includes('호텔') || lo.includes('숙박') || lo.includes('숙소')) { r.hotels.push(line.replace(/^[-•*]\s*/, '')); continue }
    if (lo.includes('항공') || lo.includes('기차') || lo.includes('버스') || lo.includes('교통')) { r.transportation.push(line.replace(/^[-•*]\s*/, '')); continue }
    if (lo.includes('예산') || lo.includes('비용')) { r.budget = line; continue }
    const clean = line.replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '')
    if (clean && currentDay) currentDay.activities.push(clean)
    else if (clean) r.tips.push(clean)
  }
  if (!r.title) r.title = '여행 계획'
  return r
}

// ── 프로젝트 ─────────────────────────────────────────────────────────────────
function parseProject(lines) {
  const r = { title: '', description: '', goals: [], milestones: [], tasks: [], team: [], timeline: '', risks: [] }
  let section = 'tasks'
  for (const line of lines) {
    const lo = line.toLowerCase()
    if (!r.title && line.length < 80) { r.title = line; continue }
    if (!r.description && r.title && line.length > 20 && line.length < 200) { r.description = line; continue }
    if (lo.includes('목표') || lo.includes('goal'))        { section = 'goals'; continue }
    if (lo.includes('마일스톤') || lo.includes('milestone')) { section = 'milestones'; continue }
    if (lo.includes('태스크') || lo.includes('task') || lo.includes('작업')) { section = 'tasks'; continue }
    if (lo.includes('팀') || lo.includes('담당') || lo.includes('team'))     { section = 'team'; continue }
    if (lo.includes('리스크') || lo.includes('risk'))       { section = 'risks'; continue }
    if (lo.includes('일정') || lo.includes('timeline'))     { r.timeline = line; continue }
    const clean = line.replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '')
    if (clean && Array.isArray(r[section])) r[section].push(clean)
  }
  if (!r.title) r.title = '프로젝트 계획'
  return r
}

// ── 아이디어 노트 ─────────────────────────────────────────────────────────────
function parseIdea(lines) {
  const r = { title: '', summary: '', inspirations: [], details: [], nextSteps: [], tags: [] }
  let section = 'details'
  for (const line of lines) {
    const lo = line.toLowerCase()
    if (!r.title && line.length < 60) { r.title = line; continue }
    if (!r.summary && r.title && line.length > 10) { r.summary = line; continue }
    if (lo.includes('영감') || lo.includes('배경') || lo.includes('계기'))   { section = 'inspirations'; continue }
    if (lo.includes('상세') || lo.includes('내용') || lo.includes('설명'))   { section = 'details'; continue }
    if (lo.includes('다음') || lo.includes('액션') || lo.includes('실행') || lo.includes('next')) { section = 'nextSteps'; continue }
    if (lo.includes('#') || lo.includes('태그') || lo.includes('tag'))       { section = 'tags'; continue }
    const clean = line.replace(/^[-•*#]\s*/, '').replace(/^\d+\.\s*/, '')
    if (clean) r[section].push(clean)
  }
  if (!r.title) r.title = '아이디어'
  return r
}

// ── 학습·독서 노트 ────────────────────────────────────────────────────────────
function parseStudy(lines) {
  const r = { title: '', author: '', subject: '', keyConcepts: [], summary: '', quotes: [], takeaways: [], questions: [] }
  let section = 'keyConcepts'
  for (const line of lines) {
    const lo = line.toLowerCase()
    if (!r.title && line.length < 80) { r.title = line; continue }
    if (lo.includes('저자') || lo.includes('author') || lo.includes('작가')) { r.author = line.replace(/^[^:：]*([:：])\s*/, ''); continue }
    if (lo.includes('주제') || lo.includes('과목') || lo.includes('subject')) { r.subject = line.replace(/^[^:：]*([:：])\s*/, ''); continue }
    if (lo.includes('핵심') || lo.includes('개념') || lo.includes('key'))    { section = 'keyConcepts'; continue }
    if (lo.includes('요약') || lo.includes('summary'))                        { section = 'summary'; continue }
    if (lo.includes('인용') || lo.includes('quote') || lo.includes('"') || lo.includes('"')) { section = 'quotes'; continue }
    if (lo.includes('인사이트') || lo.includes('takeaway') || lo.includes('배운')) { section = 'takeaways'; continue }
    if (lo.includes('질문') || lo.includes('의문') || lo.includes('question') || lo.includes('?')) { section = 'questions'; continue }
    const clean = line.replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '')
    if (!clean) continue
    if (section === 'summary') r.summary += (r.summary ? ' ' : '') + clean
    else if (Array.isArray(r[section])) r[section].push(clean)
  }
  if (!r.title) r.title = '학습 노트'
  return r
}

// ── 쇼핑 목록 ────────────────────────────────────────────────────────────────
function parseShopping(lines) {
  const r = { title: '', date: '', budget: '', categories: [], items: [] }
  let currentCat = null
  for (const line of lines) {
    const lo = line.toLowerCase()
    if (!r.title && line.length < 60) { r.title = line; continue }
    const dm = line.match(/(\d{4}[.\-/]\d{1,2}[.\-/]\d{1,2})|(\d{1,2}월\s*\d{1,2}일)/)
    if (dm && !r.date) { r.date = dm[0]; continue }
    if (lo.includes('예산') || lo.includes('budget') || lo.includes('총액')) { r.budget = line.replace(/^[^:：]*([:：])\s*/, ''); continue }
    // 카테고리 헤더 감지 (끝에 콜론이 있거나 대괄호)
    if ((line.endsWith(':') || line.endsWith('：') || /^\[.+\]$/.test(line)) && line.length < 30) {
      const catName = line.replace(/[:：\[\]]/g, '').trim()
      currentCat = { name: catName, items: [] }
      r.categories.push(currentCat)
      continue
    }
    // 가격 패턴 감지
    const priceM = line.match(/(\d[\d,]+)\s*(원|₩|원$)/)
    const clean = line.replace(/^[-•*✓✗□]\s*/, '').replace(/^\d+\.\s*/, '')
    if (clean) {
      const item = { name: clean.replace(/\s*(\d[\d,]+\s*(원|₩))/, '').trim(), price: priceM ? priceM[1] : '', done: line.startsWith('✓') || line.startsWith('✗') }
      if (currentCat) currentCat.items.push(item)
      else r.items.push(item)
    }
  }
  if (!r.title) r.title = '쇼핑 목록'
  return r
}

// ── 할 일 목록 ───────────────────────────────────────────────────────────────
function parseTodo(lines) {
  const r = { title: '', date: '', urgent: [], today: [], later: [], done: [] }
  let section = 'today'
  for (const line of lines) {
    const lo = line.toLowerCase()
    if (!r.title && line.length < 60) { r.title = line; continue }
    const dm = line.match(/(\d{4}[.\-/]\d{1,2}[.\-/]\d{1,2})|(\d{1,2}월\s*\d{1,2}일)/)
    if (dm && !r.date) { r.date = dm[0]; continue }
    if (lo.includes('긴급') || lo.includes('urgent') || lo.includes('중요') || lo.includes('!')) { section = 'urgent'; continue }
    if (lo.includes('오늘') || lo.includes('today') || lo.includes('이번주'))  { section = 'today'; continue }
    if (lo.includes('나중') || lo.includes('later') || lo.includes('다음주') || lo.includes('추후')) { section = 'later'; continue }
    if (lo.includes('완료') || lo.includes('done') || lo.includes('끝'))       { section = 'done'; continue }
    const isDone = /^[✓✗☑]/.test(line)
    const clean = line.replace(/^[-•*✓✗□☐☑]\s*/, '').replace(/^\d+\.\s*/, '')
    if (clean) {
      if (isDone) r.done.push(clean)
      else r[section].push(clean)
    }
  }
  if (!r.title) r.title = '할 일 목록'
  return r
}

// ── 일기·회고 ────────────────────────────────────────────────────────────────
function parseDiary(lines) {
  const r = { title: '', date: '', mood: '', gratitude: [], highlight: '', reflection: [], tomorrow: [] }
  let section = 'reflection'
  for (const line of lines) {
    const lo = line.toLowerCase()
    if (!r.title && line.length < 60) { r.title = line; continue }
    const dm = line.match(/(\d{4}[.\-/]\d{1,2}[.\-/]\d{1,2})|(\d{1,2}월\s*\d{1,2}일)/)
    if (dm && !r.date) { r.date = dm[0]; continue }
    const moodM = line.match(/기분[:：]\s*(.+)|mood[:：]\s*(.+)/i)
    if (moodM) { r.mood = moodM[1] || moodM[2]; continue }
    if (lo.includes('감사') || lo.includes('좋았') || lo.includes('gratitude')) { section = 'gratitude'; continue }
    if (lo.includes('하이라이트') || lo.includes('오늘의') || lo.includes('highlight')) { section = 'highlight'; continue }
    if (lo.includes('반성') || lo.includes('회고') || lo.includes('느낀') || lo.includes('reflection')) { section = 'reflection'; continue }
    if (lo.includes('내일') || lo.includes('다음') || lo.includes('tomorrow') || lo.includes('목표')) { section = 'tomorrow'; continue }
    const clean = line.replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '')
    if (!clean) continue
    if (section === 'highlight') r.highlight += (r.highlight ? ' ' : '') + clean
    else if (Array.isArray(r[section])) r[section].push(clean)
  }
  if (!r.title) r.title = '일기'
  return r
}

// ── 일반 메모 (기타) ─────────────────────────────────────────────────────────
function parseGeneral(lines) {
  const r = { title: '', content: [] }
  for (const line of lines) {
    if (!r.title && line.length < 80) { r.title = line; continue }
    r.content.push(line)
  }
  if (!r.title) r.title = '메모'
  return r
}
