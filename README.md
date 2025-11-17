# 상담 예약 시스템

교사와 학부모를 위한 상담 예약 관리 시스템입니다.

## 주요 기능

### 교사용 기능
- 📅 상담 가능 날짜 및 시간 설정
- ⏰ 교시별 시간 커스터마이징
- 📋 예약 현황 실시간 확인
- 🔗 학부모 예약 링크 생성 및 공유
- ✏️ 설정된 시간대 수정/삭제
- ❌ 예약 취소 기능
- 📊 Excel 내보내기 (예약 데이터)

### 학부모용 기능
- 👤 학생 정보 입력 (학번, 이름)
- 📆 교사가 설정한 시간대에서 선택
- 💬 상담 주제 선택 (학업, 진로, 교우관계, 기타)
- 📝 상담 내용 사전 작성
- ⚡ 실시간 예약 상태 확인 (중복 예약 방지)
- 🔍 예약 확인 및 조회
- ❌ 예약 취소 (본인 예약만)

## 기술 스택

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Database**: Firebase Firestore
- **UI Components**: Lucide React (아이콘), Headless UI
- **Utilities**: date-fns, clsx

## 시작하기

### 1. 프로젝트 클론 및 설치

```bash
# 의존성 설치
npm install
```

### 2. Firebase 설정

자세한 Firebase 설정 방법은 [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) 파일을 참고하세요.

요약:
1. [Firebase Console](https://console.firebase.google.com/)에서 프로젝트 생성
2. Firestore 데이터베이스 생성
3. 웹 앱 추가 및 구성 정보 복사
4. `.env.local` 파일 생성 및 설정

```bash
# .env.local.example 파일을 복사하여 .env.local 생성
cp .env.local.example .env.local

# .env.local 파일을 열어 Firebase 구성 정보 입력
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## 사용 방법

### 교사 (설정자)

1. **교시 시간 설정** (선택사항)
   - 첫 접속 시 기본 교시 시간이 설정되어 있습니다.
   - "교시 시간 설정" 버튼을 클릭하여 학교별 시간표에 맞게 수정할 수 있습니다.

2. **상담 가능 날짜/시간 선택**
   - 달력에서 상담 가능한 날짜를 클릭하여 선택합니다.
   - 선택한 날짜별로 가능한 교시를 선택합니다.
   - "상담 시간 설정 완료" 버튼을 클릭하여 저장합니다.

3. **예약 링크 공유**
   - 상단의 "학부모 예약 링크"를 복사합니다.
   - 학부모에게 링크를 공유합니다 (문자, 이메일, 카카오톡 등).

4. **예약 현황 확인**
   - 실시간으로 예약이 들어오면 페이지에 표시됩니다.
   - 학번, 이름, 날짜, 시간, 상담 주제, 내용을 확인할 수 있습니다.

### 학부모 (예약자)

1. **링크 접속**
   - 교사가 공유한 링크로 접속합니다.

2. **학생 정보 입력**
   - 자녀의 학번과 이름을 입력합니다.
   - "다음" 버튼을 클릭합니다.

3. **상담 시간 선택**
   - 교사가 설정한 가능한 시간대 중에서 선택합니다.
   - 이미 예약된 시간은 "상담 예약 중"으로 표시됩니다.

4. **상담 주제 및 내용 작성**
   - 상담 주제를 선택합니다 (학업, 진로, 교우관계, 기타).
   - 상담하고 싶은 내용을 간단히 작성합니다.

5. **예약 신청**
   - "예약 신청" 버튼을 클릭하여 완료합니다.
   - 예약 확인 화면이 표시됩니다.

## 프로젝트 구조

```
sangdamyeyak/
├── app/
│   ├── page.tsx                    # 메인 랜딩 페이지
│   ├── teacher/
│   │   └── page.tsx               # 교사 대시보드
│   ├── booking/
│   │   └── [teacherId]/
│   │       └── page.tsx           # 학부모 예약 페이지
│   └── check-reservation/
│       └── page.tsx               # 예약 확인 및 취소 페이지
├── components/
│   ├── Layout.tsx                 # 레이아웃 컴포넌트
│   ├── Calendar.tsx               # 달력 컴포넌트
│   ├── Button.tsx                 # 버튼 컴포넌트
│   └── LoadingSpinner.tsx         # 로딩 스피너
├── lib/
│   ├── firebase.ts                # Firebase 초기화
│   └── utils.ts                   # 유틸리티 함수
├── types/
│   └── index.ts                   # TypeScript 타입 정의
├── FIREBASE_SETUP.md              # Firebase 설정 가이드
├── TASKS.md                       # 개발 작업 목록
└── .env.local.example             # 환경 변수 예시
```

## 환경 변수

| 변수명 | 설명 |
|-------|------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API 키 |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase 인증 도메인 |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase 프로젝트 ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase 스토리지 버킷 |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase 메시징 발신자 ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase 앱 ID |

## 배포

### Vercel 배포 (권장)

1. [Vercel](https://vercel.com)에 로그인합니다.
2. "New Project" 버튼을 클릭합니다.
3. GitHub 저장소를 연결합니다.
4. 환경 변수를 설정합니다 (`.env.local`의 내용).
5. "Deploy" 버튼을 클릭합니다.

### 기타 플랫폼

- **Netlify**: Next.js 빌드 설정 필요
- **Firebase Hosting**: `firebase.json` 설정 필요
- **일반 Node.js 서버**: `npm run build` 후 `npm start`

## 주의사항

1. **보안**
   - 프로덕션 환경에서는 Firebase 보안 규칙을 반드시 강화하세요.
   - `.env.local` 파일은 절대 Git에 커밋하지 마세요.

2. **데이터**
   - 교사 ID는 브라우저 로컬 스토리지에 저장됩니다.
   - 브라우저를 변경하면 새로운 교사 ID가 생성됩니다.
   - 동일한 교사 ID를 유지하려면 같은 브라우저를 사용하세요.

3. **시간대**
   - 모든 시간은 로컬 시간 기준입니다.
   - 서버와 클라이언트의 시간대가 다를 경우 주의하세요.

## 문제 해결

### Firebase 연결 오류
- `.env.local` 파일 확인
- 환경 변수 값 검증
- 개발 서버 재시작

### 예약이 안 되는 경우
- Firebase 보안 규칙 확인
- 브라우저 콘솔 오류 확인
- 네트워크 연결 확인

### 상담 가능 시간이 표시되지 않는 경우
- 교사가 시간을 설정했는지 확인
- 과거 날짜는 자동으로 숨겨집니다
- Firestore에 데이터가 저장되었는지 확인

## 라이선스

MIT License

## 기여

이슈나 개선 사항이 있다면 자유롭게 기여해주세요!
