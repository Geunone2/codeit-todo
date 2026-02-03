/* TypeScript 타입 정의 */

// ============================================
// API 파라미터 타입
// ============================================

export interface PaginationParam {
    page?: number;
    pageSize?: number;
}

// ============================================
// 할 일 API 요청/응답 타입
// ============================================

// 할 일 등록
export interface postItemRequest {
    name: string;
}

export interface postItemResponse {
    id: number;
    tenantId: string;
    name: string;
    memo: string;
    imageUrl: string;
    isCompleted: boolean;
}

// 할 일 목록 조회
export interface getItemResponse {
    isCompleted: boolean;
    name: string;
    id: number;
}

// 할 일 상세 조회
export interface getItemDetailResponse {
    isCompleted: boolean;
    imageUrl: string;
    memo: string;
    name: string;
    tenantId: string;
    id: number;
}

// 할 일 수정
export interface patchItemDetailRequest {
    name: string;
    memo: string;
    imageUrl: string;
    isCompleted: boolean;
}

export interface patchItemDetailResponse {
    isCompleted: boolean;
    imageUrl: string;
    memo: string;
    name: string;
    tenantId: string;
    id: number;
}

// 할 일 삭제
export interface deleteItemResponse {
    message: string;
}

// 이미지 업로드

export interface imageResponse {
    url: string;
}

// ============================================
// 컴포넌트 Props 타입
// ============================================

export interface ImageUpLoadProps {
    imageUrl: string | null;
    onImageChange: (file: File | null) => void;
}

export interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface MemoProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export type CheckboxVariant = "list" | "detail";

export interface CheckboxProps {
    isCompleted: boolean;
    text: string;
    onToggle: () => void;
    variant?: CheckboxVariant;
    editable?: boolean;
    onTextChange?: (text: string) => void;
}

export type ButtonVariant = "add" | "delete" | "complete";

export interface ButtonProps {
    variant: ButtonVariant;
    onClick: () => void;
    disabled?: boolean;
    hasTodos?: boolean;
    isCompleted?: boolean;
}

export interface TodoListProps {
    title: "TODO" | "DONE";
    items: getItemResponse[];
    onToggle: (itemId: number, isCompleted: boolean) => Promise<void>;
}

export interface TodoFormProps {
    onAdd: (name: string) => Promise<boolean>;
    hasTodos: boolean;
}

export interface TodoDetailProps {
    itemId: number;
}