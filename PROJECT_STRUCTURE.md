# 프로젝트 구조

## 디렉토리 구조

```
sangdamyeyak/
│
├── app/                                # Next.js App Router
│   ├── page.tsx                       # 메인 페이지 (교사 페이지로 리다이렉트)
│   ├── layout.tsx                     # 루트 레이아웃
│   ├── globals.css                    # 글로벌 스타일
│   │
│   ├── teacher/                       # 교사 대시보드
│   │   └── page.tsx                  # 교사 메인 페이지
│   │
│   └── booking/                       # 예약 페이지
│       └── [teacherId]/              # 동적 라우팅 (교사 ID)
│           └── page.tsx              # 학부모 예약 페이지
│
├── components/                        # 재사용 가능한 컴포넌트
│   ├── Layout.tsx                    # 페이지 레이아웃 컴포넌트
│   ├── Calendar.tsx                  # 달력 컴포넌트
│   ├── Button.tsx                    # 버튼 컴포넌트
│   └── LoadingSpinner.tsx           # 로딩 스피너
│
├── lib/                              # 라이브러리 및 유틸리티
│   ├── firebase.ts                   # Firebase 초기화 및 설정
│   └── utils.ts                      # 유틸리티 함수
│
├── types/                            # TypeScript 타입 정의
│   └── index.ts                      # 전역 타입 정의
│
├── public/                           # 정적 파일
│   ├── next.svg
│   └── vercel.svg
│
├── node_modules/                     # 의존성 패키지
│
├── .env.local.example               # 환경 변수 예시
├── .gitignore                       # Git 무시 파일
├── FIREBASE_SETUP.md                # Firebase 설정 가이드
├── README.md                        # 프로젝트 설명서
├── TASKS.md                         # 개발 작업 목록
├── PROJECT_STRUCTURE.md             # 이 파일
├── package.json                     # 패키지 정보
├── package-lock.json               # 의존성 잠금 파일
├── tsconfig.json                   # TypeScript 설정
├── next.config.ts                  # Next.js 설정
├── tailwind.config.ts              # Tailwind CSS 설정
├── postcss.config.mjs              # PostCSS 설정
└── eslint.config.mjs               # ESLint 설정
```

## 주요 파일 설명

### 애플리케이션 페이지

#### `app/page.tsx`
- 루트 페이지
- 자동으로 `/teacher` 페이지로 리다이렉트

#### `app/teacher/page.tsx`
- 교사 대시보드
- 주요 기능:
  - 교시 시간 설정 및 수정
  - 달력으로 상담 가능 날짜 선택
  - 교시별 시간 선택
  - 설정된 시간 관리 (추가/삭제)
  - 실시간 예약 현황 확인
  - 학부모 예약 링크 생성 및 복사

#### `app/booking/[teacherId]/page.tsx`
- 학부모 예약 페이지
- 동적 라우팅으로 교사 ID를 받음
- 주요 기능:
  - 2단계 예약 프로세스
  - 학생 정보 입력
  - 상담 시간 선택
  - 상담 주제 및 내용 작성
  - 예약 신청 및 완료

### 컴포넌트

#### `components/Layout.tsx`
- 페이지 전체 레이아웃
- 제목, 설명, 그라데이션 배경 포함
- 반응형 디자인

#### `components/Calendar.tsx`
- 달력 UI 컴포넌트
- 월 단위 표시
- 날짜 선택 기능
- 과거 날짜 비활성화
- 선택된 날짜 하이라이트

#### `components/Button.tsx`
- 재사용 가능한 버튼 컴포넌트
- variant: primary, secondary, danger, ghost
- size: sm, md, lg

#### `components/LoadingSpinner.tsx`
- 로딩 상태 표시 컴포넌트
- 애니메이션 스피너

### 라이브러리 및 유틸리티

#### `lib/firebase.ts`
- Firebase 초기화
- Firestore 인스턴스 export
- 환경 변수 기반 설정

#### `lib/utils.ts`
- `cn()`: className 병합 함수
- `formatDate()`: 날짜를 YYYY-MM-DD 형식으로 변환
- `formatDateKorean()`: 한국어 날짜 포맷 (예: 2024년 3월 15일 (금))
- `generateId()`: 고유 ID 생성

### 타입 정의

#### `types/index.ts`
- `Period`: 교시 정보 타입
- `AvailableSlot`: 상담 가능 시간대 타입
- `Reservation`: 상담 예약 타입
- `Teacher`: 교사 정보 타입
- `CounselingTopic`: 상담 주제 타입
- `DEFAULT_PERIODS`: 기본 교시 시간표 (1-7교시)
- `COUNSELING_TOPICS`: 상담 주제 목록

## Firebase Firestore 구조

### Collections

#### `teachers`
교사 설정 정보
```typescript
{
  id: string,              // 교사 고유 ID
  periods: Period[],       // 교시별 시간 설정
  createdAt: number       // 생성 시간
}
```

#### `availableSlots`
교사가 설정한 상담 가능 시간
```typescript
{
  id: string,              // 문서 ID (자동 생성)
  teacherId: string,       // 교사 ID
  date: string,           // 날짜 (YYYY-MM-DD)
  period: number,         // 교시 번호 (1-7)
  startTime: string,      // 시작 시간 (HH:MM)
  endTime: string,        // 종료 시간 (HH:MM)
  status: 'available' | 'reserved',  // 예약 상태
  createdAt: number       // 생성 시간
}
```

#### `reservations`
학부모의 상담 예약 정보
```typescript
{
  id: string,              // 문서 ID (자동 생성)
  teacherId: string,       // 교사 ID
  slotId: string,         // 예약된 시간대 ID
  studentNumber: string,  // 학번
  studentName: string,    // 학생 이름
  date: string,           // 날짜
  period: number,         // 교시 번호
  startTime: string,      // 시작 시간
  endTime: string,        // 종료 시간
  topic: CounselingTopic, // 상담 주제
  content: string,        // 상담 내용
  createdAt: number       // 생성 시간
}
```

## 데이터 흐름

### 교사 워크플로우
1. 교사가 `/teacher` 페이지에 접속
2. localStorage에서 teacherId를 가져오거나 생성
3. 교시 시간을 설정/수정 (선택사항)
4. 달력에서 날짜 선택
5. 각 날짜별로 교시 선택
6. "상담 시간 설정 완료" 클릭
7. Firebase `availableSlots` 컬렉션에 저장
8. 실시간으로 예약 현황 확인 (`reservations` 컬렉션 구독)

### 학부모 워크플로우
1. 학부모가 교사가 공유한 링크로 접속 (`/booking/{teacherId}`)
2. 학생 정보 입력 (학번, 이름)
3. Firebase에서 해당 교사의 예약 가능 시간 조회
4. 실시간으로 예약 가능 시간 표시 (예약된 시간 제외)
5. 상담 시간, 주제, 내용 선택/작성
6. "예약 신청" 클릭
7. Firebase에 예약 저장 및 슬롯 상태 업데이트
8. 예약 완료 화면 표시

### 실시간 동기화
- Firestore의 `onSnapshot`을 사용하여 실시간 데이터 동기화
- 여러 사용자가 동시에 접속해도 최신 상태 유지
- 예약이 발생하면 즉시 모든 클라이언트에 반영

## 주요 기술 스택

### Frontend
- **Next.js 14**: React 프레임워크 (App Router)
- **TypeScript**: 타입 안전성
- **Tailwind CSS**: 유틸리티 기반 CSS 프레임워크

### Backend/Database
- **Firebase Firestore**: NoSQL 클라우드 데이터베이스
- **실시간 동기화**: onSnapshot API

### UI/UX
- **Lucide React**: 아이콘 라이브러리
- **clsx**: className 조건부 결합
- **date-fns**: 날짜 포맷팅

## 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint
```

## 환경 변수

필수 환경 변수 (`.env.local`):
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

자세한 설정 방법은 [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) 참조
