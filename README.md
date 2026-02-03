# 📝 Todo Service

간단한 Todo 관리 서비스를 구현한 프론트엔드 프로젝트입니다.  
할 일 목록 및 상세 페이지를 중심으로 Todo CRUD, 이미지 업로드, 상태 관리를 구현했습니다.

🎮 [**라이브 데모 보기**](https://codeit-todo-gamma.vercel.app/)

본 프로젝트는 초기 설계부터 기능 구현까지의 전 과정을 완료한 상태이며,  
현재 버전(v1.0.0)을 기준으로 개발이 종료되었습니다.

---

## 📌 주요 기능

### Todo 목록 (Main)
- 할 일 목록 조회
- 할 일 추가
- 완료 여부 토글
- 할 일 없음/있음 상태에 따른 화면 분기

### Todo 상세 (Detail)
- 할 일 제목, 이미지, 메모 조회 및 수정
- 완료 상태 변경
- 할 일 삭제
- 수정 완료 후 메인 페이지 이동

### 이미지 업로드
- 이미지 미리보기 제공
- 파일 크기 제한 (5MB 이하)
- 영어 파일명만 허용 (S3 업로드 안정성 고려)

---

## 🧩 공통 컴포넌트

- **`Button`**
  - `add` / `delete` / `complete` variant
- **`Checkbox`**
  - `list` / `detail` variant
  - `detail` 페이지에서 제목 편집 기능 지원
- **`Header`**
- **`Input`**
- **`Memo`**
- **`ImageUpload`**

모든 공통 컴포넌트는 재사용성을 고려해 설계되었습니다.

---

## 🗂️ 프로젝트 구조
```bash
src/
├── app/                # Next.js App Router
│   └── itmes/
│       └── [itemId]
├── components/
│   ├── common/         # 공통 컴포넌트
│   ├── layout/         # 레이아웃 컴포넌트
│   └── todo/           # Todo 도메인 컴포넌트
├── hooks/              # Custom Hooks
│   ├── useTodos.ts
│   └── useTodoDetail.ts
├── lib/
│   ├── api.ts           # API 함수
│   └── type.ts           # TypeScript 타입 정의
└── public/
    └── assets/         # 아이콘 및 이미지 리소스
```
---

## 🛠️ 기술 스택

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Custom Hooks
- **API**: REST API (Swagger 기반 타입 정의)
- **Asset Handling**: SVG / Image Upload

---

## 🔍 설계 포인트

- Todo 도메인 로직을 **Custom Hook 중심으로 분리**
- UI 컴포넌트와 비즈니스 로직의 책임 분리
- SVG 아이콘 네이밍 규칙 정리 및 안정적인 렌더링 방식 적용
- 프로덕션 환경(`build → start`) 기준 동작 검증

---

## 🐞 이슈 및 개선 사항

- 공백·특수문자가 포함된 SVG 파일명으로 인해  
  프로덕션 환경에서 아이콘 로딩 문제가 발생한 이슈를 수정했습니다.
- 정적 리소스 네이밍 규칙을 정리하여 동일한 문제를 예방했습니다.

---

## 🚀 실행 방법

```bash
pnpm install
pnpm dev
```

또는 프로덕션 환경 실행:
```bash
pnpm build
pnpm start
```

## 📦 버전
	•	v1.0.0
	•	Todo 서비스 기본 기능 구현 완료
	•	프로젝트 개발 종료

---

## 📎 참고 사항
	•	본 프로젝트는 학습 및 구현 목적의 프로젝트입니다.
	•	추가 기능 개발 계획은 없으며, 현재 상태를 최종 버전으로 유지합니다.
