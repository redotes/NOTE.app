import { FileText, Plane, FolderKanban, Lightbulb, BookOpen, ShoppingCart, CheckSquare, BookHeart } from 'lucide-react'

export const TYPE_CONFIG = {
  meeting:  { label: '회의록',    icon: FileText,     color: 'bg-blue-100 text-blue-700',     dot: 'bg-blue-500',    gradient: 'from-blue-600 to-blue-700' },
  travel:   { label: '여행 계획', icon: Plane,        color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500', gradient: 'from-emerald-500 to-teal-600' },
  project:  { label: '프로젝트',  icon: FolderKanban, color: 'bg-violet-100 text-violet-700',  dot: 'bg-violet-500',  gradient: 'from-violet-600 to-purple-700' },
  idea:     { label: '아이디어',  icon: Lightbulb,    color: 'bg-amber-100 text-amber-700',    dot: 'bg-amber-500',   gradient: 'from-amber-400 to-orange-500' },
  study:    { label: '학습·독서', icon: BookOpen,     color: 'bg-sky-100 text-sky-700',        dot: 'bg-sky-500',     gradient: 'from-sky-500 to-blue-600' },
  shopping: { label: '쇼핑 목록', icon: ShoppingCart, color: 'bg-pink-100 text-pink-700',      dot: 'bg-pink-500',    gradient: 'from-pink-500 to-rose-600' },
  todo:     { label: '할 일',    icon: CheckSquare,  color: 'bg-slate-100 text-slate-700',    dot: 'bg-slate-500',   gradient: 'from-slate-700 to-slate-900' },
  diary:    { label: '일기·회고', icon: BookHeart,    color: 'bg-fuchsia-100 text-fuchsia-700', dot: 'bg-fuchsia-500', gradient: 'from-fuchsia-500 to-pink-600' },
}

export const EXAMPLE_TEXTS = {
  meeting: `2024.06.22 마케팅팀 주간 회의

참석자
김민준, 이서연, 박지호, 최유나

안건
- Q3 캠페인 방향 검토
- 소셜미디어 운영 현황 보고

결정사항
- 인스타그램 릴스 주 3회 제작 확정
- 유튜브 쇼츠 파일럿 8월 시작

액션아이템
- 김민준: 콘텐츠 캘린더 작성 (6/25)
- 이서연: 크리에이터 리스트 업 (6/28)

논의 내용
인플루언서 마케팅 ROI가 지난 분기 대비 15% 향상`,

  travel: `오사카 3박 4일 여행 계획

목적지: 일본 오사카
기간: 3박 4일

1일차
- 간사이 공항 도착 (오후 2시)
- 도톤보리 저녁 식사

2일차
- 유니버설 스튜디오 재팬 종일

3일차
- 오사카성 관람
- 구로몬 시장 점심

4일차
- 신세카이 모닝 투어
- 공항 이동

숙박
- 도톤보리 그랜드 호텔 3박

교통
- 간사이 공항-난바 라피트 특급

예산: 1인 60만원`,

  project: `앱 리뉴얼 프로젝트

전체적인 UX/UI 개선 및 성능 최적화

목표
- 앱 로딩 속도 50% 개선
- 사용자 리텐션 30% 향상

마일스톤
- M1: 디자인 시스템 완성 (7/15)
- M2: 핵심 화면 리뉴얼 (8/15)
- M3: 앱스토어 배포 (9/15)

태스크
- 현행 앱 사용성 분석
- 와이어프레임 제작
- 개발 스프린트 진행

팀
- 기획: 이준서
- 디자인: 김하은
- 개발: 박성민

리스크
- 일정 지연 가능성 (버퍼 2주 확보)`,

  idea: `AI 기반 개인 독서 코치 앱

사용자의 독서 습관을 분석해 맞춤 추천과 요약을 제공하는 앱

영감
- 넷플릭스 추천 알고리즘에서 아이디어 얻음
- 독서 습관을 꾸준히 유지하지 못하는 개인적 경험

상세
- 책 스캔 → AI 자동 요약 기능
- 독서 목표 설정 및 진도 트래킹
- 소셜 독서 기록 공유

다음 실행 단계
- 시장 조사 및 경쟁 앱 분석
- MVP 기능 정의
- 프로토타입 제작

태그
#앱기획 #AI #독서 #사이드프로젝트`,

  study: `아토믹 해빗 - 제임스 클리어

저자: 제임스 클리어
주제: 습관 형성과 행동 변화

핵심 개념
- 1% 개선의 복리 효과
- 습관은 정체성에서 비롯된다
- 4단계 습관 루프: 신호-열망-반응-보상
- 환경 설계가 의지력보다 중요하다

요약
작은 습관이 놀라운 결과를 만든다. 목표보다 시스템에 집중하라.

인사이트
- 결과를 바꾸려면 정체성부터 바꿔야 한다
- 습관 쌓기: 기존 습관에 새 습관 연결
- 2분 규칙: 새 습관을 2분 안에 할 수 있게 축소

인용구
- "당신은 목표 수준이 아닌 시스템 수준으로 떨어진다"
- "습관은 반복된 자아의 투표다"

질문
- 내 핵심 정체성은 무엇인가?
- 제거해야 할 나쁜 습관 트리거는?`,

  shopping: `주말 장보기 목록

날짜: 2024.06.23
예산: 8만원

채소·과일:
- 양파 1kg
- 당근 3개
- 사과 6개
- 방울토마토

육류:
- 닭가슴살 1kg
- 소고기 불고기용 500g

냉장·냉동:
- 두부 2모
- 계란 30구
- 버터

기타:
- 세제
- 샴푸`,

  todo: `이번 주 할 일

날짜: 2024.06.23

긴급
- 프로젝트 제안서 제출 (오늘까지!)
- 미팅 자료 준비

오늘
- 이메일 답장 처리
- 운동 30분
- 책 30페이지 읽기

나중에
- 블로그 글 작성
- 옷 정리
- 친구한테 연락하기

완료
✓ 주간 회의 참석
✓ 보고서 검토`,

  diary: `2024년 6월 23일 일요일

기분: 좋음

오늘의 하이라이트
오랜만에 가족과 함께 공원 산책을 다녀왔다. 날씨도 맑고 기분이 정말 좋았다.

감사한 것들
- 건강하게 하루를 시작할 수 있어서
- 가족과 함께하는 시간
- 맛있는 점심 식사

회고
- 오전에 계획했던 독서를 미뤄서 아쉬웠다
- 스마트폰 사용 시간이 너무 많았다
- 운동을 꾸준히 못하고 있는 것 같다

내일 목표
- 아침 6시 기상
- 책 50페이지 읽기
- 스마트폰 2시간 이하`,
}
