# SmartMemo

> 글만 쓰면 알아서 가독성 있게 정리되는 스마트 노트

노션처럼 구조화된 노트이지만, 사용자가 직접 설정하지 않아도 자유롭게 글을 쓰면 앱이 자동으로 카테고리를 파악하고 예쁘게 정리해 보여줍니다.

🔗 **배포 주소**: https://redotes.github.io/NOTE.app/

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프론트엔드 | React 19 + Vite 5 |
| 스타일링 | Tailwind CSS v3 (JIT) |
| 라우팅 | React Router v6 |
| 아이콘 | Lucide React |
| 데이터베이스 | Firebase Firestore (Seoul) |
| 인증 | Firebase Auth (Google) |
| 배포 | GitHub Pages (gh-pages) |

---

## 주요 기능

- **자동 카테고리 분류** — 회의록 / 여행 / 프로젝트 / 아이디어 / 학습 / 쇼핑 / 할 일 / 일기 8가지 타입 자동 감지
- **20가지 테마** — card / minimal / sidebar / glass 4가지 레이아웃 × 다양한 컬러
- **할 일 · 쇼핑 체크리스트** — 항목 클릭으로 체크/해제, 진행률 바 실시간 표시
- **일기 + 할 일 혼합** — 일기 안에 할 일 항목이 섞여 있으면 자동으로 분리해 체크박스 표시
- **Google 로그인** — 사용자별 클라우드 저장 (Firestore)
- **중요 메모 별표** — 상단 고정 표시

---

## 개발 히스토리

### v2.9 — 일기 할 일·목표 체크박스 & 진행률 `2026-06-27`
- DiaryView 할 일·목표 섹션 클릭 가능한 체크박스로 개선 — 항목 클릭 시 완료 토글, 취소선+흐림 처리, Firestore 저장
- 일기 카드(MemoCard)에 tomorrow 항목 진행률 표시 — tomorrow 체크 항목이 있으면 카드 하단 진행 바 + 퍼센트 표시
- 일기 섹션 아이콘 변경 — RefreshCw → BookOpen
- parseDiary tomorrow 항목 `{text, checked}` 객체로 저장 — 기존 string[] 포맷도 자동 정규화

### v2.8 — 혼합 콘텐츠(일기+할일) 처리 & rawText 복원 `2026-06-27`
- parseDiary 할일 섹션 키워드 확장 — "할일", "할 일", "해야", "계획", "목표" 포함 줄 감지 시 이후 항목을 할 일·목표 섹션으로 분류
- DiaryView 할 일·목표 섹션 체크박스 스타일 표시
- handleTypeChange rawText 복원 로직 — rawText 없는 구형 메모도 parsedData에서 텍스트 재구성

### v2.7 — fallback rawText 수정 & 빈 화면 방지 `2026-06-27`
- UniversalView fallback rawText 버그 수정 — parsedData에 rawText 필드가 없어 빈 화면이 되던 문제 해결
- MemoDetailPage → UniversalView rawText prop 연결

### v2.6 — 카테고리별 뷰 혼용 방지 & 재파싱 강화 `2026-06-27`
- 체크리스트 뷰 적용 범위 제한 — todo/shopping 타입만 ChecklistFullView 사용
- MemoDetailPage 재파싱 강화 — 잘못 저장된 parsedData 자동 감지 → rawText로 재파싱

### v2.5 — 체크 시 항목 이동 제거 `2026-06-27`
- 체크 완료 시 항목 아래로 이동하던 동작 제거 → 원래 자리에서 회색+취소선만 표시
- 기존 저장 메모(구 형식) 자동 변환

### v2.4 — 쇼핑 체크리스트 뷰로 통합 `2026-06-27`
- 행동 카테고리(할 일·쇼핑) 스마트 체크리스트 — 어떤 형식으로 입력해도 자동 변환
- 진행률 바 + 체크 — 할 일·쇼핑 모두 항목 클릭으로 체크/해제

### v2.3 — 할 일 카테고리 체크리스트 뷰로 통합 `2026-06-27`
- 할 일 타입 → 항상 체크리스트 형식으로 변환
- parseTodo 결과를 ChecklistFullView용 구조로 자동 변환

### v2.2 — 체크리스트 과잉 감지 수정 `2026-06-27`
- 체크리스트 감지 기준 강화 — 실제 체크박스 마커 3개 이상 또는 50자 미만 짧은 번호 항목 50% 이상일 때만 체크리스트

### v2.1 — 다크 테마 텍스트 표시 버그 수정 `2026-06-27`
- 다크 테마 카테고리 뷰 텍스트 불가시 버그 수정
- 파서 섹션 감지 로직 개선 — isSectionHeader 조건 추가

### v2.0 — 긴 메모 파싱 버그 수정 `2026-06-26`
- isSectionHeader(줄 길이≤30, 리스트 마커 없음) 조건 추가
- 6개 파서 전체 수정 — parseMeeting, parseProject, parseIdea, parseStudy, parseTodo, parseDiary
- 기존 저장 메모 자동 재파싱

### v1.9 — 완료 표시 & 안정성 개선 `2026-06-26`
- MemoCard 완료 상태 표시 — 전부 완료 시 카드 회색 처리 + "완료" 뱃지 + 제목 취소선
- MemoCard 진행률 바 추가
- ViewErrorBoundary 클래스 컴포넌트 추가

### v1.8 — 버그 수정 `2026-06-26`
- 새 메모 작성 페이지 크래시 버그 수정
- 체크리스트 체크박스 클릭 무반응 버그 수정
- ShoppingView · TodoView 카테고리 체크박스 클릭 기능 추가

### v1.7 — 중요 메모 북마크 `2026-06-26`
- toggleStar 함수 추가, 별표 메모 상단 고정 표시
- MemoCard 별 아이콘 버튼 추가

### v1.6 — 카테고리별 전용 레이아웃 `2026-06-26`
- CategoryViews.jsx 신규 생성 — 8가지 카테고리 전용 뷰 컴포넌트
- 회의록 / 여행 / 프로젝트 / 아이디어 / 학습 / 쇼핑 / 할일 / 일기 전용 레이아웃 구현

### v1.5 — 테마별 레이아웃 구조 분리 `2026-06-26`
- 20개 테마에 layout 필드 추가 — card / minimal / sidebar / glass 4종
- SectionWrapper 레이아웃 분기 처리

### v1.4 — 인증 & 랜딩 페이지 `2026-06-26`
- Firebase Authentication Google 로그인 연동
- AuthContext 생성, 랜딩 페이지 제작
- 사용자별 Firestore 경로 분리 — `users/{uid}/memos`

### v1.3 — Firebase 연동 `2026-06-26`
- Firebase Firestore 도입 — localStorage → 클라우드 저장소 전환
- serverTimestamp() 적용, Seoul 리전 데이터베이스 생성

### v1.2 — 기능 확장 `2026년 6월 중순`
- 체크리스트 타입 추가, ChecklistFullView 컴포넌트
- MemoDetailPage 카테고리 수정 드롭다운

### v1.1 — 테마 확장 & UX 개선 `2026년 6월 중순`
- 테마 20가지로 확장
- 템플릿 카드 썸네일 개선 — 실제 UniversalView 미리보기

### v1.0 — 기초 구축 `2025년 초`
- React 19 + Vite 5 + Tailwind CSS v3 프로젝트 초기 세팅
- 8가지 메모 타입 정의, 자연어 파서 구현
- localStorage 기반 메모 저장소, 5가지 기본 테마
