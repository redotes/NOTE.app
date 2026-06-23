// 파싱된 데이터를 테마 렌더러가 사용하는 범용 섹션 배열로 변환
export function toSections(type, data) {
  switch (type) {
    case 'meeting': return meetingSections(data)
    case 'travel':  return travelSections(data)
    case 'project': return projectSections(data)
    case 'idea':    return ideaSections(data)
    case 'study':   return studySections(data)
    case 'shopping':return shoppingSections(data)
    case 'todo':    return todoSections(data)
    case 'diary':   return diarySections(data)
    default:        return generalSections(data)
  }
}

function meetingSections(d) {
  return [
    d.attendees?.length && { type: 'chips',     title: '참석자',     icon: 'Users',         items: d.attendees },
    d.agenda?.length    && { type: 'list',      title: '안건',       icon: 'ClipboardList', items: d.agenda },
    d.decisions?.length && { type: 'list',      title: '결정사항',   icon: 'CheckCircle',   items: d.decisions },
    d.actionItems?.length && { type: 'checklist', title: '액션 아이템', icon: 'Zap',          items: d.actionItems },
    d.notes?.length     && { type: 'list',      title: '논의 내용',  icon: 'MessageSquare', items: d.notes },
  ].filter(Boolean)
}

function travelSections(d) {
  const sections = []
  if (d.days?.length) {
    sections.push({ type: 'timeline', title: '일정', icon: 'Sun', items: d.days.map(day => ({ label: day.label, sub: day.activities })) })
  }
  if (d.hotels?.length)          sections.push({ type: 'list', title: '숙박',   icon: 'Hotel', items: d.hotels })
  if (d.transportation?.length)  sections.push({ type: 'list', title: '교통',   icon: 'Car',   items: d.transportation })
  if (d.budget)                  sections.push({ type: 'text', title: '예산',   icon: 'Wallet', content: d.budget })
  if (d.tips?.length)            sections.push({ type: 'list', title: '팁 & 메모', icon: 'Lightbulb', items: d.tips })
  return sections
}

function projectSections(d) {
  return [
    d.description && { type: 'text',      title: '개요',      icon: 'Info',        content: d.description },
    d.goals?.length && { type: 'numbered', title: '목표',      icon: 'Target',      items: d.goals },
    d.milestones?.length && { type: 'timeline', title: '마일스톤', icon: 'Flag', items: d.milestones.map(m => ({ label: m })) },
    d.tasks?.length && { type: 'checklist', title: '태스크',   icon: 'CheckSquare', items: d.tasks },
    d.team?.length  && { type: 'chips',    title: '팀 구성',   icon: 'Users',       items: d.team },
    d.risks?.length && { type: 'list',     title: '리스크',    icon: 'AlertTriangle', items: d.risks },
  ].filter(Boolean)
}

function ideaSections(d) {
  return [
    d.summary && { type: 'text',      title: '한 줄 요약',   icon: 'Lightbulb', content: d.summary },
    d.inspirations?.length && { type: 'list', title: '영감 & 배경', icon: 'Sparkles', items: d.inspirations },
    d.details?.length && { type: 'list',    title: '아이디어 상세', icon: 'List', items: d.details },
    d.nextSteps?.length && { type: 'numbered', title: '실행 단계', icon: 'ArrowRight', items: d.nextSteps },
    d.tags?.length && { type: 'tags',   title: '태그',        icon: 'Tag', items: d.tags },
  ].filter(Boolean)
}

function studySections(d) {
  return [
    (d.author || d.subject) && { type: 'keyvalue', title: '정보', icon: 'BookOpen', items: [d.author && ['저자', d.author], d.subject && ['주제', d.subject]].filter(Boolean) },
    d.keyConcepts?.length && { type: 'numbered', title: '핵심 개념', icon: 'Brain', items: d.keyConcepts },
    d.summary && { type: 'text',   title: '요약',     icon: 'FileText', content: d.summary },
    d.takeaways?.length && { type: 'list', title: '인사이트', icon: 'Star', items: d.takeaways },
    d.quotes?.length && { type: 'quotes', title: '인용구', icon: 'Quote', items: d.quotes },
    d.questions?.length && { type: 'list', title: '질문', icon: 'HelpCircle', items: d.questions },
  ].filter(Boolean)
}

function shoppingSections(d) {
  const sections = []
  if (d.categories?.length) {
    d.categories.forEach(cat => {
      sections.push({ type: 'shoplist', title: cat.name, icon: 'Tag', items: cat.items })
    })
  }
  if (d.items?.length) sections.push({ type: 'shoplist', title: '목록', icon: 'ShoppingCart', items: d.items })
  if (d.budget)        sections.push({ type: 'text', title: '예산', icon: 'Wallet', content: d.budget })
  return sections
}

function todoSections(d) {
  return [
    d.urgent?.length && { type: 'checklist', title: '긴급 · 중요', icon: 'Zap',        items: d.urgent },
    d.today?.length  && { type: 'checklist', title: '오늘 할 일',  icon: 'Sun',         items: d.today },
    d.later?.length  && { type: 'checklist', title: '나중에',      icon: 'Clock',       items: d.later },
    d.done?.length   && { type: 'done',      title: '완료됨',      icon: 'CheckCircle', items: d.done },
  ].filter(Boolean)
}

function diarySections(d) {
  return [
    d.highlight && { type: 'text',  title: '오늘의 하이라이트', icon: 'Star',      content: d.highlight },
    d.gratitude?.length && { type: 'list', title: '감사한 것들', icon: 'Heart',     items: d.gratitude },
    d.reflection?.length && { type: 'list', title: '회고 & 반성', icon: 'RefreshCw', items: d.reflection },
    d.tomorrow?.length && { type: 'checklist', title: '내일 목표', icon: 'Sunrise',  items: d.tomorrow },
  ].filter(Boolean)
}

function generalSections(d) {
  return d.content?.length ? [{ type: 'list', title: '내용', icon: 'FileText', items: d.content }] : []
}
