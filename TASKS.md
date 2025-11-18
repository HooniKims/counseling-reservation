# 상담 예약 시스템 개발 작업 목록

## 프로젝트 개요

- 교사와 학부모(보호자)를 위한 학교 상담 예약 관리 시스템
- 교사: 상담 가능 시간 설정, 예약 현황 관리, 취소 및 엑셀 내보내기
- 학부모(보호자): 상담 예약, 예약 조회 및 취소
- Firebase Firestore 기반 실시간 데이터 처리

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
- [x] Firebase 초기화 코드 작성 (lib/firebase.ts)
- [x] Firestore 보안 규칙 초안 작성
- [x] 공용 타입 정의 (types/index.ts)

### Phase 3: 공통 컴포넌트 개발 ✅

- [x] 레이아웃 컴포넌트 (전체 공통 UI)
- [x] 캘린더/날짜 선택 컴포넌트
- [x] 버튼 컴포넌트 (variant 포함)
- [x] 로딩 스피너
- [x] 유틸 함수 (날짜 포맷, ID 생성 등)

### Phase 4: 교사 페이지 (/teacher) ✅

- [x] 교사 메인 페이지 UI (app/teacher/page.tsx)
- [x] 교시/시간 설정 기능
  - [x] 기본 1~7교시 시간 정의
  - [x] 시간 수정 및 저장 기능
- [x] 상담 가능 날짜/교시 선택 기능
- [x] 상담 가능 슬롯 생성 및 Firestore 반영
- [x] 실시간 예약 현황 조회 (onSnapshot)
- [x] 예약 취소 기능 (교사)
- [x] 예약 정보 엑셀 다운로드 기능
- [x] 학부모(보호자) 예약 링크 생성/복사 기능 제거 (2025-11-17)

### Phase 5: 학생/개별 예약 페이지 (/booking/[teacherId]) ✅

- [x] 교사별 예약 페이지 레이아웃 구성
- [x] 2단계 예약 플로우 (정보 입력 → 시간 선택)
- [x] 학생 정보 입력 (학번/이름) 및 유효성 검사
- [x] 예약 가능 시간 목록 조회 및 정렬
- [x] 예약 생성 시 슬롯 상태를 `reserved`로 변경
- [x] 예약 완료 화면 및 안내 문구

### Phase 6: 통합 학부모(보호자) 페이지 (/parent) ✅

- [x] 학부모(보호자)용 통합 페이지 레이아웃 (app/parent/page.tsx)
- [x] 탭 네비게이션 (예약하기 / 예약 조회·취소)
- [x] 예약하기 탭
  - [x] 학생 정보 입력 (학번, 이름)
  - [x] 예약 가능한 날짜/시간 목록 조회
  - [x] 상담 주제 선택 (COUNSELING_TOPICS 기반)
  - [x] 상담 내용 입력 (선택 사항)
  - [x] 예약 생성 및 Firestore 반영
- [x] 예약 조회·취소 탭
  - [x] 학번/이름으로 예약 조회
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

    - [x] 교사 전용 비밀번호 입력 화면 추가 (app/teacher/page.tsx)                                                                                                                                                               
    - [x] `.env.local` 에 `NEXT_PUBLIC_TEACHER_PASSWORD=teacher1234` 설정                                                                                                                                                        
    - [x] 비밀번호 일치 시 `localStorage.teacherAuthorizedAt` 저장 후 24시간 자동 입장 처리                                                                                                                                      
    - [x] 비밀번호가 일치해야만 기존 교사 기능(시간 설정, 예약 조회/취소, Excel 내보내기 등) 사용 가능

 ### Phase 12: 예약 상태 검증 및 취소/재예약 플로우 점검 ✅                                                                                         
    - [x] 학부모 예약 시 슬롯 가용 여부 검증 로직 점검 (availableSlots 문서 ID 기반 조회 확인)                                                       
    - [x] 예약 생성·취소 시 슬롯 상태(`available`/`reserved`) 업데이트 및 교사/학부모 취소 후 재예약 플로우 통합 점검

### Phase 13: 예약 로직 버그 수정 및 안정성 강화 ✅
    - [x] **예약 실패 버그 수정**: 학부모 예약 시, 슬롯 가용성 재확인 로직의 오류로 인해 예약이 불가능했던 문제를 해결했습니다. Firestore 문서 ID 조회 방식을 수정하여 정확한 상태 확인이 이루어지도록 변경했습니다.
    - [x] **데이터 정합성 강화**: 학부모 및 교사의 예약 생성/취소 로직에 Firestore 트랜잭션을 적용했습니다. 이를 통해 여러 데이터베이스 작업을 원자적으로 처리하여, 도중에 오류가 발생해도 데이터가 불일치하는 상태에 빠지지 않도록 방지합니다.
    - [x] **보안 취약점 분석**: `xlsx` 패키지의 보안 취약점(Prototype Pollution)을 분석한 결과, 현재 프로젝트에서는 외부 파일을 읽는 기능이 없어 해당 취약점의 영향을 받지 않음을 확인했습니다.
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

## 최근 작업 로그

> 매 작업 단위가 끝날 때마다 이 섹션을 업데이트합니다.

## 다음 계획 (선택 사항)

### 추가 기능 아이디어

- [ ] 예약 알림 (이메일/문자 등)
- [ ] 교사 인증/로그인 기능 (Firebase Authentication)
- [ ] 여러 교사 지원 및 교사 선택 기능
- [ ] 예약 통계 대시보드
- [ ] PDF/엑셀 등 다양한 형식의 데이터 내보내기 고도화
- [ ] 예약 수정 기능

## 여러 교사 계정 사용시 추천 방안                                                                                                                                                                                           
                                                                                                                                                                                                                               
  - **인증 방식 선택**                                                                                                                                                                                                         
    - 실제 사용을 고려하면 단순 비밀번호/숨김 URL(Option 1, 4, 5)은 보안과 교사별 권한 분리가 어려워 비추천                                                                                                                    
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