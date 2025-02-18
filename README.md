# Bigs Front-End Developer Test

이 프로젝트는 Bigs Front-End 개발자 테스트를 위해 만들어졌습니다. 
React와 TypeScript를 사용하여 
사용자 회원가입, 로그인, 글 등록, 조회, 수정, 삭제 기능을 구현합니다.

## 기술 스택

- React
- TypeScript
- Zustand (상태 관리)
- React Hook Form (폼 관리)
- Axios (HTTP 클라이언트)
- Material-UI (UI 라이브러리)



## 프로젝트 설정 및 실행

### 사전 요구 사항

- Node.js (v14 이상)
- npm 또는 yarn

### 설치

프로젝트를 클론한 후, 필요한 패키지를 설치합니다.

```bash
git clone https://github.com/RbCream/bigs-front-test
cd bigs-front-test
npm install
```

### 실행
개발 모드에서 애플리케이션을 실행합니다.
```bash
npm start
```
브라우저에서 http://localhost:3000 을 열어 애플리케이션을 확인할 수 있습니다.

### 빌드
프로덕션 모드로 애플리케이션을 빌드합니다.
```bash
npm build
```
build 폴더에 최적화된 빌드 결과물이 생성됩니다.



## 구현된 기능
### 사용자 회원가입
- 이메일, 비밀번호, 이름을 입력하여 회원가입을 할 수 있습니다.
- 비밀번호는 최소 8자 이상이어야 하며, 하나의 문자, 하나의 숫자, 하나의 특수문자를 포함해야 합니다.

### 로그인
- 이메일과 비밀번호를 입력하여 로그인할 수 있습니다.
- 로그인한 사용자 정보(아이디, 이름)를 표시합니다.
- 글 등록, 조회, 수정, 삭제
- 로그인한 사용자는 글을 등록, 조회, 수정, 삭제할 수 있습니다.
- 글 목록은 페이지네이션을 지원합니다.

### API 연동
- 이 프로젝트는 제공된 API 서버와 연동하여 데이터를 처리합니다. API 문서를 참고하여 구현되었습니다.

### 인증 및 토큰 관리
- 이 프로젝트는 토큰을을 사용하여 인증을 처리합니다. 
  로그인 시, 서버로부터 액세스 토큰과 리프레시 토큰을 받아 로컬 스토리지에 저장합니다. 
  이후 요청 시, 액세스 토큰을 사용하여 인증을 처리합니다.
- 앱이 로드될 때마다 useEffect 훅을 사용하여 액세스 토큰을 갱신합니다

## 프로젝트 구조
```
bigs-front-test/
├── public/                     # 정적 파일
│   ├── index.html              # HTML 템플릿
│   └── ...
├── src/                        # 소스 코드
│   ├── components/             # React 컴포넌트
│   │   ├── Header.tsx          # 헤더 컴포넌트
│   │   ├── LoginForm.tsx       # 로그인 폼 컴포넌트
│   │   ├── SignupForm.tsx      # 회원가입 폼 컴포넌트
│   │   ├── PostList.tsx        # 글 목록 컴포넌트
│   │   ├── PostDetail.tsx      # 글 상세 컴포넌트
│   │   ├── PostForm.tsx        # 글 작성/수정 폼 컴포넌트
│   │   └── ProtectedRoute.tsx  # 보호된 라우트 컴포넌트
│   ├── store/                  # Zustand 상태 관리
│   │   ├── authStore.ts        # 인증 상태 관리
│   │   └── postStore.ts        # 글 상태 관리
│   ├── services/               # API 서비스
│   │   ├── api.ts              # Axios 인스턴스 및 인터셉터 설정
│   │   ├── auth.ts             # 인증 API 서비스
│   │   └── postService.ts      # 글 API 서비스
│   ├── types/                  # 타입 정의
│   │   ├── auth.ts             # 인증 관련 타입
│   │   └── post.ts             # 글 관련 타입
│   ├── utils/                  # 유틸리티 함수
│   │   └── errorHandler.ts     # 에러 핸들러
│   ├── App.tsx                 # 메인 앱 컴포넌트
│   ├── routes.tsx              # 라우트 설정
│   ├── theme.ts                # MUI 테마 설정
│   └── index.tsx               # 엔트리 포인트
├── .gitignore                  # Git 무시 파일 목록
├── package.json                # 프로젝트 메타데이터 및 의존성 목록
└── README.md                   # 프로젝트 설명서
```
# 연락처 & 문의
- HJ : 20013324@naver.com
