# 상담 예약 시스템 개발 작업 목록

## 프로젝트 개요

- 교사와 학부모(보호자)를 위한 학교 상담 예약 관리 시스템
- 교사: 상담 가능 시간 설정, 예약 현황 관리, 취소 및 엑셀 내보내기
- 학부모(보호자): 상담 예약, 예약 조회 및 취소
- Firebase Firestore 기반 실시간 데이터 처리

## 주요 기능

### 교사용 기능
- 🔒 페이지 접근 비밀번호 보호
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
자세한 설정은 하단의 **[부록 B. Firebase 설정 가이드](#b-firebase-설정-가이드)**를 참고하세요.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`을 열어 확인합니다.

## 사용 방법

### 교사 (설정자)

1. **로그인 (비밀번호 입력)**
   - 교사 페이지(`/teacher`) 접속 시 비밀번호를 입력합니다.
   - 초기 비밀번호는 `.env.local`에 설정된 값입니다.

2. **교시 시간 설정** (선택사항)
   - 첫 접속 시 기본 교시 시간이 설정되어 있습니다.
   - "교시 시간 설정" 버튼을 클릭하여 학교별 시간표에 맞게 수정할 수 있습니다.

3. **상담 가능 날짜/시간 선택**
   - 달력에서 상담 가능한 날짜를 클릭하여 선택합니다.
   - 선택한 날짜별로 가능한 교시를 선택합니다.
   - "상담 시간 설정 완료" 버튼을 클릭하여 저장합니다.

4. **예약 링크 공유**
   - 상단의 "학부모 예약 링크"를 복사합니다.
   - 학부모에게 링크를 공유합니다 (문자, 이메일, 카카오톡 등).

5. **예약 현황 확인**
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

## 배포

### Vercel 배포 (권장)
1. [Vercel](https://vercel.com)에 로그인합니다.
2. "New Project" 버튼을 클릭합니다.
3. GitHub 저장소를 연결합니다.
4. 환경 변수를 설정합니다 (`.env.local`의 내용).
5. "Deploy" 버튼을 클릭합니다.

## 주의사항

1. **보안**: 프로덕션 환경에서는 Firebase 보안 규칙을 반드시 강화하세요. `.env.local` 파일은 절대 Git에 커밋하지 마세요.
2. **데이터**: 교사 ID는 브라우저 로컬 스토리지에 저장됩니다. 브라우저를 변경하면 새로운 교사 ID가 생성됩니다.
3. **시간대**: 모든 시간은 로컬 시간 기준입니다.

## 문제 해결

- **Firebase 연결 오류**: `.env.local` 파일 확인, 환경 변수 값 검증, 개발 서버 재시작
- **예약이 안 되는 경우**: Firebase 보안 규칙 확인, 브라우저 콘솔 오류 확인
- **상담 가능 시간이 표시되지 않는 경우**: 교사가 시간을 설정했는지 확인, 과거 날짜는 자동 숨김

## Firebase 구조 개요

```text
counseling-system/
  teachers/
    {teacherId}/
      name: string
      periods: Period[]
      createdAt: number
  availableSlots/
    {slotId}/
      teacherId: string
      date: string (YYYY-MM-DD)
      period: number (1-7)
      startTime: string
      endTime: string
      status: 'available' | 'reserved'
      createdAt: number
  reservations/
    {reservationId}/
      teacherId: string
      slotId: string
      studentNumber: string
      studentName: string
      date: string
      period: number
      startTime: string
      endTime: string
      topic: string
      content: string
      createdAt: number
```

## 작업 계획 및 진행 상황

### Phase 1: 프로젝트 초기 설정 ✅

- [x] 프로젝트 디렉터리 생성
- [x] 작업 목록 파일(TASKS.md) 생성
- [x] Next.js + TypeScript 초기 세팅
- [x] Firebase SDK 및 관련 패키지 설치
- [x] 기본 프로젝트 구조 정의

### Phase 2: Firebase 설정 및 연동 ✅

- [x] Firebase 프로젝트 설정 가이드 문서 작성 (FIREBASE_SETUP.md)
- [x] 환경 변수 템플릿(.env.local.example) 작성
  - [x] 예약 내역 목록 표시
  - [x] 예약 취소 시, 예약 문서 삭제 및 슬롯 상태 `available`로 복구

### Phase 7: UI/UX 개선 ✅

- [x] 반응형 레이아웃 (모바일/태블릿/데스크톱)
- [x] 색상/타이포그래피 통일
- [x] 상태 표시 및 피드백(로딩, 성공/실패 알림)
- [x] 접근성 개선 (아이콘, 텍스트 구조 등)

### Phase 8: 문서화 ✅

- [x] Firebase 설정 가이드 (FIREBASE_SETUP.md)
- [x] README 기본 작성 (기능 설명, 실행 방법 등)
- [x] 환경 변수 예시 파일(.env.local.example)
- [x] 프로젝트 구조 문서화

### Phase 9: UX 개선 및 통합 ✅

- [x] 메인 페이지(/)에서 교사용 / 학부모(보호자)용 진입 동선 정리
- [x] 학부모용 개별 페이지들을 /parent로 통합
- [x] 기존 /check-reservation 링크는 /parent로 대체/안내
- [x] 안내 문구 및 용어 정리

### Phase 10: 용어 정리 및 링크 구조 보완 ✅

- [x] 교사 페이지에서 학부모 예약 링크 생성 기능 제거
- [x] 모든 페이지에서 '학부모' 텍스트를 '학부모(보호자)'로 변경

 ### Phase 11: 교사 비밀번호 보호 (/teacher) 테스트 도입 ✅

    - [x] **UI 텍스트 오타 수정**: 학부모 예약 실패 시 나타나는 안내 메시지의 오타를 수정했습니다.

### Phase 14: 학부모 예약 페이지 로직 개선 ✅
    - [x] **예약 가능 시간 조회 버그 수정**: 학부모 페이지에서 예약 가능한 시간을 조회할 때, 특정 교사를 안정적으로 참조하지 못해 다른 교사의 시간이 노출될 수 있는 문제를 해결했습니다. `availableSlots` 대신 `teachers` 컬렉션에서 교사 정보를 조회하도록 로직을 변경하여 항상 올바른 교사의 시간만 표시되도록 수정했습니다.

### Phase 15: 학부모 페이지 데이터 조회 로직 재수정 ✅
    - [x] **`teacherId` 조회 로직 수정**: 학부모 페이지에서 `teachers` 컬렉션을 조회하여 `teacherId`를 찾던 로직이 `teachers` 컬렉션이 비어있을 경우 실패하는 문제를 발견했습니다. `teacherId`를 안정적으로 확보하기 위해, `availableSlots` 컬렉션에서 `status`가 `available`인 슬롯을 하나만 조회하여 `teacherId`를 가져오도록 로직을 재수정했습니다. 이로써 "예약 가능한 시간이 없습니다" 오류가 해결되었습니다.

### Phase 16: Excel 다운로드 파일명 날짜 오류 수정 ✅
    - [x] **엑셀 파일명 날짜 기준 오류 수정**: 교사 페이지에서 엑셀 다운로드 시, 파일명의 날짜가 UTC 기준으로 생성되어 하루 전 날짜로 표시되는 오류를 수정했습니다. `new Date().toISOString()` 대신 `lib/utils.ts`의 `formatDate(new Date())` 함수를 사용하여, 사용자의 현지 시간(KST)을 기준으로 정확한 날짜가 파일명에 포함되도록 변경했습니다.

### Phase 17: Vercel 배포 오류 수정 ✅
    - [x] **빌드 오류 수정**: Vercel 배포 중 `Button` 컴포넌트의 `variant` 속성에 정의되지 않은 `outline` 값을 사용하여 발생한 타입스크립트 오류를 해결했습니다. `components/Button.tsx` 파일에 `outline` variant의 타입과 스타일을 추가하여 빌드가 정상적으로 완료되도록 수정했습니다.

### Phase 18: 다른 브라우저/IP에서 예약 조회 문제 해결 ✅
- [x] **예약 조회 문제 해결**: 다른 브라우저나 IP 주소에서 예약했을 때, 해당 예약이 조회되지 않던 문제를 해결했습니다. `check-reservation` 페이지에서 `studentNumber`와 `studentName`을 기반으로 예약 정보를 조회할 때, Firestore 쿼리 조건이 정확하게 적용되지 않아 발생한 문제였습니다. 쿼리 조건을 수정하여 `studentNumber`와 `studentName`이 정확히 일치하는 예약만 가져오도록 변경했습니다.

### Phase 19: 교사 페이지 로딩 성능 개선 ✅
- [x] **데이터 조회 로직 최적화**: 교사 페이지 로딩 시, 과거 데이터를 포함한 모든 `availableSlots`와 `reservations` 문서를 불러오던 문제를 해결했습니다. Firestore 쿼리에 `where('date', '>=', today)` 조건을 추가하여 오늘 및 미래의 데이터만 조회하도록 변경함으로써, 불필요한 데이터 로드를 줄이고 페이지 로딩 속도를 크게 개선했습니다.

### Phase 20: Firestore 복합 인덱스 오류 해결 ✅
- [x] **복합 쿼리 인덱스 오류 수정**: 교사 페이지에서 `teacherId`와 `date`를 동시에 조건으로 사용하는 Firestore 복합 쿼리가 인덱스를 요구하며 발생한 오류를 해결했습니다. Firestore 쿼리를 `teacherId` 조건만 사용하도록 단순화하고, `date` 필터링은 클라이언트 측에서 수행하도록 변경하여 인덱스 없이도 정상 작동하도록 수정했습니다. 이를 통해 교사 대시보드의 무한 로딩 문제가 해결되었습니다.

### Phase 21: 카카오톡 내장 브라우저 텍스트 표시 문제 해결 ✅
- [x] **다크모드 비활성화**: 카카오톡 내장 브라우저에서 텍스트가 희미하게 보이는 문제를 해결했습니다. `globals.css`에서 `prefers-color-scheme: dark` 미디어 쿼리가 카카오톡 브라우저의 다크모드 설정과 충돌하여 발생한 문제였습니다. 다크모드 관련 CSS를 주석 처리하여 모든 브라우저에서 일관된 라이트 모드 UI를 제공하도록 수정했습니다.

### Phase 22: 삭제/취소 버튼 오작동 수정 및 예약 알림 개선 ✅
- [x] **삭제/취소 버튼 오작동 수정**: 교사 및 학부모 페이지에서 삭제/취소 버튼이 작동하지 않는 문제를 해결했습니다. 브라우저 환경에 따라 `window.confirm`이 차단되는 문제를 해결하기 위해 커스텀 `ConfirmModal`을 구현하여 적용했습니다.
- [x] **예약 완료 알림 복구**: 학부모 페이지에서 예약 완료 시 알림이 뜨지 않는 문제를 해결했습니다. `ConfirmModal`을 개선하여 예약 완료 및 취소 시 명확한 알림 팝업을 제공하도록 수정했습니다.
- [x] **Hydration Mismatch 해결**: `app/layout.tsx`의 `<body>` 태그에 `suppressHydrationWarning`을 추가하여 콘솔 오류를 해결했습니다.
    - Firebase를 이미 사용하고 있으므로 Firebase Authentication 기반으로 진행                                                                                                                                                  
    - 학교/기관에서 구글 계정을 사용한다면 **Google OAuth(Option 3)** 추천                                                                                                                                                     
    - 구글 계정 사용이 애매하다면 **Email Magic Link 또는 이메일 로그인(Option 2)** 추천                                                                                                                                       
                                                                                                                                                                                                                               
  - **Firebase 설정 관점**                                                                                                                                                                                                     
    - 기존 Firebase 프로젝트/Firestore/환경변수는 그대로 사용                                                                                                                                                                  
    - Firebase Console → `Authentication`에서                                                                                                                                                                                  
      - Option 2: Email/Email Link 로그인 활성화                                                                                                                                                                               
      - Option 3: Google 로그인 제공자 활성화                                                                                                                                                                                  
    - 코드 측면에서는 `lib/firebase.ts`에 `getAuth` 추가 및 Auth 초기화 코드만 보강                                                                                                                                            
                                                                                                                                                                                                                               
  - **교사 계정과 Firestore 구조 연동**                                                                                                                                                                                        
    - Firebase Auth의 `uid`를 `teachers` 컬렉션 문서와 연결                                                                                                                                                                    
    - 예: `teachers/{teacherId}` 문서에 `authUid` 필드를 두고, 로그인한 사용자의 `auth.uid`와 매칭                                                                                                                             
    - 교사 페이지(`/teacher`)에서는 현재 로그인한 사용자의 `uid`로 자신의 `teacher` 문서를 조회 후 `teacherId`를 얻음                                                                                                          
                                                                                                                                                                                                                               
  - **슬롯/예약 흐름**                                                                                                                                                                                                         
    - 교사는 `/teacher`에서 자신의 `teacherId`에 해당하는 상담 가능 시간(`availableSlots`)을 생성/수정                                                                                                                         
    - `availableSlots`는 기존 설계 그대로 `teacherId`, `date`, `period`, `startTime`, `endTime`, `status`를 사용                                                                                                               
    - 학부모는 `/parent`에서                                                                                                                                                                                                   
      - 1) `teachers` 컬렉션 목록에서 교사를 선택                                                                                                                                                                              
      - 2) `/booking/[teacherId]`로 이동하여 해당 교사의 `availableSlots` 중 `status === 'available'`인 시간대를 선택·예약                                                                                                     
                                                                                                                                                                                                                               
  - **보안 규칙 강화 방향(나중에 적용)**                                                                                                                                                                                       
    - 개발 중에는 `allow read, write: if true;` 규칙으로 빠르게 작업                                                                                                                                                           
    - 이후 실제 사용을 고려해 FIREBASE_SETUP.md에 있는 예시처럼 보안 규칙을 강화                                                                                                                                               
      - `teachers`: `update/delete`는 `request.auth.uid == resource.data.authUid`인 경우만 허용                                                                                                                                
      - `availableSlots`, `reservations`: 쓰기는 `request.auth != null`인 경우만 허용                                                                                                                                          
      - 학부모 예약 생성은 `reservations` `create`에 한해 `request.auth == null`도 허용하는 등 정책 설계                                                                                                                       
                                                                                                                                                                                                                               
  이 구조를 따르면, 여러 교사가 각자 계정으로 로그인하여 자신의 상담 가능 시간만 관리할 수 있고, 학부모는 별도 로그인 없이 교사를 선택하고 시간만 골라 예약하는 단순한 UX를 유지할 수 있습니다.

### 성능 및 품질

- [ ] 이미지/정적 리소스 최적화
- [ ] 코드 스플리팅 및 번들 최적화
- [ ] 캐싱 전략 정리
- [ ] 기본 SEO 설정 정리

## 현재 상태

**핵심 기능 개발 완료**

모든 핵심 예약·조회·취소 기능이 동작하는 상태입니다.

### 사용 방법 (개발 환경)

1. Firebase 프로젝트 생성 및 설정 (FIREBASE_SETUP.md 참고)
2. `.env.local` 파일 설정
3. `npm install` 실행
4. `npm run dev` 실행
5. 브라우저에서 `http://localhost:3000` 접속

---

# 부록 (Appendix)

## A. 프로젝트 구조

### 디렉토리 구조

```
sangdamyeyak/
│
├── app/                                # Next.js App Router
│   ├── page.tsx                       # 메인 페이지 (교사 페이지로 리다이렉트)
│   ├── layout.tsx                     # 루트 레이아웃
│   ├── globals.css                    # 글로벌 스타일
│   │
│   ├── teacher/                       # 교사 대시보드
│   │   └── page.tsx                  # 교사 메인 페이지 (비밀번호 보호)
│   │
│   ├── booking/                       # 예약 페이지
│   │   └── [teacherId]/              # 동적 라우팅 (교사 ID)
│   │       └── page.tsx              # 학부모 예약 페이지
│   │
│   └── parent/                        # 학부모 통합 페이지
│       └── page.tsx                  # 예약 및 조회 기능
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
│
├── .env.local.example               # 환경 변수 예시
├── README.md                        # 프로젝트 설명서
└── TASKS.md                         # 통합 개발 문서 (본 파일)
```

### 주요 데이터 흐름

1. **교사**: `/teacher` 접속 → 비밀번호 인증 → 시간 설정 → `availableSlots` 저장 → 실시간 예약 확인
2. **학부모**: `/parent` 접속 → 교사 선택 → 예약 가능 시간 조회 → 예약 신청 → `reservations` 저장

## B. Firebase 설정 가이드

### 1. Firebase 프로젝트 생성
1. [Firebase Console](https://console.firebase.google.com/) 접속 및 프로젝트 생성
2. **Firestore Database** 생성 (테스트 모드 권장)
3. **웹 앱** 추가 및 구성 정보 복사

### 2. 환경 변수 설정
`.env.local` 파일을 생성하고 다음 내용을 입력하세요:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_TEACHER_PASSWORD=teacher1234
```

### 3. 보안 규칙 (Firestore Rules)
개발용 규칙 예시:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
> **주의**: 프로덕션 배포 시에는 반드시 적절한 인증 및 권한 검사를 포함한 보안 규칙으로 변경해야 합니다.

## C. 변경 이력 (Changelog)

### v2.1.0 - 2024-11-19
- **교사 비밀번호 보호**: 환경 변수 기반의 간단한 인증 시스템 도입
- **학부모 통합 페이지**: `/parent` 경로로 예약 및 조회 기능 통합
- **성능/안정성 개선**: 트랜잭션 적용, 쿼리 최적화, 카카오톡 브라우저 호환성 개선

### v2.0.0 - 2024-11-17
- **기능 확장**: 교사 예약 취소, 엑셀 내보내기, 학부모 예약 조회/취소 기능 추가
- **UI 개선**: 메인 랜딩 페이지 및 예약 확인 페이지 추가

### v1.0.0 - 2024-11-17
- **초기 릴리스**: 핵심 예약 기능 (교사 시간 설정, 학부모 예약) 구현 완료