# Firebase 설정 가이드

이 애플리케이션은 Firebase Firestore를 데이터베이스로 사용합니다. 아래 가이드를 따라 Firebase 프로젝트를 설정하세요.

## 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/)에 접속합니다.
2. "프로젝트 추가" 버튼을 클릭합니다.
3. 프로젝트 이름을 입력합니다 (예: `sangdamyeyak`).
4. Google Analytics는 선택사항입니다 (필요 없으면 비활성화).
5. "프로젝트 만들기" 버튼을 클릭합니다.

## 2. Firestore 데이터베이스 생성

1. Firebase Console 좌측 메뉴에서 "Firestore Database"를 클릭합니다.
2. "데이터베이스 만들기" 버튼을 클릭합니다.
3. **프로덕션 모드로 시작** 또는 **테스트 모드로 시작** 중 선택합니다.
   - 개발 중이라면 **테스트 모드**를 선택하세요.
   - 테스트 모드는 30일간 누구나 읽기/쓰기가 가능합니다.
4. Cloud Firestore 위치를 선택합니다 (예: `asia-northeast3 (Seoul)`).
5. "사용 설정" 버튼을 클릭합니다.

## 3. 보안 규칙 설정 (중요!)

Firestore Database > 규칙 탭에서 아래 규칙을 설정하세요:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // teachers 컬렉션: 읽기/쓰기 모두 허용
    match /teachers/{teacherId} {
      allow read, write: if true;
    }

    // availableSlots 컬렉션: 읽기/쓰기 모두 허용
    match /availableSlots/{slotId} {
      allow read, write: if true;
    }

    // reservations 컬렉션: 읽기/쓰기 모두 허용
    match /reservations/{reservationId} {
      allow read, write: if true;
    }
  }
}
```

**주의**: 위 규칙은 개발/테스트용입니다. 실제 프로덕션 환경에서는 더 엄격한 보안 규칙을 적용해야 합니다.

### 프로덕션용 보안 규칙 예시:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // teachers 컬렉션
    match /teachers/{teacherId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.authUid;
    }

    // availableSlots 컬렉션
    match /availableSlots/{slotId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }

    // reservations 컬렉션
    match /reservations/{reservationId} {
      allow read: if request.auth != null;
      allow create: if true; // 학부모가 예약 생성
      allow update, delete: if request.auth != null;
    }
  }
}
```

## 4. 웹 앱 설정

1. Firebase Console 프로젝트 개요 페이지로 이동합니다.
2. "웹 앱에 Firebase 추가" 버튼 (</> 아이콘)을 클릭합니다.
3. 앱 닉네임을 입력합니다 (예: `상담예약 웹`).
4. Firebase Hosting은 선택사항입니다.
5. "앱 등록" 버튼을 클릭합니다.
6. Firebase SDK 구성 정보가 표시됩니다.

## 5. 환경 변수 설정

1. 프로젝트 루트에 `.env.local` 파일을 생성합니다.
2. `.env.local.example` 파일을 참고하여 Firebase 구성 값을 입력합니다.

```bash
# .env.local 파일 내용 (예시)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxxxxx
```

3. Firebase Console에서 복사한 구성 값을 각 환경 변수에 붙여넣습니다.

## 6. 애플리케이션 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`에 접속하여 애플리케이션이 정상적으로 작동하는지 확인합니다.

## 데이터베이스 구조

애플리케이션은 다음과 같은 Firestore 컬렉션을 사용합니다:

### `teachers` 컬렉션
각 교사의 설정 정보를 저장합니다.
```
{
  id: string,              // 교사 고유 ID
  periods: Period[],       // 교시별 시간 설정
  createdAt: number       // 생성 시간 (timestamp)
}
```

### `availableSlots` 컬렉션
교사가 설정한 상담 가능 시간을 저장합니다.
```
{
  teacherId: string,       // 교사 ID
  date: string,           // 날짜 (YYYY-MM-DD)
  period: number,         // 교시 번호 (1-7)
  startTime: string,      // 시작 시간 (HH:MM)
  endTime: string,        // 종료 시간 (HH:MM)
  status: string,         // 'available' | 'reserved'
  createdAt: number       // 생성 시간 (timestamp)
}
```

### `reservations` 컬렉션
학부모의 상담 예약 정보를 저장합니다.
```
{
  teacherId: string,       // 교사 ID
  slotId: string,         // 예약된 시간대 ID
  studentNumber: string,  // 학번
  studentName: string,    // 학생 이름
  date: string,           // 날짜 (YYYY-MM-DD)
  period: number,         // 교시 번호
  startTime: string,      // 시작 시간
  endTime: string,        // 종료 시간
  topic: string,          // 상담 주제
  content: string,        // 상담 내용
  createdAt: number       // 생성 시간 (timestamp)
}
```

## 문제 해결

### Firebase 연결 오류
- `.env.local` 파일이 프로젝트 루트에 있는지 확인하세요.
- 모든 환경 변수가 올바르게 설정되었는지 확인하세요.
- 개발 서버를 재시작하세요 (`npm run dev`).

### 권한 오류
- Firestore 보안 규칙이 올바르게 설정되었는지 확인하세요.
- Firebase Console > Firestore Database > 규칙에서 규칙을 확인/수정하세요.

### 데이터가 표시되지 않음
- Firebase Console > Firestore Database > 데이터에서 컬렉션이 생성되었는지 확인하세요.
- 브라우저 개발자 도구 (F12) > Console에서 오류 메시지를 확인하세요.
