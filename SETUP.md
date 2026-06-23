# SmartMemo 설정 가이드

## 1. Firebase 설정

### Firebase 프로젝트 생성
1. https://console.firebase.google.com 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: smart-memo)
4. Firestore Database → "데이터베이스 만들기" → 테스트 모드로 시작

### 환경변수 설정
```bash
# .env 파일 생성 (.env.example 참고)
cp .env.example .env
```
`.env` 파일에 Firebase 콘솔 > 프로젝트 설정 > 내 앱 > SDK 설정에서 복사한 값 입력

---

## 2. 개발 서버 실행
```bash
npm install
npm run dev
# → http://localhost:5173
```

---

## 3. Vercel 배포

### 방법 A: Vercel CLI
```bash
npm install -g vercel
vercel
```
Vercel 대시보드 → Environment Variables에서 `.env` 값들을 추가하세요.

### 방법 B: GitHub 연동
1. GitHub에 푸시
2. vercel.com에서 import
3. Environment Variables 설정

---

## 4. GitHub Pages 배포

`vite.config.js`에서 base 경로 수정:
```js
base: '/smart-memo/',  // 레포지토리 이름
```

```bash
npm install gh-pages --save-dev
```

`package.json` scripts에 추가:
```json
"predeploy": "npm run build",
"deploy:gh": "gh-pages -d dist"
```

```bash
npm run deploy:gh
```

---

## 5. Android APK 빌드 (Capacitor)

### 사전 요구사항
- Android Studio 설치: https://developer.android.com/studio
- JDK 17 이상

### APK 빌드 절차
```bash
# 1. 웹 앱 빌드
npm run build

# 2. Capacitor 초기화 (최초 1회)
npx cap init SmartMemo com.smartmemo.app --web-dir dist

# 3. Android 플랫폼 추가 (최초 1회)
npx cap add android

# 4. 빌드 파일 동기화
npx cap sync android

# 5. Android Studio로 열기
npx cap open android
```

Android Studio에서:
- `Build > Generate Signed Bundle / APK > APK` 선택
- 또는 디버그용: `Build > Build Bundle(s) / APK(s) > Build APK(s)`

생성 위치: `android/app/build/outputs/apk/debug/app-debug.apk`
